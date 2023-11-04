/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // Tại sao phải khai báo inject repo ở đây ?
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // Tạo ra một User mới

    // Có cần thiết phải validate ở đây hay không ?

    return this.repo.save(user);
  }

  findOne(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  findAll() {
    return this.repo.find();
  }

  async updateUser(id: number, attrsUser: Partial<User>) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrsUser);

    // user {a: 1, b: 2} , attrsUser {a: 3, c: 4} => user {a: 3, b: 2, c: 4}

    console.log('user: ', user);

    return this.repo.save(user);
  }

  deleteUser(id: number) {
    return this.repo.delete({ id });
  }

  async remove(id: number) {
    const user = await this.findById(id);

    // Trong đây có sử dụng Try Catch không ?
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
