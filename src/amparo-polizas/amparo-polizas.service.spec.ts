import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AmparoPolizasService } from './amparo-polizas.service';
import { AmparoPoliza } from '../entities/amparo-poliza.entity';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { CrearAmparoPolizaDto } from '../dto/crear-amparo-poliza.dto';
import { UpdateAmparoPolizaDto } from '../dto/update-amparo-poliza.dto';

describe('AmparoPolizasService', () => {
  let service: AmparoPolizasService;
  let repo: Repository<AmparoPoliza>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmparoPolizasService,
        {
          provide: getRepositoryToken(AmparoPoliza),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AmparoPolizasService>(AmparoPolizasService);
    repo = module.get<Repository<AmparoPoliza>>(
      getRepositoryToken(AmparoPoliza),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería devolver todos los amparos de pólizas', async () => {
      const amparos = [new AmparoPoliza(), new AmparoPoliza()];
      jest.spyOn(repo, 'find').mockResolvedValue(amparos);

      const result = await service.findAll();

      expect(result).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Amparos de pólizas encontrados',
        Data: amparos,
      });
    });

    it('debería manejar errores', async () => {
      jest
        .spyOn(repo, 'find')
        .mockRejectedValue(new Error('Error de base de datos'));

      await expect(service.findAll()).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('debería devolver un amparo de póliza por ID', async () => {
      const amparo = new AmparoPoliza();
      jest.spyOn(repo, 'findOne').mockResolvedValue(amparo);

      const result = await service.findOne(1);

      expect(result).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Amparo de póliza encontrado',
        Data: amparo,
      });
    });

    it('debería lanzar BadRequestException si no se encuentra el amparo', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findByContractId', () => {
    it('debería devolver amparos de pólizas por ID de contrato', async () => {
      const amparos = [new AmparoPoliza(), new AmparoPoliza()];
      jest.spyOn(repo, 'find').mockResolvedValue(amparos);

      const result = await service.findByContractId(1);

      expect(result).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Amparos de pólizas encontrados',
        Data: amparos,
      });
    });

    it('debería lanzar BadRequestException si no se encuentran amparos', async () => {
      jest.spyOn(repo, 'find').mockResolvedValue([]);

      await expect(service.findByContractId(1)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('createMultiple', () => {
    it('debería crear múltiples amparos de pólizas', async () => {
      const dtos: CrearAmparoPolizaDto[] = [
        { amparo_id: 1, suficiencia: 100, tipo_valor_amparo_id: 1 },
        { amparo_id: 2, suficiencia: 200, tipo_valor_amparo_id: 2 },
      ];

      const mockAmparoPoliza = new AmparoPoliza();
      Object.assign(mockAmparoPoliza, { id: 1, ...dtos[0] });

      jest.spyOn(repo, 'create').mockReturnValue(mockAmparoPoliza);
      jest.spyOn(repo, 'save').mockResolvedValue(mockAmparoPoliza);

      const result = await service.createMultiple(dtos);

      expect(result.Success).toBe(true);
      expect(result.Status).toBe(HttpStatus.CREATED);
      expect(result.Data.length).toBe(2);
      expect(repo.create).toHaveBeenCalledTimes(2);
      expect(repo.save).toHaveBeenCalledTimes(2);
    });
  });

  describe('update', () => {
    it('debería actualizar un amparo de póliza', async () => {
      const dto: UpdateAmparoPolizaDto = { suficiencia: 300 };
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue({ Data: new AmparoPoliza() } as any);
      jest.spyOn(repo, 'update').mockResolvedValue({ affected: 1 } as any);

      const result = await service.update(1, dto);

      expect(result.Success).toBe(true);
      expect(result.Status).toBe(HttpStatus.OK);
    });

    it('debería lanzar BadRequestException si la actualización falla', async () => {
      const dto: UpdateAmparoPolizaDto = { suficiencia: 300 };
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue({ Data: new AmparoPoliza() } as any);
      jest
        .spyOn(repo, 'update')
        .mockRejectedValue(new Error('Error de actualización'));

      await expect(service.update(1, dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('debería eliminar un amparo de póliza', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue({ Data: new AmparoPoliza() } as any);
      jest.spyOn(repo, 'remove').mockResolvedValue(undefined);

      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('debería lanzar BadRequestException si la eliminación falla', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue({ Data: new AmparoPoliza() } as any);
      jest
        .spyOn(repo, 'remove')
        .mockRejectedValue(new Error('Error de eliminación'));

      await expect(service.remove(1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('validarFechas', () => {
    it('debería lanzar BadRequestException si la fecha de inicio es mayor o igual a la fecha final', () => {
      const fechaInicio = new Date('2023-01-02');
      const fechaFinal = new Date('2023-01-01');

      expect(() => service['validarFechas'](fechaInicio, fechaFinal)).toThrow(
        BadRequestException,
      );
    });

    it('no debería lanzar excepción si la fecha de inicio es menor que la fecha final', () => {
      const fechaInicio = new Date('2023-01-01');
      const fechaFinal = new Date('2023-01-02');

      expect(() =>
        service['validarFechas'](fechaInicio, fechaFinal),
      ).not.toThrow();
    });
  });
});
