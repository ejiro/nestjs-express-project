import { Injectable, ConflictException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { DummyUser, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.DummyUserCreateInput): Promise<DummyUser> {
    try {
      return await this.prisma.dummyUser.create({
        data: {
          email: data.email,
          name: data.name || null,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async getUsers(): Promise<DummyUser[]> {
    return this.prisma.dummyUser.findMany();
  }
}
