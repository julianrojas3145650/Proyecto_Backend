import { Module } from '@nestjs/common';
import { EggTypesService } from './egg-types.service';
import { EggTypesController } from './egg-types.controller';

@Module({
  controllers: [EggTypesController],
  providers: [EggTypesService],
})
export class EggTypesModule {}
