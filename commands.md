
1. Docker commands:
```bash
# Stop the database
docker-compose down

# Start the database
docker-compose up -d

# View logs
docker-compose logs

# Reset everything (warning: deletes all data)
docker-compose down -v
```

2. Prisma commands:
```bash
# Remove migrations folder
rm -rf prisma/migrations

# Generate Prisma client
npx prisma generate

# Create new migration
npx prisma migrate dev --name init

# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate new migration after schema changes
npx prisma migrate dev

# View current database schema
npx prisma db pull
```

3. NestJS commands:
```bash
# Start the application in development mode
npm run start:dev

# Start the application
npm run start
```