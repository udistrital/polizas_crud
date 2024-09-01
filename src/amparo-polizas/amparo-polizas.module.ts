import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmparoPolizasService } from './amparo-polizas.service';
import { AmparoPolizasController } from './amparo-polizas.controller';
import { AmparoPoliza } from '../entities/amparo-poliza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AmparoPoliza])],
  providers: [AmparoPolizasService],
  controllers: [AmparoPolizasController],
})
export class AmparoPolizasModule {}
