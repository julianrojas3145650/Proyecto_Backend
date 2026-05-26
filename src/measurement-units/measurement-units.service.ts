import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasurementUnit } from './entities/measurement-unit.entity';
import { CreateMeasurementUnitDto } from './dto/create-measurement-unit.dto';
import { UpdateMeasurementUnitDto } from './dto/update-measurement-unit.dto';

@Injectable()
export class MeasurementUnitsService {
  constructor(
    @InjectRepository(MeasurementUnit)
    private readonly measurementUnitRepository: Repository<MeasurementUnit>,
  ) {}

  async create(dto: CreateMeasurementUnitDto): Promise<MeasurementUnit> {
    const existing = await this.measurementUnitRepository.findOne({
      where: { nombre: dto.nombre },
    });
    if (existing) {
      throw new ConflictException(
        `La unidad de medida "${dto.nombre}" ya existe`,
      );
    }
    const unit = this.measurementUnitRepository.create(dto);
    return this.measurementUnitRepository.save(unit);
  }

  async findAll(): Promise<MeasurementUnit[]> {
    return this.measurementUnitRepository.find({
      relations: ['insumos'],
    });
  }

  async findOne(id: string): Promise<MeasurementUnit> {
    const unit = await this.measurementUnitRepository.findOne({
      where: { id_unidad_medida: id },
      relations: ['insumos'],
    });
    if (!unit) {
      throw new NotFoundException(
        `Unidad de medida con ID ${id} no encontrada`,
      );
    }
    return unit;
  }

  async update(
    id: string,
    dto: UpdateMeasurementUnitDto,
  ): Promise<MeasurementUnit> {
    const unit = await this.findOne(id);
    Object.assign(unit, dto);
    return this.measurementUnitRepository.save(unit);
  }

  async remove(id: string): Promise<{ message: string }> {
    const unit = await this.findOne(id);
    await this.measurementUnitRepository.remove(unit);
    return { message: `Unidad de medida con ID ${id} eliminada correctamente` };
  }
}
