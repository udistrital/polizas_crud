import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolizasService } from './polizas.service';
import { Poliza } from '../entities/poliza.entity';
import { AmparoPoliza } from '../entities/amparo-poliza.entity';
import {
  NotFoundException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { CrearPolizaDto } from '../dto/crear-poliza.dto';
import { UpdatePolizaDto } from '../dto/update-poliza.dto';

describe('PolizasService', () => {
  let service: PolizasService;
  let repo: Repository<Poliza>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PolizasService,
        {
          provide: getRepositoryToken(Poliza),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PolizasService>(PolizasService);
    repo = module.get<Repository<Poliza>>(getRepositoryToken(Poliza));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería retornar un array de pólizas', async () => {
      const polizas = [new Poliza(), new Poliza()];
      jest.spyOn(repo, 'find').mockResolvedValue(polizas);

      const result = await service.findAll();

      expect(result.Success).toBe(true);
      expect(result.Status).toBe(HttpStatus.OK);
      expect(result.Data).toEqual(polizas);
    });
  });

  describe('findOne', () => {
    it('debería retornar una póliza por ID', async () => {
      const poliza = new Poliza();
      jest.spyOn(repo, 'findOne').mockResolvedValue(poliza);

      const result = await service.findOne(1);

      expect(result.Success).toBe(true);
      expect(result.Status).toBe(HttpStatus.OK);
      expect(result.Data).toEqual(poliza);
    });

    it('debería lanzar BadRequestException si la póliza no existe', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAmparos', () => {
    it('debería retornar los amparos de una póliza', async () => {
      const poliza = new Poliza();
      const amparo = new AmparoPoliza();
      amparo.id = 1;
      amparo.descripcion = 'Amparo 1';
      amparo.tipo_valor_amparo_id = 1;
      amparo.amparo_id = 1;
      amparo.suficiencia = 100;
      amparo.fecha_inicio = new Date();
      amparo.fecha_final = new Date();
      poliza.amparos = [amparo];

      jest.spyOn(repo, 'findOne').mockResolvedValue(poliza);

      const result = await service.findAmparos(1);

      expect(result.Success).toBe(true);
      expect(result.Status).toBe(HttpStatus.OK);
      expect(result.Data).toEqual(poliza.amparos);
    });

    it('debería lanzar NotFoundException si la póliza no existe', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);

      await expect(service.findAmparos(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('debería crear una nueva póliza', async () => {
      const dto: CrearPolizaDto = {
        descripcion: 'Nueva Póliza',
        fecha_inicio: new Date('2023-01-01'),
        fecha_fin: new Date('2023-12-31'),
        usuario_id: 1,
        numero_poliza: 'POL-001',
        entidad_aseguradora_id: 1,
        activo: true,
      };
      const poliza = new Poliza();
      Object.assign(poliza, dto);

      jest.spyOn(repo, 'create').mockReturnValue(poliza);
      jest.spyOn(repo, 'save').mockResolvedValue(poliza);

      const result = await service.create(dto);

      expect(result.Success).toBe(true);
      expect(result.Status).toBe(HttpStatus.CREATED);
      expect(result.Data).toEqual(poliza);
    });

    it('debería lanzar BadRequestException si las fechas son inválidas', async () => {
      const dto: CrearPolizaDto = {
        descripcion: 'Nueva Póliza',
        fecha_inicio: new Date('2023-12-31'),
        fecha_fin: new Date('2023-01-01'),
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('debería actualizar una póliza', async () => {
      const dto: UpdatePolizaDto = { descripcion: 'Póliza Actualizada' };
      jest.spyOn(service, 'findOne').mockResolvedValue({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Póliza encontrada',
        Data: new Poliza(),
      });
      jest.spyOn(repo, 'update').mockResolvedValue({ affected: 1 } as any);

      const result = await service.update(1, dto);

      expect(result.Success).toBe(true);
      expect(result.Status).toBe(HttpStatus.OK);
    });

    it('debería lanzar BadRequestException si la actualización falla', async () => {
      const dto: UpdatePolizaDto = { descripcion: 'Póliza Actualizada' };
      jest.spyOn(service, 'findOne').mockResolvedValue({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Póliza encontrada',
        Data: new Poliza(),
      });
      jest.spyOn(repo, 'update').mockResolvedValue({ affected: 0 } as any);

      await expect(service.update(1, dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('debería eliminar una póliza', async () => {
      const poliza = new Poliza();
      jest.spyOn(service, 'findOne').mockResolvedValue({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Póliza encontrada',
        Data: poliza,
      });
      jest.spyOn(repo, 'remove').mockResolvedValue(poliza);

      const result = await service.remove(1);

      expect(result.Success).toBe(true);
      expect(result.Status).toBe(HttpStatus.OK);
    });

    it('debería lanzar BadRequestException si la eliminación falla', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Póliza encontrada',
        Data: new Poliza(),
      });
      jest
        .spyOn(repo, 'remove')
        .mockRejectedValue(new Error('Error de eliminación'));

      await expect(service.remove(1)).rejects.toThrow(BadRequestException);
    });
  });
});
