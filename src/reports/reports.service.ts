/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { IReport } from 'src/types/report.type';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  findAll() {
    return this.repo.find();
  }

  create(reportDto: CreateReportDto) {
    const newReport = this.repo.create(reportDto);
    return this.repo.save(newReport);
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, attrs: Partial<Report>) {
    const report = await this.findById(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    Object.assign(report, attrs);

    return this.repo.save(report);
  }
}
