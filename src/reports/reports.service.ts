/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  findAll() {
    return this.repo.find();
  }

  create(reportDto: CreateReportDto) {
    const newReport = this.repo.create(reportDto);

    const createdUser = plainToClass(User, {
      id: 1,
      email: 'nhatsan0101@gmail.com',
      password: '123456',
      isActive: true,
    });
    newReport.user = createdUser;

    console.log('instance of new report: ', newReport);

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
