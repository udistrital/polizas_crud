import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AmparoPolizasService } from './amparo-polizas.service';
import { UpdateAmparoPolizaDto } from '../dto/update-amparo-poliza.dto';
import { CrearAmparoPolizaDto } from '../dto/crear-amparo-poliza.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StandardResponse } from '../utils/standardResponse.interface';

@ApiTags('amparos')
@Controller('amparos')
export class AmparoPolizasController {
  constructor(private readonly amparoPolizasService: AmparoPolizasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los amparos' })
  findAll(): Promise<StandardResponse<any>> {
    return this.amparoPolizasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.amparoPolizasService.findOne(+id);
  }

  @ApiOperation({ summary: 'Listar todos los amparos de un contrato' })
  @Get('contrato/:id')
  findByContractId(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.amparoPolizasService.findByContractId(+id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear múltiples amparos de pólizas' })
  async create(
    @Body() crearAmparoPolizasDto: CrearAmparoPolizaDto[],
  ): Promise<StandardResponse<any>> {
    return await this.amparoPolizasService.createMultiple(
      crearAmparoPolizasDto,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAmparoPolizaDto: UpdateAmparoPolizaDto,
  ): Promise<StandardResponse<any>> {
    return this.amparoPolizasService.update(+id, updateAmparoPolizaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.amparoPolizasService.remove(+id);
  }
}
