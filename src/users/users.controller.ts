/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // Thứ tự setup các route này có ảnh hưởng gì đến việc request lên server hay không ?

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    try {
      const createdUser = await this.usersService.create(
        body.email,
        body.password,
      );
      console.log('createdUser: ', createdUser);
      return `User created`;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // Sao cái này không hiệu quả ?
  // Error => route này phải nằm trước route /:id
  @Get('/all')
  async getAllUsersByEmail(@Query('email') email: string) {
    try {
      console.log('email: ', email);
      const allUsers = await this.usersService.findByEmail(email);
      return allUsers;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Serialize(UserDto)
  @Get()
  async findUser(@Query() { email }: { email: string }) {
    console.log('email: ', email);

    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    console.log('user: ', user);
    return user;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Serialize(UserDto)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    console.log('handler is running');

    const foundUser = await this.usersService.findById(parseInt(id));

    if (!foundUser) {
      throw new NotFoundException('user not found!');
    }

    return foundUser;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    // console.log('id: ', id);
    // console.log('body: ', body);
    // const updatedUser = await this.usersService.updateUser(parseInt(id), body);
    // console.log('updated User: ', updatedUser);

    return this.usersService.updateUser(parseInt(id), body);
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
