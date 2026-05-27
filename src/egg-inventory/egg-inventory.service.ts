import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

    const production = this.productionRepo.create({
      lote: { id_lote: dto.loteId },
      tipo_huevoId: dto.tipoHuevoId,
      cantidady: dto.cantidad,
    });

    const saved = await this.productionRepo.save(production);

    this.logger.log(`Producción registrada: ${saved.id_produccion_huevo}`);

    return {
      message: 'Producción de huevos registrada correctamente',
      data: saved,
    };
  }

  async registerDamaged(dto: RegisterDamagedEggsDto) {

    const inventario = await this.inventoryRepo.findOneBy({
      id_inventario_huevo: dto.inventarioId,
    });

    if (!inventario) {
      throw new NotFoundException(`Inventario ${dto.inventarioId} no encontrado`);
    }

    const damaged = this.damagedRepo.create({
      inventario: { id_inventario_huevo: dto.inventarioId },
      cantidad: dto.cantidad,
      razon: dto.razon,
    });

    const saved = await this.damagedRepo.save(damaged);

    this.logger.warn(`Huevos dañados registrados: ${dto.cantidad} unidades`);

    return {
      message: 'Huevos dañados registrados correctamente',
      data: saved,
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