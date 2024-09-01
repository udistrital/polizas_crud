import { PartialType } from '@nestjs/mapped-types';
import { CrearAmparoPolizaDto } from './crear-amparo-poliza.dto';

export class UpdateAmparoPolizaDto extends PartialType(CrearAmparoPolizaDto) {}
