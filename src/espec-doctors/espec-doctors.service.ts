import { Injectable } from '@nestjs/common';
import { CreateEspecDoctorDto } from './dto/create-espec-doctor.dto';
import { UpdateEspecDoctorDto } from './dto/update-espec-doctor.dto';

@Injectable()
export class EspecDoctorsService {
  create(createEspecDoctorDto: CreateEspecDoctorDto) {
    return 'This action adds a new especDoctor';
  }

  findAll() {
    return `This action returns all especDoctors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} especDoctor`;
  }

  update(id: number, updateEspecDoctorDto: UpdateEspecDoctorDto) {
    return `This action updates a #${id} especDoctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} especDoctor`;
  }
}
