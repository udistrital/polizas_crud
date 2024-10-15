import { Test, TestingModule } from '@nestjs/testing';
import { AmparoPolizasController } from './amparo-polizas.controller';
import { AmparoPolizasService } from './amparo-polizas.service';
import { CrearAmparoPolizaDto } from '../dto/crear-amparo-poliza.dto';
import { UpdateAmparoPolizaDto } from '../dto/update-amparo-poliza.dto';

interface StandardResponse<T> {
  Success: boolean;
  Status: number;
  Message: string;
  Data?: T;
}

describe('AmparoPolizasController', () => {
  let controller: AmparoPolizasController;
  let service: AmparoPolizasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmparoPolizasController],
      providers: [
        {
          provide: AmparoPolizasService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByContractId: jest.fn(),
            createMultiple: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AmparoPolizasController>(AmparoPolizasController);
    service = module.get<AmparoPolizasService>(AmparoPolizasService);
  });

  it('El controlador debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Debería llamar a amparoPolizasService.findAll y devolver el resultado', async () => {
      const result: StandardResponse<any[]> = {
        Success: true,
        Status: 200,
        Message: 'Éxito',
        Data: [],
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Debería llamar a amparoPolizasService.findOne con el ID proporcionado y devolver el resultado', async () => {
      const id = '1';
      const result: StandardResponse<any> = {
        Success: true,
        Status: 200,
        Message: 'Éxito',
        Data: { id: 1 },
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('findByContractId', () => {
    it('Debería llamar a amparoPolizasService.findByContractId con el ID del contrato proporcionado y devolver el resultado', async () => {
      const id = '1';
      const result: StandardResponse<any[]> = {
        Success: true,
        Status: 200,
        Message: 'Éxito',
        Data: [],
      };
      jest.spyOn(service, 'findByContractId').mockResolvedValue(result);

      expect(await controller.findByContractId(id)).toBe(result);
      expect(service.findByContractId).toHaveBeenCalledWith(+id);
    });
  });

  describe('create', () => {
    it('Debería llamar a amparoPolizasService.createMultiple con los DTOs proporcionados y devolver el resultado', async () => {
      const dtos: CrearAmparoPolizaDto[] = [
        {
          amparo_id: 1,
          suficiencia: 100,
          tipo_valor_amparo_id: 1,
          descripcion: 'Test amparo',
          fecha_inicio: new Date(),
          fecha_final: new Date(),
          valor: 1000,
          contrato_general_id: 1,
          poliza_id: 1,
          activo: true,
        },
      ];
      const result: StandardResponse<CrearAmparoPolizaDto[]> = {
        Success: true,
        Status: 201,
        Message: 'Creado con éxito',
        Data: dtos,
      };
      jest.spyOn(service, 'createMultiple').mockResolvedValue(result);

      expect(await controller.create(dtos)).toBe(result);
      expect(service.createMultiple).toHaveBeenCalledWith(dtos);
    });
  });

  describe('update', () => {
    it('Debería llamar a amparoPolizasService.update con el ID y DTO proporcionados y devolver el resultado', async () => {
      const id = '1';
      const dto: UpdateAmparoPolizaDto = {
        suficiencia: 200,
        descripcion: 'Updated amparo',
      };
      const result: StandardResponse<any> = {
        Success: true,
        Status: 200,
        Message: 'Actualizado con éxito',
        Data: { id: 1, ...dto },
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(+id, dto);
    });
  });

  describe('remove', () => {
    it('Debería llamar a amparoPolizasService.remove con el ID proporcionado', async () => {
      const id = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await expect(controller.remove(id)).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
