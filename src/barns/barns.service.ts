import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barn } from './entities/barn.entity';
import { CreateBarnDto } from './dto/create-barn.dto';
import { UpdateBarnDto } from './dto/update-barn.dto';

@Injectable()
export class BarnsService {

  constructor(
    @InjectRepository(Barn)
    private readonly barnRepository: Repository<Barn>,
  ) {}

  async create(createBarnDto: CreateBarnDto) {

    const barn = this.barnRepository.create(createBarnDto);

    return await this.barnRepository.save(barn);

  }

  async findAll() {
    return await this.barnRepository.find({
      relations: ['flockLocations', 'assignmentHistory']
    });
  }

  async findOne(id_galpon: string) {

    const barn = await this.barnRepository.findOne({
      where: { id_galpon },
      relations: ['flockLocations', 'assignmentHistory']
    });

    if (!barn) {
      throw new NotFoundException(`Barn with id ${id_galpon} not found`);
    }

    return barn;

  }

  async update(id_galpon: string, updateBarnDto: UpdateBarnDto) {

    const barn = await this.findOne(id_galpon);

    Object.assign(barn, updateBarnDto);

    return await this.barnRepository.save(barn);

  }

  async remove(id_galpon: string) {

    const barn = await this.findOne(id_galpon);

    await this.barnRepository.remove(barn);

    return { message: 'Barn deleted successfully' };

  }

}