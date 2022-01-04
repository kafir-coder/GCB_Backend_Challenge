import { Module } from '@nestjs/common';
import { EspecDoctorsService } from './espec-doctors.service';
import { EspecDoctorsController } from './espec-doctors.controller';

@Module({
  controllers: [EspecDoctorsController],
  providers: [EspecDoctorsService]
})
export class EspecDoctorsModule {}
