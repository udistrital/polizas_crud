import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Poliza } from './poliza.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AmparoPoliza {
  @ApiProperty({
    example: 1,
    description: 'ID del amparo de póliza',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID Parámetros CRUD del tipo de valor del amparo',
    nullable: true,
  })
  @Column({ nullable: true })
  tipo_valor_amparo_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID del amparo',
  })
  @Column({ nullable: false })
  amparo_id: number;

  @ApiProperty({
    example: 100.0,
    description: 'Valor de suficiencia del amparo',
  })
  @Column({ nullable: false, type: 'numeric' })
  suficiencia: number;

  @ApiProperty({
    example: 'Descripción del amparo',
    description: 'Descripción detallada del amparo',
    nullable: true,
  })
  @Column({ nullable: true })
  descripcion: string;

  @ApiProperty({
    example: '2024-01-16',
    description: 'Fecha de inicio del amparo',
    nullable: true,
  })
  @Column({ nullable: true, type: 'date' })
  fecha_inicio: Date;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Fecha final del amparo',
    nullable: true,
  })
  @Column({ nullable: true, type: 'date' })
  fecha_final: Date;

  @ApiProperty({
    example: 1000000.0,
    description: 'Valor monetario del amparo',
    nullable: true,
  })
  @Column({ nullable: true, type: 'numeric' })
  valor: number;

  @ApiProperty({
    example: 1,
    description: 'ID del contrato general asociado',
    nullable: true,
  })
  @Column({ nullable: true })
  contrato_general_id: number;

  @ApiProperty({
    type: () => Poliza,
    description: 'Póliza asociada al amparo',
  })
  @ManyToOne(() => Poliza, (poliza) => poliza.amparos, { nullable: true })
  @JoinColumn({ name: 'poliza_id' })
  poliza: Poliza;

  @ApiProperty({
    example: 1,
    description: 'ID de la póliza asociada',
    nullable: true,
  })
  @Column({ nullable: true })
  poliza_id: number;

  @ApiProperty({
    example: true,
    description: 'Indica si el amparo está activo',
    default: true,
  })
  @Column({ nullable: false, default: true })
  activo: boolean;

  @ApiProperty({
    example: '2024-01-16T10:00:00Z',
    description: 'Fecha de creación del registro',
  })
  @Column({
    nullable: false,
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;

  @ApiProperty({
    example: '2024-01-16T10:00:00Z',
    description: 'Fecha de última modificación del registro',
  })
  @Column({
    nullable: false,
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  fecha_modificacion: Date;
}
