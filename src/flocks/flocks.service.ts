import { Injectable } from '@nestjs/common';
import { CreateFlockDto } from './dto/create-flock.dto';
import { UpdateFlockDto } from './dto/update-flock.dto';

@Injectable()
export class FlocksService {
  create(createFlockDto: CreateFlockDto) {
    return 'This action adds a new flock';
  }

  findAll() {
    return `This action returns all flocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flock`;
  }

  update(id: number, updateFlockDto: UpdateFlockDto) {
    return `This action updates a #${id} flock`;
  }

  remove(id: number) {
    return `This action removes a #${id} flock`;
  }
}
