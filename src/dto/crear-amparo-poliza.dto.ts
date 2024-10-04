import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CrearAmparoPolizaDto {
  @IsOptional()
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
  @IsDate()
  @Type(() => Date)
  fecha_inicio?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha_final?: Date;

  @IsOptional()
  @IsNumber()
  valor?: number;

  @IsOptional()
  @IsString()
  contrato_general_id?: number;

  @IsOptional()
  @IsNumber()
  poliza_id?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
