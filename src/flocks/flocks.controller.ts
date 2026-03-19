import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';

import { FlocksService } from './flocks.service';
import { CreateFlockDto } from './dto/create-flock.dto';
import { UpdateFlockDto } from './dto/update-flock.dto';
import { AssignFlockDto } from './dto/assign-flock.dto';
import { RegisterDeadBirdsDto } from './dto/register-dead-birds.dto';
import { FinishFlockDto } from './dto/finish-flock.dto';

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
    return this.flocksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlockDto: UpdateFlockDto,
  ) {
    return this.flocksService.update(id, updateFlockDto);
  }

  @Post('assign')
  assignFlock(@Body() assignDto: AssignFlockDto) {
    return this.flocksService.assignFlock(assignDto);
  }

  @Post('dead-birds')
  registerDeadBirds(@Body() dto: RegisterDeadBirdsDto) {
    return this.flocksService.registerDeadBirds(dto);
  }

  @Post('finish')
  finishFlock(@Body() dto: FinishFlockDto) {
    return this.flocksService.finishFlock(dto);
  }

}