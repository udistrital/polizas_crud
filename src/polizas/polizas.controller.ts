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
import { StandardResponse } from '../utils/standardResponse.interface';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('polizas')
@Controller('polizas')
export class PolizasController {
  constructor(private readonly polizasService: PolizasService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las pólizas',
    description:
      'Retorna un listado de todas las pólizas registradas en el sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pólizas obtenida exitosamente',
    type: StandardResponse,
  })
  findAll(): Promise<StandardResponse<any>> {
    return this.polizasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una póliza por ID',
    description: 'Busca y retorna una póliza específica basada en su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la póliza',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Póliza encontrada exitosamente',
    type: StandardResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Póliza no encontrada',
  })
  findOne(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.polizasService.findOne(+id);
  }

  @Get(':id/amparos')
  @ApiOperation({
    summary: 'Obtener amparos de una póliza',
    description: 'Retorna todos los amparos asociados a una póliza específica',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la póliza',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Amparos encontrados exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Póliza no encontrada',
  })
  findAmparos(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.polizasService.findAmparos(+id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva póliza',
    description: 'Crea una nueva póliza con los datos proporcionados',
  })
  @ApiBody({
    type: CrearPolizaDto,
    description: 'Datos de la póliza a crear',
  })
  @ApiResponse({
    status: 201,
    description: 'Póliza creada exitosamente',
    type: StandardResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la validación de datos',
  })
  create(
    @Body() crearPolizaDto: CrearPolizaDto,
  ): Promise<StandardResponse<any>> {
    return this.polizasService.create(crearPolizaDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una póliza',
    description: 'Actualiza los datos de una póliza existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la póliza a actualizar',
    type: 'number',
  })
  @ApiBody({
    type: UpdatePolizaDto,
    description: 'Datos a actualizar de la póliza',
  })
  @ApiResponse({
    status: 200,
    description: 'Póliza actualizada exitosamente',
    type: StandardResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Póliza no encontrada',
  })
  update(
    @Param('id') id: string,
    @Body() updatePolizaDto: UpdatePolizaDto,
  ): Promise<StandardResponse<any>> {
    return this.polizasService.update(+id, updatePolizaDto);
  }

  @Get('contrato/:id')
  @ApiOperation({
    summary: 'Listar todas las pólizas de un contrato',
    description: 'Obtiene todas las pólizas asociadas a un contrato específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del contrato',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Pólizas del contrato encontradas exitosamente',
    type: StandardResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron pólizas para el contrato especificado',
  })
  findByContractId(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.polizasService.findByContractId(+id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una póliza',
    description: 'Elimina una póliza específica del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la póliza a eliminar',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Póliza eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Póliza no encontrada',
  })
  remove(@Param('id') id: string): Promise<StandardResponse<any>> {
    return this.polizasService.remove(+id);
  }
}
