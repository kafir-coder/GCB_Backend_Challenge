import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CepService } from '../cep/cepService.service';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

describe('DoctorsController', () => {
  let controller: DoctorsController;

  const mockDoctorService = {
    create: jest.fn((dto) => {
      return {
        status: 'ok',
      };
    }),
    findAll: jest.fn((paginateMetadata, filters) => {
      return [
        {
          nome: 'Caio Tony',
          CRM: 12345983,
          telefone_fixo: 92122121,
          telefone_celular: 23332321,
          CEP: 23453,
          especialidades: ['Alergologia', 'Cardiologia clínca'],
        },
        {
          nome: 'Caio Tony',
          CRM: 12345983,
          telefone_fixo: 92122121,
          telefone_celular: 23332321,
          CEP: 23453,
          especialidades: ['Alergologia', 'Cardiologia clínca'],
        },
      ];
    }),
    listDoctorthroughEspecialidade: jest.fn((paginateMetadata, espec_id) => {
      return [
        {
          nome: 'Caio Tony',
          CRM: 12345983,
          telefone_fixo: 92122121,
          telefone_celular: 23332321,
          CEP: 23453,
          especialidades: ['Alergologia', 'Cardiologia clínca'],
        },
        {
          nome: 'Caio Tony',
          CRM: 12345983,
          telefone_fixo: 92122121,
          telefone_celular: 23332321,
          CEP: 23453,
          especialidades: ['Alergologia', 'Cardiologia clínca'],
        },
      ];
    }),
    findOne: jest.fn((id) => {
      return {
        nome: 'Caio Tony',
        CRM: 12345983,
        telefone_fixo: 92122121,
        telefone_celular: 23332321,
        CEP: 23453,
        especialidades: ['Alergologia', 'Cardiologia clínca'],
      };
    }),
    update: jest.fn((id, updateDTO) => {
      raw: 1;
      affected: 1;
      generatedMaps: [];
    }),
    remove: jest.fn((id) => ({
      generatedMaps: [],
      raw: [],
      affected: 1,
    })),
  };
  const mockCepService = {
    getAddress: jest.fn(() => {
      return 'lougradouro, ibm';
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [DoctorsService, CepService],
    })
      .overrideProvider(CepService)
      .useValue(mockCepService)
      .overrideProvider(DoctorsService)
      .useValue(mockDoctorService)
      .compile();

    controller = module.get<DoctorsController>(DoctorsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call cepService.getAdress', async () => {
    const doctor = {
      nome: 'Caio Tony',
      CRM: 12345983,
      telefone_fixo: 92122121,
      telefone_celular: 23332321,
      CEP: 23453,
      especialidades: ['Alergologia', 'Cardiologia clínca'],
    };
    await controller.create(doctor);

    expect(mockCepService.getAddress).toBeCalledTimes(1);
  });
  it('should call doctorService.create', async () => {
    const doctor = {
      nome: 'Caio Tony',
      CRM: 12345983,
      telefone_fixo: 92122121,
      telefone_celular: 23332321,
      CEP: 23453,
      especialidades: ['Alergologia', 'Cardiologia clínca'],
    };
    await controller.create(doctor);

    expect(mockDoctorService.create).toBeCalledTimes(1);
  });
  it('should call doctorService.create with proper argument', async () => {
    const doctor = {
      nome: 'Caio Tony',
      CRM: 12345983,
      telefone_fixo: 92122121,
      telefone_celular: 23332321,
      CEP: 23453,
      especialidades: ['Alergologia', 'Cardiologia clínca'],
    };
    await controller.create(doctor);

    expect(mockDoctorService.create).toHaveBeenCalledWith(
      Object.assign(doctor, { endereco: 'lougradouro, ibm' }),
    );
  });
  it('doctorController.create should return server error if cepService.getAdress returns null', async () => {
    jest.spyOn(mockCepService, 'getAddress').mockReturnValueOnce(null);
    const doctor = {
      nome: 'Caio Tony',
      CRM: 12345983,
      telefone_fixo: 92122121,
      telefone_celular: 23332321,
      CEP: 23453,
      especialidades: ['Alergologia', 'Cardiologia clínca'],
    };

    try {
      await controller.create(doctor);
    } catch (error) {
      expect(error).toEqual(new HttpException('server error', 500));
    }
  });
  it('doctorController.create should return server error if doctorService.create returns {status:"not saved"} object ', async () => {
    jest.spyOn(mockDoctorService, 'create').mockReturnValueOnce({
      status: 'not saved',
    });
    const doctor = {
      nome: 'Caio Tony',
      CRM: 12345983,
      telefone_fixo: 92122121,
      telefone_celular: 23332321,
      CEP: 23453,
      especialidades: ['Alergologia', 'Cardiologia clínca'],
    };
    try {
      await controller.create(doctor);
    } catch (error) {
      expect(error).toEqual(new HttpException('server error', 500));
    }
  });
  it('doctorController.create should return {status: "ok"} if doctorService.create returns {status:"ok"} object', async () => {
    const doctor = {
      nome: 'Caio Tony',
      CRM: 12345983,
      telefone_fixo: 92122121,
      telefone_celular: 23332321,
      CEP: 23453,
      especialidades: ['Alergologia', 'Cardiologia clínca'],
    };
    const result = await controller.create(doctor);
    expect(result).toEqual({
      status: 'ok',
    });
  });

  it('should call doctorService.findAll', async () => {
    const query = {
      limit: 5,
      page: 1,
      nome: 'Caio Tony',
    };

    await controller.findAll(query);
    expect(mockDoctorService.findAll).toHaveBeenCalledTimes(1);
  });
  it('should call doctorService.findAll with proper argument', async () => {
    const query = {
      limit: 5,
      page: 1,
      nome: 'Caio Tony',
    };

    const { limit, page, ...rest } = query;
    await controller.findAll(query);
    expect(mockDoctorService.findAll).toHaveBeenCalledWith(
      { limit, page },
      rest,
    );
  });

  it('should call doctorService.listDoctorthroughEspecialidade', async () => {
    const query = {
      limit: 5,
      page: 1,
    };

    await controller.findByEspecialidade(1, query);
    expect(
      mockDoctorService.listDoctorthroughEspecialidade,
    ).toHaveBeenCalledTimes(1);
  });
  it('should call doctorService.findByEspecialidade with proper argument', async () => {
    const query = {
      limit: 5,
      page: 1,
    };

    await controller.findByEspecialidade({ espec_id: 1 }, query);
    expect(
      mockDoctorService.listDoctorthroughEspecialidade,
    ).toHaveBeenCalledWith(query, 1);
  });

  it('should call doctorService.findOne', async () => {
    await controller.findOne('1');
    expect(mockDoctorService.findOne).toHaveBeenCalledTimes(1);
  });
  it('should call doctorService.findByEspecialidade with proper argument', async () => {
    await controller.findOne('1');
    expect(mockDoctorService.findOne).toHaveBeenCalledWith(1);
  });

  it('should call doctorService.update', async () => {
    const doctor = {
      nome: 'Caio Tony',
      CRM: 12345983,
      telefone_fixo: 92122121,
      telefone_celular: 23332321,
      CEP: 23453,
      especialidades: ['Alergologia', 'Cardiologia clínca'],
    };
    await controller.update('1', doctor);
    expect(mockDoctorService.update).toHaveBeenCalledTimes(1);
  });
  it('should call doctorService.update with proper argument', async () => {
    const doctor = {
      nome: 'Caio Tony',
      CRM: 12345983,
      telefone_fixo: 92122121,
      telefone_celular: 23332321,
      CEP: 23453,
      especialidades: ['Alergologia', 'Cardiologia clínca'],
    };
    await controller.update('1', doctor);
    expect(mockDoctorService.update).toHaveBeenLastCalledWith(1, doctor);
  });

  it('should call doctorService.update', async () => {
    await controller.remove('1');
    expect(mockDoctorService.remove).toHaveBeenCalledTimes(1);
  });
  it('should call doctorService.remove with proper argument', async () => {
    await controller.remove('1');
    expect(mockDoctorService.remove).toHaveBeenLastCalledWith(1);
  });
});
