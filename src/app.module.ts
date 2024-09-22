import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PolizasModule } from './polizas/polizas.module';
import { AmparoPolizasModule } from './amparo-polizas/amparo-polizas.module';
import { Poliza } from './entities/poliza.entity';
import { AmparoPoliza } from './entities/amparo-poliza.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POLIZAS_CRUD_HOST'),
        port: configService.get('POLIZAS_CRUD_PORT'),
        username: configService.get('POLIZAS_CRUD_USERNAME'),
        password: configService.get('POLIZAS_CRUD_PASS'),
        database: configService.get('POLIZAS_CRUD_DB'),
        entities: [Poliza, AmparoPoliza],
        synchronize: configService.get('DEVELOPER_MODE'), //Solo para desarrollo, en producción se debe desactivar
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    PolizasModule,
    AmparoPolizasModule,
  ],
})
export class AppModule {}
