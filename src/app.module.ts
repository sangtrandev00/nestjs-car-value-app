import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('configService: ', configService);
        return {
          type: 'sqlite',
          database: configService.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true,
        };
      },
    }),

    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   // host: 'localhost',
    //   // port: 3306,
    //   // username: 'root',
    //   // password: 'root',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true, // What's the this mean ?
    // }),
    UsersModule,
    ReportsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
