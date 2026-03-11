import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EggInventoryService } from './egg-inventory.service';
import { CreateEggInventoryDto } from './dto/create-egg-inventory.dto';
import { UpdateEggInventoryDto } from './dto/update-egg-inventory.dto';

@Controller('egg-inventory')
export class EggInventoryController {
  constructor(private readonly eggInventoryService: EggInventoryService) {}

  @Post()
  create(@Body() createEggInventoryDto: CreateEggInventoryDto) {
    return this.eggInventoryService.create(createEggInventoryDto);
  }

  @Get()
  findAll() {
    return this.eggInventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eggInventoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEggInventoryDto: UpdateEggInventoryDto) {
    return this.eggInventoryService.update(+id, updateEggInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eggInventoryService.remove(+id);
  }
}
