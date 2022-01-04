import { IsNotEmpty } from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  CRM: number;

  @IsNotEmpty()
  telefone_fixo: number;

  @IsNotEmpty()
  telefone_celular: number;

  @IsNotEmpty()
  CEP: number;

  @IsNotEmpty()
  especialidades: string[];
}
