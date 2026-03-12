import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Feeding } from './entities/feeding.entity';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';

@Injectable()
export class FeedingService {

  constructor(
    @InjectRepository(Feeding)
    private readonly feedingRepository: Repository<Feeding>,
  ) {}

  async create(dto: CreateFeedingDto) {

    const feeding = this.feedingRepository.create({
      userId: dto.userId,
      supplyId: dto.supplyId,
      quantity: dto.quantity
    });

    return await this.feedingRepository.save(feeding);

  }

  findAll() {
    return this.feedingRepository.find();
  }

  async findOne(id: string) {

    const feeding = await this.feedingRepository.findOneBy({ id });

    if (!feeding) {
      throw new NotFoundException('Feeding not found');
    }

    return feeding;

  }

  async update(id: string, dto: UpdateFeedingDto) {

    const feeding = await this.findOne(id);

    Object.assign(feeding, dto);

    return this.feedingRepository.save(feeding);

  }

  async remove(id: string) {

    const feeding = await this.findOne(id);

    return this.feedingRepository.remove(feeding);

  }

}