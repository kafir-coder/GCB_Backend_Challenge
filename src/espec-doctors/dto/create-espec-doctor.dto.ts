import { IsNotEmpty } from 'class-validator';

export class CreateEspecDoctorDto {
  @IsNotEmpty()
  id_especialidade: number;

  @IsNotEmpty()
  id_doctor: number;
}
