import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultSetHeader } from 'mysql2';
import { EspecDoctor } from '../espec-doctors/entities/espec-doctor.entity';
import { Especialidade } from '../especialidades/entities/especialidade.entity';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(EspecDoctor)
    private readonly especDoctorRepository: Repository<EspecDoctor>,
    @InjectRepository(Especialidade)
    private readonly especialidadeRepository: Repository<Especialidade>,
  ) {}
  async create(createDoctorDto: CreateDoctorDto) {
    const result = await this.doctorRepository.insert(createDoctorDto);

    const raw: ResultSetHeader = result?.raw;

    if (raw?.affectedRows <= 0) {
      return { status: 'not saved' };
    }
    for (const iterator of createDoctorDto.especialidades) {
      const id = await this.especialidadeRepository.findOne({ nome: iterator });
      this.especDoctorRepository.insert({
        id_doctor: result?.identifiers[0]['id'],
        id_especialidade: id?.id,
      });
    }
    return raw?.affectedRows > 0 ? { status: 'ok' } : { status: 'not saved' };
  }

  async findAll(
    paginateMetadata: { limit: number; page: number },
    filters: Partial<CreateDoctorDto>,
  ) {
    return await this.doctorRepository.find({
      where: filters,
      take: paginateMetadata.limit,
      skip: paginateMetadata.page - 1,
    });
  }
  async listDoctorthroughEspecialidade(
    paginateMetadata: { limit: number; page: number },
    especialidade_id: number,
  ) {
    const result = await this.especDoctorRepository.find({
      where: {
        id_especialidade: especialidade_id,
      },
      take: paginateMetadata.limit,
      skip: paginateMetadata.page - 1,
    });

    const doctors = [];
    for (const iterator of result) {
      const id = iterator.id_doctor;
      doctors.push(await this.doctorRepository.findOne(id));
    }
    return doctors;
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepository.findOne(id);

    if (!doctor) {
      return {};
    }
    const espec_doctors = await this.especDoctorRepository.find({
      id_doctor: doctor.id,
    });

    const especialidades = [];
    for (const iterator of espec_doctors) {
      const especialidade = await this.especialidadeRepository.findOne(
        iterator.id_especialidade,
      );

      especialidades.push(especialidade.nome);
    }
    const result = Object.assign(doctor, { especialidades });
    return result;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const result = await this.doctorRepository.update(id, updateDoctorDto);
    return result?.affected > 0 ? { status: 'ok' } : { status: 'not updated' };
  }

  async remove(id: number) {
    const data = await this.doctorRepository.findOne(id);
    if (!data) {
      return { status: "record doesn't exists" };
    }
    const result = await this.doctorRepository.softDelete(id);
    return result?.affected > 0 ? { status: 'ok' } : { status: 'not removed' };
  }
}
