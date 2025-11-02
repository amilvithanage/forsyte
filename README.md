# Forsyte - Policy Builder

Policy versioning and template management system built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## Architecture

- **UI Layer**: `/app` - Next.js App Router pages and components
- **Service Layer**: `/services` - Business logic
- **Repository Layer**: `/repositories` - Prisma database access
- **Data Layer**: `/prisma/schema.prisma` - Database models

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your PostgreSQL connection string
```

3. Run database migrations:
```bash
npm run db:migrate
```

4. Generate Prisma client:
```bash
npm run db:generate
```

5. Start development server:
```bash
npm run dev
```

## Project Structure

```
/app              → UI only (Next.js App Router)
/services         → Business logic
/repositories     → Prisma database access
/prisma/schema    → Database models
/lib              → Shared utilities (Prisma client)
```

## Development Status

🚧 In Progress - Building step by step with Git commits

