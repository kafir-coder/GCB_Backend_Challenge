import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('especialidade', { synchronize: false, schema: 'especialidades' })
export class Especialidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}
