import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { CepService } from '../cep/cepService.service';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly cepService: CepService,
  ) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const address = await this.cepService.getAddress();
    if (address == null) {
      throw new HttpException('server error', 500);
    }
    const tobeSaved = Object.assign({ endereco: address }, createDoctorDto);
    const result = await this.doctorsService.create(tobeSaved);
    if (result.status === 'not saved') {
      throw new HttpException('server error', 500);
    }
    return result;
  }

  @Get()
  findAll(@Query() query) {
    const { limit, page, ...rest } = query;

    return this.doctorsService.findAll({ limit, page }, rest);
  }

  @Get('findByEspecialidade/:espec_id')
  async findByEspecialidade(@Param() param, @Query() paginateMetadata) {
    const { espec_id } = param;

    return await this.doctorsService.listDoctorthroughEspecialidade(
      paginateMetadata,
      espec_id,
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return await this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
