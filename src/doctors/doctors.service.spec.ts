import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EspecDoctor } from '../espec-doctors/entities/espec-doctor.entity';
import { Especialidade } from '../especialidades/entities/especialidade.entity';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';

describe('DoctorsService', () => {
  let service: DoctorsService;

  const mockDoctorRepository = {
    insert: jest.fn((createDoctorDto) => ({
      identifiers: [{ id: 2 }],
      generatedMaps: [{ id: 2, deletedAt: null }],
      raw: {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 2,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
      },
    })),
    find: jest.fn((paginateMetada, filters) => {
      return [
        {
          id: 1,
          nome: 'Caio Tony',
          CRM: 12345983,
          telefone_fixo: 92122121,
          telefone_celular: 23332321,
          CEP: 23453,
        },
        {
          id: 2,
          nome: 'Caio Tony',
          CRM: 12345983,
          telefone_fixo: 92122121,
          telefone_celular: 23332321,
          CEP: 23453,
        },
      ];
    }),
    findOne: jest.fn((id) => ({
      id: id,
      nome: 'Caio Tony',
      CRM: 12345983,
      telefone_fixo: 92122121,
      telefone_celular: 23332321,
      CEP: 23453,
    })),
    update: jest.fn(),
    softDelete: jest.fn(),
  };
  const mockEspecialidadeRepository = {
    findOne: jest.fn(() => ({
      id: 1,
      nome: 'alergologia',
    })),
  };
  const mockEspecDoctorRepository = {
    insert: jest.fn((createDoctorDto) => {}),
    find: jest.fn((paginateMetada, filters) => [
      {
        id_doctor: 1,
        id_especialidade: 4,
      },
      {
        id_doctor: 2,
        id_especialidade: 3,
      },
    ]),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        {
          provide: getRepositoryToken(Doctor),
          useValue: mockDoctorRepository,
        },
        {
          provide: getRepositoryToken(Especialidade),
          useValue: mockEspecialidadeRepository,
        },
        {
          provide: getRepositoryToken(EspecDoctor),
          useValue: mockEspecDoctorRepository,
        },
      ],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService);

    jest.clearAllMocks();
  });

  it('doctorService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('doctorService.create ', () => {
    it('doctorService.create should call doctorRepository.insert', async () => {
      const doctorDto = {
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
        especialidades: ['Alergologia', 'Cardiologia clínca'],
      };
      await service.create(doctorDto);

      expect(mockDoctorRepository.insert).toBeCalledTimes(1);
    });
    it('doctorService.create should call doctorRepository.insert with proper argument', async () => {
      const doctorDto = {
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
        especialidades: ['Alergologia', 'Cardiologia clínca'],
      };
      await service.create(doctorDto);

      expect(mockDoctorRepository.insert).toBeCalledWith(doctorDto);
    });
    it('doctorService.create should return {status: "not saved"} if doctorRepository.insert returns a raw property with a affectedRows property less or equal than 0', async () => {
      jest.spyOn(mockDoctorRepository, 'insert').mockReturnValue({
        identifiers: [{ id: 2 }],
        generatedMaps: [{ id: 2, deletedAt: null }],
        raw: {
          fieldCount: 0,
          affectedRows: 0,
          insertId: 2,
          info: '',
          serverStatus: 2,
          warningStatus: 0,
        },
      });
      const doctorDto = {
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
        especialidades: ['Alergologia', 'Cardiologia clínca'],
      };
      const result = await service.create(doctorDto);

      expect(result).toEqual({
        status: 'not saved',
      });
    });
    it('doctorService.create should call especialidadeRepository.findOne', async () => {
      jest.spyOn(mockDoctorRepository, 'insert').mockReturnValue({
        identifiers: [{ id: 2 }],
        generatedMaps: [{ id: 2, deletedAt: null }],
        raw: {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 2,
          info: '',
          serverStatus: 2,
          warningStatus: 0,
        },
      });
      const doctorDto = {
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
        especialidades: ['Alergologia', 'Cardiologia clínca'],
      };
      await service.create(doctorDto);

      expect(mockEspecialidadeRepository.findOne).toBeCalledTimes(
        doctorDto.especialidades.length,
      );
    });
    it('doctorService.create should call especialidadeRepository.findOne withd proper argument', async () => {
      const doctorDto = {
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
        especialidades: ['Alergologia', 'Cardiologia clínca'],
      };
      await service.create(doctorDto);

      for (const time in doctorDto.especialidades) {
        expect(mockEspecialidadeRepository.findOne).toHaveBeenNthCalledWith(
          parseInt(time) + 1,
          {
            nome: doctorDto.especialidades[parseInt(time)],
          },
        );
      }
    });
    it('doctorService.create should call especDoctorRepository.insert', async () => {
      const doctorDto = {
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
        especialidades: ['Alergologia', 'Cardiologia clínca'],
      };
      await service.create(doctorDto);

      expect(mockEspecDoctorRepository.insert).toBeCalledTimes(
        doctorDto.especialidades.length,
      );
    });
    it('doctorService.create should call especDoctorRepository.insert withd proper argument', async () => {
      const doctorDto = {
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
        especialidades: ['Alergologia', 'Cardiologia clínca'],
      };
      await service.create(doctorDto);
      for (const time in doctorDto.especialidades) {
        expect(mockEspecDoctorRepository.insert).toHaveBeenNthCalledWith(
          parseInt(time) + 1,
          {
            id_doctor: 2,
            id_especialidade: 1,
          },
        );
      }
    });
    it('should return {status: "ok"} if doctorRepository.insert returns a raw property with a affectedRows property greater than 0', async () => {
      const doctorDto = {
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
        especialidades: ['Alergologia', 'Cardiologia clínca'],
      };
      const result = await service.create(doctorDto);
      expect(result).toEqual({
        status: 'ok',
      });
    });
  });

  describe('doctorService.findAll', () => {
    it('doctorService.findAll should call doctorRepository.find', async () => {
      await service.findAll(
        { limit: 5, page: 1 },
        {
          nome: 'Caio Tony',
        },
      );

      expect(mockDoctorRepository.find).toBeCalledTimes(1);
    });
    it('doctorService.findAll should call doctorRepository.find with proper argument', async () => {
      const query = { limit: 5, page: 1, nome: 'Caio Tony' };
      const { limit, page, nome } = query;
      await service.findAll(
        { limit, page },
        {
          nome,
        },
      );

      expect(mockDoctorRepository.find).toBeCalledWith({
        where: { nome },
        take: limit,
        skip: page - 1,
      });
    });
    it('doctorService.findAll should call doctorRepository.find', async () => {
      await service.findAll(
        { limit: 5, page: 1 },
        {
          nome: 'Caio Tony',
        },
      );

      expect(mockDoctorRepository.find).toBeCalledTimes(1);
    });
    it('doctorService.findAll should call doctorRepository.find with proper argument', async () => {
      const query = { limit: 5, page: 1, nome: 'Caio Tony' };
      const { limit, page, nome } = query;
      await service.findAll(
        { limit, page },
        {
          nome,
        },
      );

      expect(mockDoctorRepository.find).toBeCalledWith({
        where: { nome },
        take: limit,
        skip: page - 1,
      });
    });
    it('doctorService.findAll should return a doctor list', async () => {
      const query = { limit: 5, page: 1, nome: 'Caio Tony' };
      const { limit, page, nome } = query;
      const result = await service.findAll(
        { limit, page },
        {
          nome,
        },
      );
      expect(result).toEqual([
        {
          id: 1,
          nome: 'Caio Tony',
          CRM: 12345983,
          telefone_fixo: 92122121,
          telefone_celular: 23332321,
          CEP: 23453,
        },
        {
          id: 2,
          nome: 'Caio Tony',
          CRM: 12345983,
          telefone_fixo: 92122121,
          telefone_celular: 23332321,
          CEP: 23453,
        },
      ]);
    });
  });

  describe('doctorService.listDoctorthroughEspecialidade', () => {
    it('doctorService.listDoctorthroughEspecialidade should call especDoctorRepository.find', async () => {
      await service.listDoctorthroughEspecialidade({ limit: 5, page: 1 }, 1);
      expect(mockEspecDoctorRepository.find).toBeCalledTimes(1);
    });
    it('doctorService.listDoctorthroughEspecialidade should call especDoctorRepository.find with proper argument', async () => {
      const paginateMetadata = {
        limit: 5,
        page: 1,
      };
      await service.listDoctorthroughEspecialidade(paginateMetadata, 1);
      expect(mockEspecDoctorRepository.find).toBeCalledWith({
        where: {
          id_especialidade: 1,
        },
        take: paginateMetadata.limit,
        skip: paginateMetadata.page - 1,
      });
    });
    it('doctorService.listDoctorthroughEspecialidade should call doctorRepository.findOne', async () => {
      const paginateMetadata = {
        limit: 5,
        page: 1,
      };
      await service.listDoctorthroughEspecialidade(paginateMetadata, 1);

      expect(mockDoctorRepository.findOne).toBeCalledTimes(2);
    });
    it('doctorService.listDoctorthroughEspecialidade should call doctorRepository.findOne with proper argument', async () => {
      const especDoctor = [
        {
          id_doctor: 1,
          id_especialidade: 4,
        },
        {
          id_doctor: 2,
          id_especialidade: 3,
        },
      ];
      const paginateMetadata = {
        limit: 5,
        page: 1,
      };
      await service.listDoctorthroughEspecialidade(paginateMetadata, 1);

      for (const iterator in especDoctor) {
        expect(mockDoctorRepository.findOne).toHaveBeenNthCalledWith(
          parseInt(iterator) + 1,
          especDoctor[iterator].id_doctor,
        );
      }
    });
    it('doctorService.listDoctorthroughEspecialidade should return a doctor list with each element containing a especialidades property', async () => {
      const paginateMetadata = {
        limit: 5,
        page: 1,
      };
      const result = await service.listDoctorthroughEspecialidade(
        paginateMetadata,
        1,
      );
      expect(result).toEqual([
        {
          id: 1,
          nome: 'Caio Tony',
          CRM: 12345983,
          telefone_fixo: 92122121,
          telefone_celular: 23332321,
          CEP: 23453,
        },
        {
          id: 2,
          nome: 'Caio Tony',
          CRM: 12345983,
          telefone_fixo: 92122121,
          telefone_celular: 23332321,
          CEP: 23453,
        },
      ]);
    });
  });

  describe('doctorService.findOne', () => {
    it('doctorService.findOne should call doctorRepository.findOne', async () => {
      await service.findOne(1);
      expect(mockDoctorRepository.findOne).toBeCalledTimes(1);
    });
    it('doctorService.findOne should call doctorRepository.findOne with proper argument', async () => {
      await service.findOne(1);
      expect(mockDoctorRepository.findOne).toHaveBeenCalledWith(1);
    });
    it('doctorService.findOne should call especDoctorRepository.find', async () => {
      await service.findOne(1);
      expect(mockEspecDoctorRepository.find).toHaveBeenCalledTimes(1);
    });
    it('should call especDoctorRepository.find width proper argument', async () => {
      await service.findOne(1);
      expect(mockEspecDoctorRepository.find).toHaveBeenCalledWith({
        id_doctor: 1,
      });
    });
    it('should return a empty object if doctorRepository.findOne returns undefined', async () => {
      jest.spyOn(mockDoctorRepository, 'findOne').mockReturnValue(undefined);
      const result = await service.findOne(1);
      expect(result).toEqual({});
    });
    it('doctorService.findOne should call especialidadeRepository.findOne', async () => {
      jest.spyOn(mockDoctorRepository, 'findOne').mockReturnValue({
        id: 1,
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
      });
      await service.findOne(1);
      expect(mockEspecialidadeRepository.findOne).toHaveBeenCalledTimes(2);
    });
    it('doctorService.findOne should call especialidadeRepository.findOne with proper arguments', async () => {
      const especDoctorList = [
        {
          id_doctor: 1,
          id_especialidade: 4,
        },
        {
          id_doctor: 2,
          id_especialidade: 3,
        },
      ];
      jest.spyOn(mockDoctorRepository, 'findOne').mockReturnValue({
        id: 1,
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
      });
      await service.findOne(1);
      for (const iterator in especDoctorList) {
        expect(mockEspecialidadeRepository.findOne).toHaveBeenNthCalledWith(
          parseInt(iterator) + 1,
          especDoctorList[iterator].id_especialidade,
        );
      }
    });
    it('doctorService.findOne should return a doctor object', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual({
        id: 1,
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
        especialidades: ['alergologia', 'alergologia'],
      });
    });
  });

  describe('doctorService.update', () => {
    it('doctorService.update should call doctorRepository.update', async () => {
      await service.update(1, {
        nome: 'Caio',
      });

      expect(mockDoctorRepository.update).toBeCalledTimes(1);
    });
    it('doctorService.update should call doctorRepository.update with proper argument', async () => {
      await service.update(1, {
        nome: 'Caio',
      });

      expect(mockDoctorRepository.update).toBeCalledWith(1, {
        nome: 'Caio',
      });
    });
    it('doctorService.update should return a {status: "not updated"} if doctorRepository.update returns a object with affected property less or equal than 0 ', async () => {
      jest.spyOn(mockDoctorRepository, 'update').mockReturnValue({
        raw: 'something',
        affected: 1,
        generatedMaps: [],
      });
      const result = await service.update(1, {
        nome: 'Caio',
      });

      expect(result).toEqual({
        status: 'ok',
      });
    });
    it('doctorService.update should return a {status: "ok"} if doctorRepository.update returns a object with affected property greater than 0 ', async () => {
      jest.spyOn(mockDoctorRepository, 'update').mockReturnValue({
        raw: 'something',
        affected: 0,
        generatedMaps: [],
      });
      const result = await service.update(1, {
        nome: 'Caio',
      });

      expect(result).toEqual({
        status: 'not updated',
      });
    });
  });

  describe('doctorService.remove', () => {
    it('doctorService.remove should call doctorRepository.findOne', async () => {
      await service.remove(1);

      expect(mockDoctorRepository.findOne).toBeCalledTimes(1);
    });
    it('doctorService.remove should call doctorRepository.findOne with proper argument', async () => {
      await service.remove(1);

      expect(mockDoctorRepository.findOne).toHaveBeenCalledWith(1);
    });
    it('doctorService.remove should return { status: "record doesn\'t exists" } if doctorRepository.findOne returns undefined ', async () => {
      jest.spyOn(mockDoctorRepository, 'findOne').mockReturnValue(undefined);
      const result = await service.remove(1);
      expect(result).toEqual({ status: "record doesn't exists" });
    });
    it('doctorService.remove should call doctorRepository.softDelete', async () => {
      jest.spyOn(mockDoctorRepository, 'findOne').mockReturnValue({
        id: 1,
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
      });
      await service.remove(1);

      expect(mockDoctorRepository.softDelete).toHaveBeenCalledTimes(1);
    });
    it('doctorService.remove should call doctorRepository.softDelete with proper argument', async () => {
      jest.spyOn(mockDoctorRepository, 'findOne').mockReturnValue({
        id: 1,
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
      });
      await service.remove(1);

      expect(mockDoctorRepository.softDelete).toHaveBeenCalledWith(1);
    });
    it('doctorService.remove should return a {status: "ok"} if doctorRepository.softDelete returns a object with affected property greater than 0 ', async () => {
      jest.spyOn(mockDoctorRepository, 'softDelete').mockReturnValue({
        raw: 'something',
        affected: 1,
        generatedMaps: [],
      });
      const result = await service.remove(1);

      expect(result).toEqual({
        status: 'ok',
      });
    });
    it('doctorService.remove should return a {status: "not removed"} if doctorRepository.softDelete returns a object with affected property less than or equal 0 ', async () => {
      jest.spyOn(mockDoctorRepository, 'softDelete').mockReturnValue({
        raw: 'something',
        affected: 0,
        generatedMaps: [],
      });
      const result = await service.remove(1);

      expect(result).toEqual({
        status: 'not removed',
      });
    });
  });
});
