import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EspecDoctorsService } from './espec-doctors.service';
import { CreateEspecDoctorDto } from './dto/create-espec-doctor.dto';
import { UpdateEspecDoctorDto } from './dto/update-espec-doctor.dto';

@Controller('espec-doctors')
export class EspecDoctorsController {
  constructor(private readonly especDoctorsService: EspecDoctorsService) {}

  @Post()
  create(@Body() createEspecDoctorDto: CreateEspecDoctorDto) {
    return this.especDoctorsService.create(createEspecDoctorDto);
  }

  @Get()
  findAll() {
    return this.especDoctorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especDoctorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecDoctorDto: UpdateEspecDoctorDto) {
    return this.especDoctorsService.update(+id, updateEspecDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especDoctorsService.remove(+id);
  }
}
