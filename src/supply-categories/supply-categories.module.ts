import { Module } from '@nestjs/common';
import { SupplyCategoriesService } from './supply-categories.service';
import { SupplyCategoriesController } from './supply-categories.controller';

@Module({
  controllers: [SupplyCategoriesController],
  providers: [SupplyCategoriesService],
})
export class SupplyCategoriesModule {}
