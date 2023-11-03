/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  @Get()
  getUser(): string {
    return `Hello World!`;
  }
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log('create user: ', body);
    return `User created`;
  }
}
