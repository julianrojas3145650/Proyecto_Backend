import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyHistoryService } from './supply-history.service';
import { SupplyHistoryController } from './supply-history.controller';
import { SupplyHistory } from './entities/supply-history.entity';
import { Insumo } from '../supplies/entities/supply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyHistory, Insumo])],
  controllers: [SupplyHistoryController],
  providers: [SupplyHistoryService],
  exports: [SupplyHistoryService],
})
export class SupplyHistoryModule {}