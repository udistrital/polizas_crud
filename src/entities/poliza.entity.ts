import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AmparoPoliza } from './amparo-poliza.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Poliza {
  @ApiProperty({
    example: 1,
    description: 'ID de la póliza',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Póliza de cumplimiento',
    description: 'Descripción de la póliza',
    nullable: true,
  })
  @Column({ nullable: true })
  descripcion: string;

  @ApiProperty({
    example: '2024-01-16',
    description: 'Fecha de inicio de la póliza',
    nullable: true,
  })
  @Column({ nullable: true, type: 'date' })
  fecha_inicio: Date;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Fecha de finalización de la póliza',
    nullable: true,
  })
  @Column({ nullable: true, type: 'date' })
  fecha_fin: Date;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario',
    nullable: true,
  })
  @Column({ nullable: true })
  usuario_id: number;

  @ApiProperty({
    example: 'USER123',
    description: 'Usuario legacy',
    nullable: true,
  })
  @Column({ nullable: true })
  usuario_legacy: string;

  @ApiProperty({
    example: '2024-01-16',
    description: 'Fecha de aprobación de la póliza',
    nullable: true,
  })
  @Column({ nullable: true, type: 'date' })
  fecha_aprobacion: Date;

  @ApiProperty({
    example: '2024-01-16',
    description: 'Fecha de expedición de la póliza',
    nullable: true,
  })
  @Column({ nullable: true, type: 'date' })
  fecha_expedicion: Date;

  @ApiProperty({
    example: 'POL-2024-001',
    description: 'Número único de la póliza',
    nullable: true,
  })
  @Column({ nullable: true })
  numero_poliza: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la entidad aseguradora',
    nullable: true,
  })
  @Column({ nullable: true })
  entidad_aseguradora_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID del contrato general asociado',
    nullable: true,
  })
  @Column({ nullable: true })
  contrato_general_id: number;

  @ApiProperty({
    example: true,
    description: 'Indica si la póliza está activa',
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

  @ApiProperty({
    type: () => [AmparoPoliza],
    description: 'Lista de amparos asociados a la póliza',
  })
  @OneToMany(() => AmparoPoliza, (amparoPoliza) => amparoPoliza.poliza)
  amparos: AmparoPoliza[];
}
