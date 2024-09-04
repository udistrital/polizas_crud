import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Poliza } from '../entities/poliza.entity';
import { CrearPolizaDto } from '../dto/crear-poliza.dto';
import { UpdatePolizaDto } from '../dto/update-poliza.dto';

@Injectable()
export class PolizasService {
  constructor(
    @InjectRepository(Poliza)
    private readonly polizasRepository: Repository<Poliza>,
  ) {}

  async findAll(): Promise<Poliza[]> {
    return this.polizasRepository.find();
  }

  async findOne(id: number): Promise<Poliza> {
    const poliza = await this.polizasRepository.findOne({ where: { id } });
    if (!poliza) {
      throw new NotFoundException(`Poliza con ID ${id} no encontrada.`);
    }
    return poliza;
  }

  async findAmparos(id: number): Promise<Poliza> {
    const poliza = await this.polizasRepository.findOne({
      where: { id },
      relations: ['amparos'],
    });
    if (!poliza) {
      throw new NotFoundException(`Poliza con ID ${id} no encontrada.`);
    }
    return poliza;
  }

  async create(crearPolizaDto: CrearPolizaDto): Promise<Poliza> {
    if (crearPolizaDto.fecha_inicio && crearPolizaDto.fecha_fin) {
      this.validarFechas(crearPolizaDto.fecha_inicio, crearPolizaDto.fecha_fin);
    }
    const poliza = this.polizasRepository.create(crearPolizaDto);
    return this.polizasRepository.save(poliza);
  }

  async update(id: number, updatePolizaDto: UpdatePolizaDto): Promise<Poliza> {
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
      return await this.findOne(id);
    }
    throw new BadRequestException(`No se pudo actualizar la póliza con ID ${id}`);
  }

  async remove(id: number): Promise<void> {
    const poliza = await this.findOne(id);
    try {
      await this.polizasRepository.remove(poliza);
    } catch (error) {
      throw new BadRequestException(
        'No se puede eliminar la póliza: ' + error.message,
      );
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