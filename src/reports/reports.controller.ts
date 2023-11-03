/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
  @Get()
  getReports(): string {
    console.log('get reports: ');
    return `Get Reports`;
  }
}
