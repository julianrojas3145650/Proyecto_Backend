import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedingsService } from './feedings.service';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';

@Controller('feedings')
export class FeedingsController {
  constructor(private readonly feedingsService: FeedingsService) {}

  @Post()
  create(@Body() createFeedingDto: CreateFeedingDto) {
    return this.feedingsService.create(createFeedingDto);
  }

  @Get()
  findAll() {
    return this.feedingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedingDto: UpdateFeedingDto) {
    return this.feedingsService.update(+id, updateFeedingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedingsService.remove(+id);
  }
}
