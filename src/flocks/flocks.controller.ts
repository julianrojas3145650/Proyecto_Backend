import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlocksService } from './flocks.service';
import { CreateFlockDto } from './dto/create-flock.dto';
import { UpdateFlockDto } from './dto/update-flock.dto';

@Controller('flocks')
export class FlocksController {
  constructor(private readonly flocksService: FlocksService) {}

  @Post()
  create(@Body() createFlockDto: CreateFlockDto) {
    return this.flocksService.create(createFlockDto);
  }

  @Get()
  findAll() {
    return this.flocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlockDto: UpdateFlockDto) {
    return this.flocksService.update(+id, updateFlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flocksService.remove(+id);
  }
}
