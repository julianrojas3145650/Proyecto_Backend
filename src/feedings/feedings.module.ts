import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Feeding } from './entities/feeding.entity';
import { FeedingService } from './feedings.service';
import { FeedingController } from './feedings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Feeding])],
  controllers: [FeedingController],
  providers: [FeedingService],
})
export class FeedingModule {}