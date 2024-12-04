import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CrearPolizaDto {
  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha_inicio?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha_fin?: Date;

  @IsOptional()
  @IsNumber()
  usuario_id?: number;

  @IsOptional()
  @IsString()
  usuario_legacy?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha_aprobacion?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha_expedicion?: Date;

  @IsOptional()
  @IsString()
  numero_poliza?: string;

  @IsOptional()
  @IsNumber()
  entidad_aseguradora_id?: number;

  @IsOptional()
  @IsString()
  contrato_general_id?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
