# PostgreSQL Setup

Local PostgreSQL database using Docker, which is the easiest way to get started.

1. First, make sure you have Docker installed. Then create a `docker-compose.yml` file:

```yaml:docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:latest
    container_name: local_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

2. Update your `.env` file with the local database URL:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb"
```

3. Start the database:
```bash
docker-compose up -d
```

4. Update your Prisma schema to a simpler version (no need for multiple schemas locally):
```prisma:prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model DummyUser {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(dbgenerated("CURRENT_TIMESTAMP")) @db.Timestamptz(6)
}
```

5. Initialize your database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

Now you have a local PostgreSQL database running! You can also use tools like pgAdmin or DBeaver to view your database if needed.
