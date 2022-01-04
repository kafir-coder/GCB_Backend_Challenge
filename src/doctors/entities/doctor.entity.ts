import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('doctor', { synchronize: true, schema: 'doctors' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  CRM: number;

  @Column()
  telefone_fixo: number;

  @Column()
  telefone_celular: number;

  @Column()
  CEP: number;

  @Column()
  endereco: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
