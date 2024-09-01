import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AmparoPoliza } from '../entities/amparo-poliza.entity';
import { UpdateAmparoPolizaDto } from '../dto/update-amparo-poliza.dto';
import { CrearAmparoPolizaDto } from '../dto/crear-amparo-poliza.dto';

@Injectable()
export class AmparoPolizasService {
  constructor(
    @InjectRepository(AmparoPoliza)
    private amparoPolizasRepository: Repository<AmparoPoliza>,
  ) {}

  async findAll(): Promise<AmparoPoliza[]> {
    return this.amparoPolizasRepository.find();
  }

  async findOne(id: number): Promise<AmparoPoliza> {
    const amparo = await this.amparoPolizasRepository.findOne({
      where: { id },
    });
    if (!amparo) {
      throw new NotFoundException(`Amparo con ID ${id} no encontrada.`);
    }
    return amparo;
  }

  async create(
    crearAmparoPolizaDto: CrearAmparoPolizaDto,
  ): Promise<AmparoPoliza> {
    this.validarFechas(
      crearAmparoPolizaDto.fecha_inicio,
      crearAmparoPolizaDto.fecha_final,
    );
    return this.amparoPolizasRepository.save(crearAmparoPolizaDto);
  }

  async update(
    id: number,
    updateAmparoPolizaDto: UpdateAmparoPolizaDto,
  ): Promise<AmparoPoliza> {
    await this.findOne(id);

    if (
      updateAmparoPolizaDto.fecha_inicio ||
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
      return this.findOne(id);
    }
  }

  async remove(id: number): Promise<void> {
    const poliza = await this.findOne(id);
    try {
      await this.amparoPolizasRepository.remove(poliza);
    } catch (error) {
      throw new BadRequestException(
        'No se puede eliminar la póliza: ' + error.message,
      );
    }
  }

  private validarFechas(fechaInicio: string, fechaFin: string): void {
    if (fechaInicio >= fechaFin) {
      throw new BadRequestException(
        'La fecha de inicio debe ser menor a la fecha final',
      );
    }
  }
}
