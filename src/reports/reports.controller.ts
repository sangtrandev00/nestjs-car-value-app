/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { classToPlain } from 'class-transformer';
import { IReport } from 'src/types/report.type';
import { UpdateReportDto } from './dtos/update-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Get()
  async getReports() {
    console.log('get reports: ');

    const reports = await this.reportService.findAll();

    return reports;
  }

  @Post()
  async createReport(@Body() body: CreateReportDto) {
    console.log('create reports: ', body);
    const reportBody = classToPlain(body) as IReport;
    const report = await this.reportService.create(reportBody);
    return report;
  }

  @Patch(':id')
  updateReport(@Param('id') id: string, @Body() body: UpdateReportDto) {
    console.log('update reports: ', id, body);
    return this.reportService.update(+id, body);
  }
}
