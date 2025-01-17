import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Poliza } from '../entities/poliza.entity';
import { CrearPolizaDto } from '../dto/crear-poliza.dto';
import { UpdatePolizaDto } from '../dto/update-poliza.dto';
import { StandardResponse } from 'src/utils/standardResponse.interface';

@Injectable()
export class PolizasService {
  constructor(
    @InjectRepository(Poliza)
    private readonly polizasRepository: Repository<Poliza>,
  ) {}

  async findAll(): Promise<StandardResponse<Poliza[]>> {
    const polizas: Poliza[] = await this.polizasRepository.find();
    return {
      Success: true,
      Status: HttpStatus.OK,
      Message: 'Póliza encontrada',
      Data: polizas,
    };
  }

  async findOne(id: number): Promise<StandardResponse<Poliza>> {
    try {
      const poliza: Poliza = await this.polizasRepository.findOne({
        where: { id },
      });
      if (!poliza) {
        throw new NotFoundException({
          Success: false,
          Status: 404,
          Message: `Poliza con ID ${id} no encontrada.`,
        });
      }
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Poliza encontrada',
        Data: poliza,
      };
    } catch (error) {
      throw new BadRequestException({
        Success: false,
        Status: 400,
        Message: 'Error al consultar la póliza',
        Data: error.message,
      });
    }
  }

  async findAmparos(id: number): Promise<StandardResponse<any>> {
    const poliza = await this.polizasRepository.findOne({
      where: { id },
      relations: ['amparos'],
    });
    if (!poliza) {
      throw new NotFoundException(`Poliza con ID ${id} no encontrada.`);
    }
    return {
      Success: true,
      Status: HttpStatus.OK,
      Message: 'Amparos encontrados',
      Data: poliza.amparos,
    };
  }

  async create(
    crearPolizaDto: CrearPolizaDto,
  ): Promise<StandardResponse<Poliza>> {
    if (crearPolizaDto.fecha_inicio && crearPolizaDto.fecha_fin) {
      this.validarFechas(crearPolizaDto.fecha_inicio, crearPolizaDto.fecha_fin);
    }
    const poliza: Poliza = this.polizasRepository.create(crearPolizaDto);
    return {
      Success: true,
      Status: HttpStatus.CREATED,
      Message: 'Póliza creada',
      Data: await this.polizasRepository.save(poliza),
    };
  }

  async update(
    id: number,
    updatePolizaDto: UpdatePolizaDto,
  ): Promise<StandardResponse<any>> {
    await this.findOne(id);

    if (updatePolizaDto.fecha_inicio && updatePolizaDto.fecha_fin) {
      this.validarFechas(
        updatePolizaDto.fecha_inicio,
        updatePolizaDto.fecha_fin,
      );
    }

    const result: UpdateResult = await this.polizasRepository.update(
      id,
      updatePolizaDto,
    );
    if (result.affected === 1) {
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Póliza actualizada',
      };
    }
    throw new BadRequestException({
      Success: false,
      Status: 400,
      Message: 'Error al actualizar la póliza',
    });
  }

  async remove(id: number): Promise<StandardResponse<any>> {
    const poliza = await this.findOne(id);
    try {
      await this.polizasRepository.remove(poliza.Data);
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Póliza eliminada',
      };
    } catch (error) {
      throw new BadRequestException({
        Success: false,
        Status: 400,
        Message: 'Error al eliminar la póliza',
        Data: error.message,
      });
    }
  }

  async findByContractId(id: number): Promise<StandardResponse<Poliza[]>> {
    try {
      const polizas: Poliza[] = await this.polizasRepository.find({
        where: { contrato_general_id: id },
      });
      if (polizas.length === 0) {
        throw new NotFoundException(
          `No se encontraron polizas para el contrato con ID ${id}`,
        );
      }
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Amparos de pólizas encontrados',
        Data: polizas,
      };
    } catch (error) {
      throw new BadRequestException({
        Success: false,
        Status: 400,
        Message: 'Error al consultar los amparos de pólizas',
        Data: error.message,
      });
    }
  }

  private validarFechas(fechaInicio: Date, fechaFin: Date): void {
    if (fechaInicio >= fechaFin) {
      throw new BadRequestException(
        'La fecha de inicio debe ser menor a la fecha final',
      );
    }
  }
}
