import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { EggInventoryService } from './egg-inventory.service';

import { RegisterEggProductionDto } from './dto/register-egg-production.dto';
import { RegisterDamagedEggsDto } from './dto/register-damaged-eggs.dto';

@Controller('egg-inventory')
export class EggInventoryController {

  constructor(private readonly service: EggInventoryService) {}

  @Post('production')
  registerProduction(@Body() dto: RegisterEggProductionDto) {
    return this.service.registerProduction(dto);
  }

  @Post('damaged')
  registerDamaged(@Body() dto: RegisterDamagedEggsDto) {
    return this.service.registerDamaged(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

}