import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolizasService } from './polizas.service';
import { PolizasController } from './polizas.controller';
import { Poliza } from '../entities/poliza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poliza])],
  providers: [PolizasService],
  controllers: [PolizasController],
})
export class PolizasModule {}
