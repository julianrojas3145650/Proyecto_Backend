import { Module } from '@nestjs/common';
import { FlocksService } from './flocks.service';
import { FlocksController } from './flocks.controller';

@Module({
  controllers: [FlocksController],
  providers: [FlocksService],
})
export class FlocksModule {}
