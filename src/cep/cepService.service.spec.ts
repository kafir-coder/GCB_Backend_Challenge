import { Test, TestingModule } from '@nestjs/testing';
import { CepService } from './cepService.service';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('DoctorsService', () => {
  let service: CepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CepService],
    }).compile();

    service = module.get<CepService>(CepService);

    jest.clearAllMocks();
  });

  it('doctorService should be defined', () => {
    expect(service).toBeDefined();
  });
});
