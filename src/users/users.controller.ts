import { Controller, Post, Get, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { DummyUser } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: any): Promise<DummyUser> {
    return this.usersService.createUser(userData);
  }

  @Get()
  async getUsers(): Promise<DummyUser[]> {
    return this.usersService.getUsers();
  }
}
