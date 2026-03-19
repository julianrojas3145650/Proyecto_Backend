import { Injectable } from '@nestjs/common';
import { CreateSupplyCategoryDto } from './dto/create-supply-category.dto';
import { UpdateSupplyCategoryDto } from './dto/update-supply-category.dto';

@Injectable()
export class SupplyCategoriesService {
  create(createSupplyCategoryDto: CreateSupplyCategoryDto) {
    return 'This action adds a new supplyCategory';
  }

  findAll() {
    return `This action returns all supplyCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplyCategory`;
  }

  update(id: number, updateSupplyCategoryDto: UpdateSupplyCategoryDto) {
    return `This action updates a #${id} supplyCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplyCategory`;
  }
}
