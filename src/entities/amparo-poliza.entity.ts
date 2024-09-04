import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Poliza } from './poliza.entity';

@Entity()
export class AmparoPoliza {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  tipo_valor_amparo_id: number;

  @Column({ nullable: false })
  amparo_id: number;

  @Column({ nullable: false, type: 'numeric' })
  suficiencia: number;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true, type: 'date' })
  fecha_inicio: Date;

  @Column({ nullable: true, type: 'date' })
  fecha_final: Date;

  @Column({ nullable: true, type: 'numeric' })
  valor: number;

  @Column({ nullable: true })
  contrato_general_id: string;

  @ManyToOne(() => Poliza, (poliza) => poliza.amparos, { nullable: true })
  @JoinColumn({ name: 'poliza_id' })
  poliza: Poliza;

  @Column({ nullable: true })
  poliza_id: number;

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
}