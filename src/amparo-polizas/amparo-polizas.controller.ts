import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AmparoPolizasService } from './amparo-polizas.service';
import { AmparoPoliza } from '../entities/amparo-poliza.entity';
import { UpdateAmparoPolizaDto } from '../dto/update-amparo-poliza.dto';
import { CrearAmparoPolizaDto } from '../dto/crear-amparo-poliza.dto';

@Controller('polizas')
export class AmparoPolizasController {
  constructor(private readonly amparoPolizasService: AmparoPolizasService) {}

  @Get()
  findAll(): Promise<AmparoPoliza[]> {
    return this.amparoPolizasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AmparoPoliza> {
    return this.amparoPolizasService.findOne(+id);
  }

  @Post()
  create(
    @Body() crearAmparoPolizaDto: CrearAmparoPolizaDto,
  ): Promise<AmparoPoliza> {
    return this.amparoPolizasService.create(crearAmparoPolizaDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAmparoPolizaDto: UpdateAmparoPolizaDto,
  ): Promise<AmparoPoliza> {
    return this.amparoPolizasService.update(+id, updateAmparoPolizaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.amparoPolizasService.remove(+id);
  }
}
