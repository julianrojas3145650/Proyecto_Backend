import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BarnsService } from './barns.service';
import { CreateBarnDto } from './dto/create-barn.dto';
import { UpdateBarnDto } from './dto/update-barn.dto';

@Controller('barns')
export class BarnsController {
  constructor(private readonly barnsService: BarnsService) {}

  @Post()
  create(@Body() dto: CreateBarnDto) {
    return this.barnsService.create(dto);
  }

  @Get()
  findAll() {
    return this.barnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barnsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBarnDto) {
    return this.barnsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barnsService.remove(id);
  }
}
