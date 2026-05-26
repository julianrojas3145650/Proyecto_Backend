import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EggInventory } from './entities/egg-inventory.entity';
import { EggProduction } from './entities/egg-production.entity';
import { DamagedEgg } from './entities/damaged-egg.entity';
import { RegisterEggProductionDto } from './dto/register-egg-production.dto';
import { RegisterDamagedEggsDto } from './dto/register-damaged-eggs.dto';

@Injectable()
export class EggInventoryService {
  private readonly logger = new Logger(EggInventoryService.name);

  constructor(
    @InjectRepository(EggInventory)
    private inventoryRepository: Repository<EggInventory>,
    @InjectRepository(EggProduction)
    private productionRepository: Repository<EggProduction>,
    @InjectRepository(DamagedEgg)
    private damagedRepository: Repository<DamagedEgg>,
  ) {}

  async registerProduction(dto: RegisterEggProductionDto) {
    this.logger.log(`Producción registrada: ${JSON.stringify(dto)}`);

    let inventory = await this.inventoryRepository.findOne({
      where: {
        lote: { id_lote: dto.loteId },
        tipo_huevo: { id_tipo: dto.tipoHuevoId }
      }
    });

    const production = this.productionRepository.create({
      lote: { id_lote: dto.loteId } as any,
      tipo_huevoId: dto.tipoHuevoId,
      cantidady: dto.cantidad,
    });
    const savedProduction = await this.productionRepository.save(production);

    if (inventory) {
      inventory.cantidad += dto.cantidad;
    } else {
      inventory = this.inventoryRepository.create({
        lote: { id_lote: dto.loteId } as any,
        tipo_huevo: { id_tipo: dto.tipoHuevoId } as any,
        cantidad: dto.cantidad,
        produccion: savedProduction
      });
    }

    const savedInventory = await this.inventoryRepository.save(inventory);

    return {
      message: 'Producción de huevos registrada correctamente',
      data: savedInventory,
    };
  }

  async registerDamaged(dto: RegisterDamagedEggsDto) {
    this.logger.warn(`Huevos dañados registrados: ${JSON.stringify(dto)}`);

    const inventory = await this.inventoryRepository.findOne({ where: { id_inventario_huevo: dto.inventarioId } });
    
    if (!inventory) {
      throw new NotFoundException(`Inventario con ID ${dto.inventarioId} no encontrado`);
    }

    if (inventory.cantidad < dto.cantidad) {
      throw new BadRequestException('La cantidad dañada no puede ser mayor al inventario disponible');
    }

    inventory.cantidad -= dto.cantidad;
    await this.inventoryRepository.save(inventory);

    const damaged = this.damagedRepository.create({
      inventario: inventory,
      cantidad: dto.cantidad,
      razon: dto.razon,
    });
    await this.damagedRepository.save(damaged);

    return {
      message: 'Huevos dañados registrados correctamente',
      data: damaged,
    };
  }

  async findAll() {
    this.logger.log('Consultando inventario de huevos');
    const inventories = await this.inventoryRepository.find({
      relations: ['lote', 'tipo_huevo']
    });

    return {
      message: 'Inventario de huevos obtenido',
      data: inventories,
    };
  }

  async findOne(id: string) {
    this.logger.log(`Consultando inventario ID: ${id}`);
    const inventory = await this.inventoryRepository.findOne({
      where: { id_inventario_huevo: id },
      relations: ['lote', 'tipo_huevo']
    });

    if (!inventory) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }

    return {
      message: `Inventario ${id} encontrado`,
      data: inventory,
    };
  }
}
