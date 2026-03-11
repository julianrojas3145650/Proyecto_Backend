import { Injectable } from '@nestjs/common';
import { CreateEggTypeDto } from './dto/create-egg-type.dto';
import { UpdateEggTypeDto } from './dto/update-egg-type.dto';

@Injectable()
export class EggTypesService {
  create(createEggTypeDto: CreateEggTypeDto) {
    return 'This action adds a new eggType';
  }

  findAll() {
    return `This action returns all eggTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eggType`;
  }

  update(id: number, updateEggTypeDto: UpdateEggTypeDto) {
    return `This action updates a #${id} eggType`;
  }

  remove(id: number) {
    return `This action removes a #${id} eggType`;
  }
}
