import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flock } from './entities/flock.entity';
import { Breed } from '../breeds/entities/breed.entity';
import { CreateFlockDto } from './dto/create-flock.dto';
import { UpdateFlockDto } from './dto/update-flock.dto';

@Injectable()
export class FlocksService {
  private readonly logger = new Logger(FlocksService.name);

  constructor(
    @InjectRepository(Flock)
    private flockRepository: Repository<Flock>,
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  async create(createFlockDto: CreateFlockDto) {
    this.logger.log(`Lote creado con datos: ${JSON.stringify(createFlockDto)}`);

    const breed = await this.breedRepository.findOne({ where: { id_raza: createFlockDto.razaId } });
    if (!breed) {
      throw new NotFoundException(`Raza con ID ${createFlockDto.razaId} no encontrada`);
    }

    const newFlock = this.flockRepository.create({
      nombre: createFlockDto.nombre,
      total_aves: createFlockDto.total_aves,
      observacion: createFlockDto.observacion,
      racion_alimento: createFlockDto.racion_alimento,
      estado: 'activo',
      raza: breed,
    });

    const savedFlock = await this.flockRepository.save(newFlock);

    return {
      message: 'Lote creado correctamente',
      data: savedFlock,
    };
  }

  async findAll() {
    this.logger.log('Consultando todos los lotes');
    const flocks = await this.flockRepository.find({ relations: ['raza'] });
    return {
      message: 'Lista de lotes obtenida',
      data: flocks,
    };
  }

  async findOne(id: string) {
    this.logger.log(`Consultando lote con ID: ${id}`);
    const flock = await this.flockRepository.findOne({ where: { id_lote: id }, relations: ['raza'] });
    if (!flock) {
      throw new NotFoundException(`Lote con ID ${id} no encontrado`);
    }
    return {
      message: `Lote ${id} encontrado`,
      data: flock,
    };
  }

  async update(id: string, updateFlockDto: UpdateFlockDto) {
    this.logger.log(
      `Actualizando lote ${id} con: ${JSON.stringify(updateFlockDto)}`,
    );

    const flock = await this.flockRepository.findOne({ where: { id_lote: id } });
    if (!flock) {
      throw new NotFoundException(`Lote con ID ${id} no encontrado`);
    }

    if (updateFlockDto.razaId) {
      const breed = await this.breedRepository.findOne({ where: { id_raza: updateFlockDto.razaId } });
      if (!breed) {
        throw new NotFoundException(`Raza con ID ${updateFlockDto.razaId} no encontrada`);
      }
      flock.raza = breed;
    }

    if (updateFlockDto.nombre) flock.nombre = updateFlockDto.nombre;
    if (updateFlockDto.total_aves !== undefined) flock.total_aves = updateFlockDto.total_aves;
    if (updateFlockDto.observacion) flock.observacion = updateFlockDto.observacion;
    if (updateFlockDto.racion_alimento) flock.racion_alimento = updateFlockDto.racion_alimento;

    const updatedFlock = await this.flockRepository.save(flock);

    return {
      message: `Lote ${id} actualizado correctamente`,
      data: updatedFlock,
    };
  }

  async assignFlock(assignDto: any) {
    this.logger.log(`Asignando lote: ${JSON.stringify(assignDto)}`);

    return {
      message: 'Lote asignado al galpón correctamente',
      data: assignDto,
    };
  }

  async registerDeadBirds(dto: any) {
    this.logger.warn(
      `Registro de aves muertas en lote: ${JSON.stringify(dto)}`,
    );
    const id = dto.loteId || dto.id_lote;
    if (!id) {
        throw new BadRequestException('ID del lote no proporcionado');
    }
    const flock = await this.flockRepository.findOne({ where: { id_lote: id } });
    if (flock) {
        flock.total_aves -= dto.cantidad || 0;
        await this.flockRepository.save(flock);
    }
    return {
      message: 'Aves muertas registradas correctamente en el lote',
      data: dto,
    };
  }

  async finishFlock(dto: any) {
    this.logger.log(`Finalizando lote: ${JSON.stringify(dto)}`);
    const id = dto.loteId || dto.id_lote;
    if (!id) {
        throw new BadRequestException('ID del lote no proporcionado');
    }
    const flock = await this.flockRepository.findOne({ where: { id_lote: id } });
    if (flock) {
        flock.estado = 'finalizado';
        await this.flockRepository.save(flock);
    }

    return {
      message: 'Lote finalizado correctamente',
      data: dto,
    };
  }
}
