import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { SupplyHistory } from './entities/supply-history.entity';
import { CreateSupplyHistoryDto } from './dto/create-supply-history.dto';
import { UpdateSupplyHistoryDto } from './dto/update-supply-history.dto';
import { Insumo } from '../supplies/entities/supply.entity';

// Acciones que reducen stock (IDs o nombres de accion)
const ACCIONES_SALIDA = ['SALIDA', 'CONSUMO', 'BAJA', 'MERMA'];

@Injectable()
export class SupplyHistoryService {
  constructor(
    @InjectRepository(SupplyHistory)
    private readonly historyRepository: Repository<SupplyHistory>,
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Registra un movimiento en el historial y actualiza el stock del insumo
   * dentro de una transacción atómica.
   */
  async create(dto: CreateSupplyHistoryDto): Promise<SupplyHistory> {
    return this.dataSource.transaction(async (manager) => {
      // 1. Verificar que existe el insumo
      const insumo = await manager.findOne(Insumo, {
        where: { id_insumos: dto.id_insumos },
        relations: [],
      });
      if (!insumo) {
        throw new NotFoundException(
          `Insumo con ID ${dto.id_insumos} no encontrado`,
        );
      }

      // 2. Verificar acción - si es acción de salida se resta, si es entrada se suma
      const accionSalida = ACCIONES_SALIDA.includes(
        String(dto.id_historial_accion).toUpperCase(),
      );

      const nuevaCantidad = accionSalida
        ? Number(insumo.cantidad) - dto.cantidad
        : Number(insumo.cantidad) + dto.cantidad;

      if (nuevaCantidad < 0) {
        throw new BadRequestException(
          `Stock insuficiente. Disponible: ${insumo.cantidad}, solicitado: ${dto.cantidad}`,
        );
      }

      // 3. Actualizar stock del insumo
      await manager.update(Insumo, dto.id_insumos, { cantidad: nuevaCantidad });

      // 4. Guardar historial
      const historial = manager.create(SupplyHistory, {
        ...dto,
        fecha: new Date(dto.fecha),
      });
      return manager.save(SupplyHistory, historial);
    });
  }

  async findAll(): Promise<SupplyHistory[]> {
    return this.historyRepository.find({
      relations: ['insumo', 'accion'],
      order: { fecha: 'DESC' },
    });
  }

  async findByInsumo(idInsumo: number): Promise<SupplyHistory[]> {
    return this.historyRepository.find({
      where: { id_insumos: idInsumo },
      relations: ['insumo', 'accion'],
      order: { fecha: 'DESC' },
    });
  }

  async findOne(id: number): Promise<SupplyHistory> {
    const history = await this.historyRepository.findOne({
      where: { id_historial_insumo: id },
      relations: ['insumo', 'accion'],
    });
    if (!history) {
      throw new NotFoundException(`Historial con ID ${id} no encontrado`);
    }
    return history;
  }

  async update(id: number, dto: UpdateSupplyHistoryDto): Promise<SupplyHistory> {
    const history = await this.findOne(id);
    const updated = Object.assign(history, {
      ...dto,
      ...(dto.fecha && { fecha: new Date(dto.fecha) }),
    });
    return this.historyRepository.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    const history = await this.findOne(id);
    await this.historyRepository.remove(history);
    return { message: `Historial con ID ${id} eliminado correctamente` };
  }
}