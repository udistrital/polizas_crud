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
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { StandardResponse } from '../utils/standardResponse.interface';

@ApiTags('amparos')
@Controller('amparos')
export class AmparoPolizasController {
  constructor(private readonly amparoPolizasService: AmparoPolizasService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos los amparos',
    description:
      'Obtiene un listado completo de todos los amparos de pólizas registrados en el sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de amparos obtenida exitosamente',
    type: StandardResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Error al consultar los amparos de pólizas',
  })
  findAll(): Promise<StandardResponse<any>> {
    return this.amparoPolizasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un amparo por ID',
    description: 'Busca y retorna un amparo específico basado en su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del amparo a buscar',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Amparo encontrado exitosamente',
    type: StandardResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Amparo no encontrado',
  })
  findOne(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.amparoPolizasService.findOne(+id);
  }

  @Get('contrato/:id')
  @ApiOperation({
    summary: 'Listar todos los amparos de un contrato',
    description: 'Obtiene todos los amparos asociados a un contrato específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del contrato',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Amparos del contrato encontrados exitosamente',
    type: StandardResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron amparos para el contrato especificado',
  })
  findByContractId(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.amparoPolizasService.findByContractId(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear múltiples amparos de pólizas',
    description:
      'Crea múltiples registros de amparos de pólizas en una sola operación',
  })
  @ApiBody({
    type: [CrearAmparoPolizaDto],
    description: 'Array de amparos a crear',
  })
  @ApiResponse({
    status: 201,
    description: 'Amparos creados exitosamente',
    type: StandardResponse,
  })
  @ApiResponse({
    status: 206,
    description: 'Algunos amparos no pudieron ser creados',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la validación de los datos',
  })
  async create(
    @Body() crearAmparoPolizasDto: CrearAmparoPolizaDto[],
  ): Promise<StandardResponse<any>> {
    return await this.amparoPolizasService.createMultiple(
      crearAmparoPolizasDto,
    );
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un amparo',
    description: 'Actualiza la información de un amparo específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del amparo a actualizar',
    type: 'number',
  })
  @ApiBody({
    type: UpdateAmparoPolizaDto,
    description: 'Datos a actualizar del amparo',
  })
  @ApiResponse({
    status: 200,
    description: 'Amparo actualizado exitosamente',
    type: StandardResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Amparo no encontrado',
  })
  update(
    @Param('id') id: string,
    @Body() updateAmparoPolizaDto: UpdateAmparoPolizaDto,
  ): Promise<StandardResponse<any>> {
    return this.amparoPolizasService.update(+id, updateAmparoPolizaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un amparo',
    description: 'Elimina un amparo específico del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del amparo a eliminar',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Amparo eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Amparo no encontrado',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.amparoPolizasService.remove(+id);
  }
}
