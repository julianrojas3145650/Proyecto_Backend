import { Injectable } from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';

@Injectable()
export class FeedingsService {
  create(createFeedingDto: CreateFeedingDto) {
    return 'This action adds a new feeding';
  }

  findAll() {
    return `This action returns all feedings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feeding`;
  }

  update(id: number, updateFeedingDto: UpdateFeedingDto) {
    return `This action updates a #${id} feeding`;
  }

  remove(id: number) {
    return `This action removes a #${id} feeding`;
  }
}
