import { Injectable } from '@nestjs/common';

@Injectable()
export class EggInventoryService {

  registerProduction(dto) {
    return "Register egg production";
  }

  registerDamaged(dto) {
    return "Register damaged eggs";
  }

  findAll() {
    return "Get egg inventory";
  }

  findOne(id: string) {
    return `Get egg inventory ${id}`;
  }

}