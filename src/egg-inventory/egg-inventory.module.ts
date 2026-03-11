import { Module } from '@nestjs/common';
import { EggInventoryService } from './egg-inventory.service';
import { EggInventoryController } from './egg-inventory.controller';

@Module({
  controllers: [EggInventoryController],
  providers: [EggInventoryService],
})
export class EggInventoryModule {}
