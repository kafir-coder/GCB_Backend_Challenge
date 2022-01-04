import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { Especialidade } from './entities/especialidade.entity';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidade)
    private readonly especialidadeRepository: Repository<Especialidade>,
  ) {}
  create(createEspecialidadeDto: CreateEspecialidadeDto) {
    return this.especialidadeRepository.insert(createEspecialidadeDto);
  }

  findAll() {
    return `This action returns all especialidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} especialidade`;
  }

  update(id: number, updateEspecialidadeDto: UpdateEspecialidadeDto) {
    return `This action updates a #${id} especialidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} especialidade`;
  }
}
