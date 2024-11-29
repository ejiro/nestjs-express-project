# NestJS + Express + Prisma + PostgreSQL Tutorial

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL installed
- VS Code

## Step 1: Project Setup
```bash
# Install NestJS CLI globally
npm i -g @nestjs/cli

# Create new NestJS project
nest new nestjs-express-project
cd nestjs-express-project

# Install additional dependencies
npm install @prisma/client express @nestjs/platform-express
npm install -D prisma @types/express
```

## Step 2: Prisma Setup
```bash
# Initialize Prisma
npx prisma init
```

## Project Structure
```
nestjs-express-project/
│
├── prisma/
│   └── schema.prisma
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── users.controller.ts
│   └── prisma/
│       └── prisma.service.ts
└── package.json
```

## Prisma Schema Example (prisma/schema.prisma)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

## Database Connection (.env file)
```
DATABASE_URL="postgresql://username:password@localhost:5432/yourdbname"
```

## Prisma Service (src/prisma/prisma.service.ts)
```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient 
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

## User Service (src/users/users.service.ts)
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
```

## User Controller (src/users/users.controller.ts)
```typescript
import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: any): Promise<User> {
    return this.usersService.createUser(userData);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
}
```

## Module Configuration (src/users/users.module.ts)
```typescript
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
```

## Main Application (src/main.ts)
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.ts';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Optional: Add Express middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  await app.listen(3000);
}
bootstrap();
```

## Application Module (src/app.module.ts)
```typescript
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
```

## Database Migrations
```bash
# Generate Prisma client
npx prisma generate

# Create database migrations
npx prisma migrate dev --name init
```

## Running the Application
```bash
# Start the application
npm run start:dev
```

## Testing Endpoints
- Create User: POST http://localhost:3000/users
- Get Users: GET http://localhost:3000/users

## Key Concepts
1. NestJS provides dependency injection
2. Prisma handles database operations
3. Express can be used for additional middleware
4. TypeScript ensures type safety

## Common Commands
```bash
# Generate new NestJS resource
nest generate resource users

# Generate service
nest generate service users

# Generate controller
nest generate controller users
```

## Troubleshooting
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Run `npx prisma generate` after schema changes
- Verify all dependencies are installed
```

## Additional Tips
- Use environment variables for configuration
- Implement error handling
- Add validation pipes
- Implement authentication
