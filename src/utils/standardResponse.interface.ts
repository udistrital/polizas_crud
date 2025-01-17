import { ApiProperty } from '@nestjs/swagger';

export class StandardResponse<T> {
  @ApiProperty({
    description: 'Indica si la operación fue exitosa',
    example: true,
  })
  Success: boolean;

  @ApiProperty({
    description: 'Código de estado HTTP',
    example: 200,
  })
  Status: number;

  @ApiProperty({
    description: 'Mensaje descriptivo de la operación',
    example: 'Operación exitosa',
  })
  Message: string;

  @ApiProperty({
    description: 'Datos retornados por la operación',
    example: null,
  })
  Data?: T;
}
