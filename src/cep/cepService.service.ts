import axios from 'axios';
import { Injectable } from '@nestjs/common';

type cepResult = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};
@Injectable()
export class CepService {
  async getAddress(): Promise<string> {
    try {
      const request = await axios.get(
        'https://viacep.com.br/ws/01001000/json/',
      );
      const { localidade, bairro, logradouro } = request.data as cepResult;
      return `${localidade}, ${bairro}, ${logradouro}`;
    } catch (error) {
      return null;
    }
  }
}
