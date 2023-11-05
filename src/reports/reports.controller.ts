/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';

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
  @Serialize(ReportDto)
  async createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() currentUser: User,
  ) {
    console.log('create reports: ', body);
    console.log('current User: ', currentUser);
    const report = await this.reportService.create(body);
    return report;
  }

  @Patch(':id')
  updateReport(@Param('id') id: string, @Body() body: UpdateReportDto) {
    console.log('update reports: ', id, body);
    return this.reportService.update(+id, body);
  }
}
