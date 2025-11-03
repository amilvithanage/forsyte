# Database Setup Guide

This guide covers database setup options for the Forsyte Policy Builder project using PostgreSQL.

## Quick Start Options

### Option 1: Prisma Data Platform (Recommended for Quick Setup)

[Prisma Data Platform](https://prisma.io/data-platform) provides managed PostgreSQL databases with zero configuration:

1. **Sign up** at [prisma.io/data-platform](https://prisma.io/data-platform)
2. **Create a new database** in the dashboard
3. **Copy the connection string** provided
4. **Add to `.env`**:
   ```
   DATABASE_URL="your-prisma-connection-string"
   ```
5. **Run migrations**:
   ```bash
   npm run db:migrate
   npm run db:generate
   ```

**Benefits:**
- No local setup required
- Free tier available
- Automatic backups and monitoring
- Direct integration with Prisma

### Option 2: Docker PostgreSQL (Local Development)

For local development, use Docker to run PostgreSQL:

#### Setup

1. **Create `docker-compose.yml`** in project root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: forsyte-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: forsyte
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

2. **Start the database**:
   ```bash
   docker-compose up -d
   ```

3. **Configure environment** (`.env` file):
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/forsyte?schema=public"
   ```

4. **Initialize database**:
   ```bash
   npm run db:migrate
   npm run db:generate
   ```

### Option 3: Existing PostgreSQL Instance

If you have an existing PostgreSQL instance:

1. **Update `.env`** with your connection string:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/forsyte?schema=public"
   ```

2. **Run migrations**:
   ```bash
   npm run db:migrate
   npm run db:generate
   ```

### Seeding Sample Data

```bash
npm run db:seed
```

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

