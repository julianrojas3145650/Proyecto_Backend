import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

import { EggInventoryService } from './egg-inventory.service';
import { RegisterEggProductionDto } from './dto/register-egg-production.dto';
import { RegisterDamagedEggsDto } from './dto/register-damaged-eggs.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('egg-inventory')
export class EggInventoryController {

  constructor(private readonly service: EggInventoryService) {}

  @Post('produccion')
  registerProduction(@Body() dto: RegisterEggProductionDto) {
    return this.service.registerProduction(dto);
  }

  @Post('danados')
  registerDamaged(@Body() dto: RegisterDamagedEggsDto) {
    return this.service.registerDamaged(dto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.service.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}