import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplyAction } from './entities/supply-action.entity';
import { CreateSupplyActionDto } from './dto/create-supply-action.dto';
import { UpdateSupplyActionDto } from './dto/update-supply-action.dto';

@Injectable()
export class SupplyActionsService {
  constructor(
    @InjectRepository(SupplyAction)
    private readonly supplyActionRepository: Repository<SupplyAction>,
  ) {}

  async create(dto: CreateSupplyActionDto): Promise<SupplyAction> {
    const existing = await this.supplyActionRepository.findOne({
      where: { nombre_accion: dto.nombre_accion },
    });
    if (existing) {
      throw new ConflictException(
        `La acción "${dto.nombre_accion}" ya existe`,
      );
    }
    const action = this.supplyActionRepository.create(dto);
    return this.supplyActionRepository.save(action);
  }

  async findAll(): Promise<SupplyAction[]> {
    return this.supplyActionRepository.find();
  }

  async findOne(id: number): Promise<SupplyAction> {
    const action = await this.supplyActionRepository.findOne({
      where: { id_historial_accion: id },
    });
    if (!action) {
      throw new NotFoundException(`Acción con ID ${id} no encontrada`);
    }
    return action;
  }

  async update(id: number, dto: UpdateSupplyActionDto): Promise<SupplyAction> {
    const action = await this.findOne(id);
    Object.assign(action, dto);
    return this.supplyActionRepository.save(action);
  }

  async remove(id: number): Promise<{ message: string }> {
    const action = await this.findOne(id);
    await this.supplyActionRepository.remove(action);
    return { message: `Acción con ID ${id} eliminada correctamente` };
  }
}