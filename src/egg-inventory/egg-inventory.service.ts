import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EggInventoryService {

  private readonly logger = new Logger(EggInventoryService.name);

  registerProduction(dto) {
    this.logger.log(`Producción registrada: ${JSON.stringify(dto)}`);

    return {
      message: 'Producción de huevos registrada correctamente',
      data: dto
    };
  }

  registerDamaged(dto) {
    this.logger.warn(`Huevos dañados registrados: ${JSON.stringify(dto)}`);

    return {
      message: 'Huevos dañados registrados correctamente',
      data: dto
    };
  }

  findAll() {
    this.logger.log('Consultando inventario de huevos');

    return {
      message: 'Inventario de huevos obtenido',
      data: []
    };
  }

  findOne(id: string) {
    this.logger.log(`Consultando inventario ID: ${id}`);

    return {
      message: `Inventario ${id} encontrado`,
      data: { id }
    };
  }
}