import { Injectable } from '@nestjs/common';
import { CreateEggInventoryDto } from './dto/create-egg-inventory.dto';
import { UpdateEggInventoryDto } from './dto/update-egg-inventory.dto';

@Injectable()
export class EggInventoryService {
  create(createEggInventoryDto: CreateEggInventoryDto) {
    return 'This action adds a new eggInventory';
  }

  findAll() {
    return `This action returns all eggInventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eggInventory`;
  }

  update(id: number, updateEggInventoryDto: UpdateEggInventoryDto) {
    return `This action updates a #${id} eggInventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} eggInventory`;
  }
}
