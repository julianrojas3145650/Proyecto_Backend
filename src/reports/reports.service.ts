import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
  ) { }

  async create(dto: CreateReportDto) {
    const report = this.reportRepo.create({
      tipo_reporte: dto.tipo_reporte,
    });

    return await this.reportRepo.save(report);
  }

  findAll() {
    return this.reportRepo.find({
      relations: ['usuario'],
    });
  }

  async findOne(id_reporte: string) {
    return await this.reportRepo.findOne({
      where: { id_reporte },
      relations: ['usuario'],
    });
  }
}