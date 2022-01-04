import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecDoctor } from 'src/espec-doctors/entities/espec-doctor.entity';
import { CepService } from '../cep/cepService.service';
import { HttpModule } from '@nestjs/axios';
import { Doctor } from './entities/doctor.entity';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EspecDoctor, Doctor, Especialidade]),
    HttpModule,
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService, CepService],
})
export class DoctorsModule {}
