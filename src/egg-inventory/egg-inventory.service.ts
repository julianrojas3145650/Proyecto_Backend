import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { EggInventory } from './entities/egg-inventory.entity';
import { EggProduction } from './entities/egg-production.entity';
import { DamagedEgg } from './entities/damaged-egg.entity';
import { EggHistory } from './entities/egg-history.entity';

import { RegisterEggProductionDto } from './dto/register-egg-production.dto';
import { RegisterDamagedEggsDto } from './dto/register-damaged-eggs.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class EggInventoryService {
  private readonly logger = new Logger(EggInventoryService.name);

  constructor(
    @InjectRepository(EggInventory)
    private readonly inventoryRepo: Repository<EggInventory>,

    @InjectRepository(EggProduction)
    private readonly productionRepo: Repository<EggProduction>,

    @InjectRepository(DamagedEgg)
    private readonly damagedRepo: Repository<DamagedEgg>,

    @InjectRepository(EggHistory)
    private readonly historyRepo: Repository<EggHistory>,
  ) {}

  async registerProduction(dto: RegisterEggProductionDto) {
    let inventory = await this.inventoryRepo.findOne({
      where: {
        lote: { id_lote: dto.loteId },
        tipo_huevo: { id_tipo: dto.tipoHuevoId }
      }
    });

    const production = this.productionRepo.create({
      lote: { id_lote: dto.loteId } as any,
      tipo_huevoId: dto.tipoHuevoId,
      cantidady: dto.cantidad,
    });
    const savedProduction = await this.productionRepo.save(production);

    if (inventory) {
      inventory.cantidad += dto.cantidad;
    } else {
      inventory = this.inventoryRepo.create({
        lote: { id_lote: dto.loteId } as any,
        tipo_huevo: { id_tipo: dto.tipoHuevoId } as any,
        cantidad: dto.cantidad,
        produccion: savedProduction
      });
    }

    const savedInventory = await this.inventoryRepo.save(inventory);
    this.logger.log(`Producción registrada: ${savedProduction.id_produccion_huevo}`);

    return {
      message: 'Producción de huevos registrada correctamente',
      data: savedInventory,
    };
  }

  async registerDamaged(dto: RegisterDamagedEggsDto) {
    const inventory = await this.inventoryRepo.findOne({ where: { id_inventario_huevo: dto.inventarioId } });
    
    if (!inventory) {
      throw new NotFoundException(`Inventario con ID ${dto.inventarioId} no encontrado`);
    }

    if (inventory.cantidad < dto.cantidad) {
      throw new BadRequestException('La cantidad dañada no puede ser mayor al inventario disponible');
    }

    inventory.cantidad -= dto.cantidad;
    await this.inventoryRepo.save(inventory);

    const damaged = this.damagedRepo.create({
      inventario: inventory,
      cantidad: dto.cantidad,
      razon: dto.razon,
    });
    const savedDamaged = await this.damagedRepo.save(damaged);

    this.logger.warn(`Huevos dañados registrados: ${dto.cantidad} unidades`);

    return {
      message: 'Huevos dañados registrados correctamente',
      data: savedDamaged,
    };
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const paginatedResult = await paginate<EggInventory>(this.inventoryRepo, { page, limit }, {
      relations: ['tipo_huevo', 'lote', 'produccion', 'damagedEggs'],
    });

    return {
      message: 'Inventario de huevos obtenido',
      data: paginatedResult,
    };
  }

  async findOne(id: string) {
    const inv = await this.inventoryRepo.findOne({
      where: { id_inventario_huevo: id },
      relations: ['tipo_huevo', 'lote', 'produccion', 'damagedEggs', 'history'],
    });

    if (!inv) {
      throw new NotFoundException(`Inventario ${id} no encontrado`);
    }

    return {
      message: `Inventario ${id} encontrado`,
      data: inv,
    };
  }
}
