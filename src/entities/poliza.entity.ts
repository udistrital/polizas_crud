import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AmparoPoliza } from './amparo-poliza.entity';

@Entity()
export class Poliza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  fecha_inicio: Date;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  fecha_fin: Date;

  @Column({ nullable: true })
  usuario_id: number;

  @Column({ nullable: true })
  usuario_legacy: string;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  fecha_aprobacion: Date;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  fecha_expedicion: Date;

  @Column({ nullable: true })
  numero_poliza: string;

  @Column({ nullable: true })
  entidad_aseguradora_id: number;

  @Column({ nullable: true })
  contrato_general_id: string;

  @Column({ nullable: false, default: true })
  activo: boolean;

  @Column({
    nullable: false,
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;

  @Column({
    nullable: false,
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  fecha_modificacion: Date;

  @OneToMany(() => AmparoPoliza, (amparoPoliza) => amparoPoliza.poliza)
  amparos: AmparoPoliza[];
}
