import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PolizasService } from './polizas.service';
import { CrearPolizaDto } from '../dto/crear-poliza.dto';
import { UpdatePolizaDto } from '../dto/update-poliza.dto';

@Controller('polizas')
export class PolizasController {
  constructor(private readonly polizasService: PolizasService) {}

  @Get()
  findAll(): Promise<StandardResponse<any>> {
    return this.polizasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.polizasService.findOne(+id);
  }

  @Get(':id/amparos')
  findAmparos(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.polizasService.findAmparos(+id);
  }

  @Post()
  create(
    @Body() crearPolizaDto: CrearPolizaDto,
  ): Promise<StandardResponse<any>> {
    return this.polizasService.create(crearPolizaDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePolizaDto: UpdatePolizaDto,
  ): Promise<StandardResponse<any>> {
    return this.polizasService.update(+id, updatePolizaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.polizasService.remove(+id);
  }
}
