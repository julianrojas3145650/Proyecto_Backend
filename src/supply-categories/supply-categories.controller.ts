import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SupplyCategoriesService } from './supply-categories.service';
import { CreateSupplyCategoryDto } from './dto/create-supply-category.dto';
import { UpdateSupplyCategoryDto } from './dto/update-supply-category.dto';

@Controller('supply-categories')
export class SupplyCategoriesController {
  constructor(private readonly supplyCategoriesService: SupplyCategoriesService) {}

  @Post()
  create(@Body() dto: CreateSupplyCategoryDto) {
    return this.supplyCategoriesService.create(dto);
  }

  @Get()
  findAll() {
    return this.supplyCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.supplyCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateSupplyCategoryDto,
  ) {
    return this.supplyCategoriesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.supplyCategoriesService.remove(id);
  }
}