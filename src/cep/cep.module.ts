import { Module } from '@nestjs/common';
import { CepService } from './cepService.service';

@Module({
  providers: [CepService],
})
export class EspecialidadesModule {}
