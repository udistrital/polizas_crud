import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AmparoPoliza } from '../entities/amparo-poliza.entity';
import { UpdateAmparoPolizaDto } from '../dto/update-amparo-poliza.dto';
import { CrearAmparoPolizaDto } from '../dto/crear-amparo-poliza.dto';
import { StandardResponse } from '../utils/standardResponse.interface';

@Injectable()
export class AmparoPolizasService {
  constructor(
    @InjectRepository(AmparoPoliza)
    private amparoPolizasRepository: Repository<AmparoPoliza>,
  ) {}

  async findAll(): Promise<StandardResponse<any>> {
    try {
      const data = await this.amparoPolizasRepository.find();
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Amparos de pólizas encontrados',
        Data: data,
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

  async findOne(id: number): Promise<StandardResponse<any>> {
    try {
      const amparo = await this.amparoPolizasRepository.findOne({
        where: { id },
      });
      if (!amparo) {
        throw new NotFoundException(`Amparo con ID ${id} no encontrado.`);
      }
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Amparo de póliza encontrado',
        Data: amparo,
      };
    } catch (error) {
      throw new BadRequestException({
        Success: false,
        Status: 400,
        Message: 'Error al consultar el amparo de póliza',
        Data: error.message,
      });
    }
  }

  async findByContractId(id: number): Promise<StandardResponse<any>> {
    try {
      const amparos = await this.amparoPolizasRepository.find({
        where: { contrato_general_id: id },
      });
      if (amparos.length === 0) {
        throw new NotFoundException(
          `No se encontraron amparos para el contrato con ID ${id}`,
        );
      }
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Amparos de pólizas encontrados',
        Data: amparos,
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

  async createMultiple(
    crearAmparoPolizasDto: CrearAmparoPolizaDto[],
  ): Promise<StandardResponse<any>> {
    const createdAmparos = [];
    const errors = [];

    for (const dto of crearAmparoPolizasDto) {
      try {
        if (dto.fecha_inicio && dto.fecha_final) {
          this.validarFechas(dto.fecha_inicio, dto.fecha_final);
        }
        const amparoPoliza = this.amparoPolizasRepository.create(dto);
        const savedAmparo =
          await this.amparoPolizasRepository.save(amparoPoliza);
        createdAmparos.push(savedAmparo);
      } catch (error) {
        errors.push({ dto, error: error.message });
      }
    }

    if (errors.length > 0) {
      return {
        Success: false,
        Status: HttpStatus.PARTIAL_CONTENT,
        Message: 'Algunos amparos de pólizas no pudieron ser creados',
        Data: { createdAmparos, errors },
      };
    }

    return {
      Success: true,
      Status: HttpStatus.CREATED,
      Message: 'Todos los amparos de pólizas fueron creados exitosamente',
      Data: createdAmparos,
    };
  }

  async update(
    id: number,
    updateAmparoPolizaDto: UpdateAmparoPolizaDto,
  ): Promise<StandardResponse<any>> {
    await this.findOne(id);

    try {
      if (
        updateAmparoPolizaDto.fecha_inicio &&
        updateAmparoPolizaDto.fecha_final
      ) {
        this.validarFechas(
          updateAmparoPolizaDto.fecha_inicio,
          updateAmparoPolizaDto.fecha_final,
        );
      }
      const result: UpdateResult = await this.amparoPolizasRepository.update(
        id,
        updateAmparoPolizaDto,
      );
      if (result.affected === 1) {
        return {
          Success: true,
          Status: HttpStatus.OK,
          Message: 'Amparo de póliza actualizado',
        };
      }
    } catch (error) {
      throw new BadRequestException({
        Success: false,
        Status: 400,
        Message: 'Error al actualizar el amparo de póliza',
        Data: error.message,
      });
    }
  }

  async remove(id: number): Promise<void> {
    const amparoPoliza = await this.findOne(id);
    try {
      await this.amparoPolizasRepository.remove(amparoPoliza.Data);
    } catch (error) {
      throw new BadRequestException({
        Success: false,
        Status: 400,
        Message: 'Error al eliminar el amparo de póliza',
        Data: error.message,
      });
    }
  }

  private validarFechas(fechaInicio: Date, fechaFinal: Date): void {
    if (fechaInicio >= fechaFinal) {
      throw new BadRequestException(
        'La fecha de inicio debe ser menor a la fecha final',
      );
    }
  }
}
