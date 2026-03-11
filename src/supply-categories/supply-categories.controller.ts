import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplyCategoriesService } from './supply-categories.service';
import { CreateSupplyCategoryDto } from './dto/create-supply-category.dto';
import { UpdateSupplyCategoryDto } from './dto/update-supply-category.dto';

@Controller('supply-categories')
export class SupplyCategoriesController {
  constructor(private readonly supplyCategoriesService: SupplyCategoriesService) {}

  @Post()
  create(@Body() createSupplyCategoryDto: CreateSupplyCategoryDto) {
    return this.supplyCategoriesService.create(createSupplyCategoryDto);
  }

  @Get()
  findAll() {
    return this.supplyCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplyCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplyCategoryDto: UpdateSupplyCategoryDto) {
    return this.supplyCategoriesService.update(+id, updateSupplyCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplyCategoriesService.remove(+id);
  }
}
