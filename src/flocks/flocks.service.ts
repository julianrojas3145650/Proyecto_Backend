import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { Flock } from './entities/flock.entity';
import { FlockLocation } from './entities/flock-location.entity';
import { FlockAssignmentHistory } from './entities/flock-assignment-history.entity';
import { DeadBird } from './entities/dead-bird.entity';
import { FinishedFlock } from './entities/finished-flock.entity';
import { Breed } from '../breeds/entities/breed.entity';

import { CreateFlockDto } from './dto/create-flock.dto';
import { UpdateFlockDto } from './dto/update-flock.dto';
import { AssignFlockDto } from './dto/assign-flock.dto';
import { RegisterDeadBirdsDto } from './dto/register-dead-birds.dto';
import { FinishFlockDto } from './dto/finish-flock.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class FlocksService {

  private readonly logger = new Logger(FlocksService.name);

  constructor(
    @InjectRepository(Flock)
    private readonly flockRepo: Repository<Flock>,

    @InjectRepository(FlockLocation)
    private readonly locationRepo: Repository<FlockLocation>,

    @InjectRepository(FlockAssignmentHistory)
    private readonly historyRepo: Repository<FlockAssignmentHistory>,

    @InjectRepository(DeadBird)
    private readonly deadBirdRepo: Repository<DeadBird>,

    @InjectRepository(FinishedFlock)
    private readonly finishedFlockRepo: Repository<FinishedFlock>,

    @InjectRepository(Breed)
    private readonly breedRepo: Repository<Breed>,
  ) {}

  async create(dto: CreateFlockDto) {

    const raza = await this.breedRepo.findOneBy({ id_raza: dto.razaId });
    if (!raza) throw new NotFoundException('Raza no encontrada');

    const flock = this.flockRepo.create({
      nombre: dto.nombre,
      total_aves: dto.total_aves,
      observacion: dto.observacion,
      racion_alimento: dto.racion_alimento,
      estado: 'ACTIVO',
      raza,
    });

    const saved = await this.flockRepo.save(flock);
    this.logger.log(`Lote creado: ${saved.id_lote}`);

    return {
      message: 'Lote creado correctamente',
      data: saved,
    };
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    
    const paginatedResult = await paginate<Flock>(this.flockRepo, { page, limit }, {
      relations: ['raza', 'ubicacion', 'estados'],
    });

    return {
      message: 'Lista de lotes obtenida',
      data: paginatedResult,
    };
  }

  async findOne(id: string) {

    const flock = await this.flockRepo.findOne({
      where: { id_lote: id },
      relations: ['raza', 'ubicacion', 'estados'],
    });

    if (!flock) {
      throw new NotFoundException(`Lote ${id} no encontrado`);
    }

    return {
      message: `Lote ${id} encontrado`,
      data: flock,
    };
  }

  async update(id: string, dto: UpdateFlockDto) {

    const flock = await this.flockRepo.findOneBy({ id_lote: id });

    if (!flock) {
      throw new NotFoundException(`Lote ${id} no encontrado`);
    }

    this.flockRepo.merge(flock, dto);
    const updated = await this.flockRepo.save(flock);

    this.logger.log(`Lote actualizado: ${id}`);

    return {
      message: `Lote ${id} actualizado correctamente`,
      data: updated,
    };
  }

  async assignFlock(dto: AssignFlockDto) {

    const lote = await this.flockRepo.findOneBy({ id_lote: dto.loteId });
    if (!lote) throw new NotFoundException(`Lote ${dto.loteId} no encontrado`);

    const location = this.locationRepo.create({
      lote: { id_lote: dto.loteId },
      galpon: { id_galpon: dto.galponId },
    });
    const savedLocation = await this.locationRepo.save(location);

    const history = this.historyRepo.create({
      lote: { id_lote: dto.loteId },
      galpon: { id_galpon: dto.galponId },
      cantidad_asignada: dto.cantidad,
    });
    await this.historyRepo.save(history);

    this.logger.log(`Lote ${dto.loteId} asignado al galpón ${dto.galponId}`);

    return {
      message: 'Lote asignado al galpón correctamente',
      data: savedLocation,
    };
  }

  async registerDeadBirds(dto: RegisterDeadBirdsDto) {

    const lote = await this.flockRepo.findOneBy({ id_lote: dto.loteId });
    if (!lote) throw new NotFoundException(`Lote ${dto.loteId} no encontrado`);

    const deadBird = this.deadBirdRepo.create({
      cantidad: dto.cantidad,
      lote: { id_lote: dto.loteId },
    });
    const saved = await this.deadBirdRepo.save(deadBird);

    this.logger.warn(`Aves muertas registradas en lote ${dto.loteId}: ${dto.cantidad}`);

    return {
      message: 'Aves muertas registradas correctamente en el lote',
      data: saved,
    };
  }

  async finishFlock(dto: FinishFlockDto) {

    const lote = await this.flockRepo.findOneBy({ id_lote: dto.loteId });
    if (!lote) throw new NotFoundException(`Lote ${dto.loteId} no encontrado`);

    const finished = this.finishedFlockRepo.create({
      cantidad: dto.cantidad,
      razon: dto.razon,
      lote: { id_lote: dto.loteId },
    });
    const saved = await this.finishedFlockRepo.save(finished);

    // Actualizar estado del lote
    lote.estado = 'FINALIZADO';
    await this.flockRepo.save(lote);

    this.logger.log(`Lote ${dto.loteId} finalizado. Razón: ${dto.razon}`);

    return {
      message: 'Lote finalizado correctamente',
      data: saved,
    };
  }
}