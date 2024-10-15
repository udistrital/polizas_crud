import { Test, TestingModule } from '@nestjs/testing';
import { PolizasController } from './polizas.controller';
import { PolizasService } from './polizas.service';
import { CrearPolizaDto } from '../dto/crear-poliza.dto';
import { UpdatePolizaDto } from '../dto/update-poliza.dto';
import { HttpStatus } from '@nestjs/common';

describe('PolizasController', () => {
  let controller: PolizasController;
  let service: PolizasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolizasController],
      providers: [
        {
          provide: PolizasService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            findAmparos: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PolizasController>(PolizasController);
    service = module.get<PolizasService>(PolizasService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('debería retornar un array de pólizas', async () => {
      const result = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Pólizas encontradas',
        Data: [{ id: 1, descripcion: 'Póliza 1' }],
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('debería retornar una póliza por ID', async () => {
      const result = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Póliza encontrada',
        Data: { id: 1, descripcion: 'Póliza 1' },
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findAmparos', () => {
    it('debería retornar los amparos de una póliza', async () => {
      const result = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Amparos encontrados',
        Data: [{ id: 1, descripcion: 'Amparo 1' }],
      };
      jest.spyOn(service, 'findAmparos').mockResolvedValue(result);

      expect(await controller.findAmparos('1')).toBe(result);
      expect(service.findAmparos).toHaveBeenCalledWith(1);
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
      const result = {
        Success: true,
        Status: HttpStatus.CREATED,
        Message: 'Póliza creada',
        Data: { id: 1, ...dto },
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('debería actualizar una póliza', async () => {
      const dto: UpdatePolizaDto = { descripcion: 'Póliza Actualizada' };
      const result = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Póliza actualizada',
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('debería eliminar una póliza', async () => {
      const result = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Póliza eliminada',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
