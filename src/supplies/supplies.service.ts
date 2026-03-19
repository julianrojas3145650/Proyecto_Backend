import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insumo } from './entities/supply.entity';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';

@Injectable()
export class SuppliesService {
  constructor(
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>,
  ) {}

  async create(dto: CreateSupplyDto): Promise<Insumo> {
    const insumo = this.insumoRepository.create({
      ...dto,
      fecha: new Date(dto.fecha),
    });
    return this.insumoRepository.save(insumo);
  }

  async findAll(): Promise<Insumo[]> {
    return this.insumoRepository.find({
      relations: ['categoria', 'unidadMedida', 'llamarUsuario'],
    });
  }

  async findOne(id: number): Promise<Insumo> {
    const insumo = await this.insumoRepository.findOne({
      where: { id_insumos: id },
      relations: ['categoria', 'unidadMedida', 'llamarUsuario', 'historial'],
    });
    if (!insumo) {
      throw new NotFoundException(`Insumo con ID ${id} no encontrado`);
    }
    return insumo;
  }

  async update(id: number, dto: UpdateSupplyDto): Promise<Insumo> {
    const insumo = await this.findOne(id);
    const updated = Object.assign(insumo, {
      ...dto,
      ...(dto.fecha && { fecha: new Date(dto.fecha) }),
    });
    return this.insumoRepository.save(updated);
  }

  async ajustarCantidad(id: number, cantidad: number): Promise<Insumo> {
    const insumo = await this.findOne(id);
    const nuevaCantidad = Number(insumo.cantidad) + cantidad;
    if (nuevaCantidad < 0) {
      throw new BadRequestException(
        `Stock insuficiente. Disponible: ${insumo.cantidad}`,
      );
    }
    insumo.cantidad = nuevaCantidad;
    return this.insumoRepository.save(insumo);
  }

  async remove(id: number): Promise<{ message: string }> {
    const insumo = await this.findOne(id);
    await this.insumoRepository.remove(insumo);
    return { message: `Insumo con ID ${id} eliminado correctamente` };
  }
}