import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateDoctorDto } from './create-doctor.dto';

export class ListDoctorDto extends PartialType(CreateDoctorDto) {
  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  page: number;
}
