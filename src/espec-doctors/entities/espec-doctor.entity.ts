import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('espec_doctor', { synchronize: true, schema: 'especialidades' })
export class EspecDoctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_especialidade: number;

  @Column()
  id_doctor: number;
}
