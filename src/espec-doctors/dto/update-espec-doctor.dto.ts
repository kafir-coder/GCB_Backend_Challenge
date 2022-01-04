import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecDoctorDto } from './create-espec-doctor.dto';

export class UpdateEspecDoctorDto extends PartialType(CreateEspecDoctorDto) {}
