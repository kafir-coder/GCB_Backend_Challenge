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
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT as unknown as number,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
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
