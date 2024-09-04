import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsISO8601,
} from 'class-validator';

export class CrearAmparoPolizaDto {
  @IsNotEmpty()
  @IsNumber()
  tipo_valor_amparo_id: number;

  @IsNotEmpty()
  @IsNumber()
  amparo_id: number;

  @IsNotEmpty()
  @IsNumber()
  suficiencia: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsISO8601()
  fecha_inicio?: string;

  @IsOptional()
  @IsISO8601()
  fecha_final?: string;

  @IsOptional()
  @IsNumber()
  valor?: number;

  @IsOptional()
  @IsString()
  contrato_general_id?: string;

  @IsOptional()
  @IsNumber()
  poliza_id?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
