import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FlocksService {

  private readonly logger = new Logger(FlocksService.name);

  create(createFlockDto) {
    this.logger.log(`Lote creado con datos: ${JSON.stringify(createFlockDto)}`);

    return {
      message: 'Lote creado correctamente',
      data: createFlockDto
    };
  }

  findAll() {
    this.logger.log('Consultando todos los lotes');

    return {
      message: 'Lista de lotes obtenida',
      data: []
    };
  }

  findOne(id: string) {
    this.logger.log(`Consultando lote con ID: ${id}`);

    return {
      message: `Lote ${id} encontrado`,
      data: { id }
    };
  }

  update(id: string, updateFlockDto) {
    this.logger.log(`Actualizando lote ${id} con: ${JSON.stringify(updateFlockDto)}`);

    return {
      message: `Lote ${id} actualizado correctamente`,
      data: updateFlockDto
    };
  }

  assignFlock(assignDto) {
    this.logger.log(`Asignando lote: ${JSON.stringify(assignDto)}`);

    return {
      message: 'Lote asignado al galpón correctamente',
      data: assignDto
    };
  }

  registerDeadBirds(dto) {
    this.logger.warn(`Registro de aves muertas en lote: ${JSON.stringify(dto)}`);

    return {
      message: 'Aves muertas registradas correctamente en el lote',
      data: dto
    };
  }

  finishFlock(dto) {
    this.logger.log(`Finalizando lote: ${JSON.stringify(dto)}`);

    return {
      message: 'Lote finalizado correctamente',
      data: dto
    };
  }
}