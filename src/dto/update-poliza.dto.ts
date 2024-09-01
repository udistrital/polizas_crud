import { PartialType } from '@nestjs/mapped-types';
import { CrearPolizaDto } from "./crear-poliza.dto";

export class UpdatePolizaDto extends PartialType(CrearPolizaDto) {}
