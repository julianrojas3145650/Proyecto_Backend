import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Breed } from './entities/breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto) {

    const breed = this.breedRepository.create(createBreedDto);

    return await this.breedRepository.save(breed);

  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: string) {

    const breed = await this.breedRepository.findOneBy({ id });

    if (!breed) {
      throw new NotFoundException(`Breed with id ${id} not found`);
    }

    return breed;
  }

  async update(id: string, updateBreedDto: UpdateBreedDto) {

    const breed = await this.findOne(id);

    Object.assign(breed, updateBreedDto);

    return await this.breedRepository.save(breed);

  }

  async remove(id: string) {

    const breed = await this.findOne(id);

    await this.breedRepository.remove(breed);

    return { message: 'Breed deleted successfully' };

  }

}