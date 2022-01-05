import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './doctors/doctors.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { EspecDoctorsModule } from './espec-doctors/espec-doctors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysqldb',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'GCB_Challenge',
      entities: ['./**/*.entity.js'],
      synchronize: true,
      migrationsTableName: 'custom_migration_table',
      migrations: ['./migration/*.js'],
      cli: {
        migrationsDir: 'migration',
      },
    }),
    DoctorsModule,
    EspecialidadesModule,
    EspecDoctorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
