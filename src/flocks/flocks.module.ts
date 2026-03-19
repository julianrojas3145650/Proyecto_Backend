import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlocksService } from './flocks.service';
import { FlocksController } from './flocks.controller';
import { Flock } from './entities/flock.entity';
import { FlockLocation } from './entities/flock-location.entity';
import { FlockStatus } from './entities/flock-status.entity';
import { FlockAssignmentHistory } from './entities/flock-assignment-history.entity';
import { FinishedFlock } from './entities/finished-flock.entity';
import { DeadBird } from './entities/dead-bird.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Flock,
      FlockLocation,
      FlockStatus,
      FlockAssignmentHistory,
      FinishedFlock,
      DeadBird
    ])
  ],
  controllers: [FlocksController],
  providers: [FlocksService],
})
export class FlocksModule {}