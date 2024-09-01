import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsISO8601,
} from 'class-validator';

export class CrearPolizaDto {
  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsISO8601()
  fecha_inicio?: string;

  @IsOptional()
  @IsISO8601()
  fecha_fin?: string;

  @IsOptional()
  @IsNumber()
  usuario_id?: number;

  @IsOptional()
  @IsString()
  usuario_legacy?: string;

  @IsOptional()
  @IsISO8601()
  fecha_aprobacion?: string;

  @IsOptional()
  @IsISO8601()
  fecha_expedicion?: string;

  @IsOptional()
  @IsString()
  numero_poliza?: string;

  @IsOptional()
  @IsNumber()
  entidad_aseguradora_id?: number;

  @IsOptional()
  @IsString()
  contrato_general_id?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
