import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {

  create(dto) {
    return "Create report";
  }

  findAll() {
    return "Get all reports";
  }

}