/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const createdUser = await this.usersService.create(
      body.email,
      body.password,
    );
    console.log('createdUser: ', createdUser);
    return `User created`;
  }

  @Get()
  async findUser(@Query() { email }: { email: string }) {
    console.log('email: ', email);

    const user = await this.usersService.findOne(email);
    console.log('user: ', user);
    return user;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const foundUser = await this.usersService.findById(parseInt(id));
    return foundUser;
  }

  @Get('/all')
  async getAllUsersByEmail(@Query('email') email: string) {
    const allUsers = await this.usersService.findByEmail(email);
    return allUsers;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    console.log('id: ', id);

    const updatedUser = await this.usersService.updateUser(parseInt(id), body);
    console.log('updated User: ', updatedUser);

    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.usersService.deleteUser(parseInt(id));
    console.log('deleted User: ', deletedUser);

    return deletedUser;
  }

  @Delete('soft/:id')
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.usersService.remove(parseInt(id));
    console.log('removed User: ', removedUser);

    return removedUser;
  }
}
