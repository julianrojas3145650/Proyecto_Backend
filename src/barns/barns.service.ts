import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Barn } from './entities/barn.entity';
import { CreateBarnDto } from './dto/create-barn.dto';
import { UpdateBarnDto } from './dto/update-barn.dto';

@Injectable()
export class BarnsService {

  private readonly logger = new Logger(BarnsService.name);

  constructor(
    @InjectRepository(Barn)
    private readonly barnRepository: Repository<Barn>,
  ) {}

  async create(dto: CreateBarnDto) {

    const barn = this.barnRepository.create(dto);
    const saved = await this.barnRepository.save(barn);

    this.logger.log(`Galpón creado: ${saved.codigo}`);

    return {
      message: 'Galpón creado correctamente',
      data: saved
    };
  }

  async findAll() {

    const data = await this.barnRepository.find({
      relations: ['ubicacion_lote', 'asignacion_historial']
    });

    return {
      message: 'Lista de galpones obtenida',
      data
    };
  }

  async findOne(id_galpon: string) {

    const barn = await this.barnRepository.findOne({
      where: { id_galpon },
      relations: ['flockLocations', 'assignmentHistory']
    });

    if (!barn) {
      throw new NotFoundException(`Galpón con id ${id_galpon} no encontrado`);
    }

    return {
      message: 'Galpón encontrado',
      data: barn
    };
  }

  async update(id_galpon: string, dto: UpdateBarnDto) {

    const barnResult = await this.barnRepository.findOneBy({ id_galpon });

    if (!barnResult) {
      throw new NotFoundException(`Galpón con id ${id_galpon} no encontrado`);
    }

    this.barnRepository.merge(barnResult, dto);

    const updated = await this.barnRepository.save(barnResult);

    this.logger.log(`Galpón actualizado: ${id_galpon}`);

    return {
      message: 'Galpón actualizado correctamente',
      data: updated
    };
  }

  async remove(id_galpon: string) {

    const barnResult = await this.barnRepository.findOneBy({ id_galpon });

    if (!barnResult) {
      throw new NotFoundException(`Galpón con id ${id_galpon} no encontrado`);
    }

    await this.barnRepository.remove(barnResult);

    this.logger.warn(`Galpón eliminado: ${id_galpon}`);

    return {
      message: 'Galpón eliminado correctamente'
    };
  }
}