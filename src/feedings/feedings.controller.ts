import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { FeedingService } from './feedings.service';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';

@Controller('feeding')
export class FeedingController {

  constructor(private readonly service: FeedingService) {}

  @Post()
  create(@Body() dto: CreateFeedingDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFeedingDto
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

}