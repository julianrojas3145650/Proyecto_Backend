import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Controller('breeds')
export class BreedsController {

  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  create(@Body() dto: CreateBreedDto) {
    return this.breedsService.create(dto);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBreedDto) {
    return this.breedsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedsService.remove(id);
  }
}