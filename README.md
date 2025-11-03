# Forsyte - Policy Builder (Option B: Basic Versioning System)

A policy versioning and template management system built with Next.js 14, TypeScript, Prisma, and PostgreSQL. This implementation focuses on **Option B: Basic Versioning System** from the Forsyte Technical Challenge.

## Overview

This system allows law firms to:
- Save different configurations of a policy
- View previous versions with timestamps
- Compare two versions side-by-side
- Handle the data structure for version storage

This is a vertical slice demonstrating core versioning functionality with full change tracking for regulatory compliance.

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

2. Set up PostgreSQL database:
   - **Option A**: Use Prisma Data Platform (recommended) - See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for instructions
   - **Option B**: Use Docker PostgreSQL - See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for instructions
   - **Option C**: Use an existing PostgreSQL instance - See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for instructions

3. Set up environment variables:
```bash
# Create .env file in the root directory
# For Docker setup:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/forsyte?schema=public"

# For existing PostgreSQL:
# DATABASE_URL="postgresql://user:password@localhost:5432/forsyte?schema=public"
```

4. Run database migrations:
```bash
npm run db:migrate
```

5. Generate Prisma client:
```bash
npm run db:generate
```

6. (Optional) Seed sample data:
```bash
npm run db:seed
```

7. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
/app                          → UI layer (Next.js App Router)
  /policies                   → Policy management pages
    /[policyId]               → Individual policy pages
      /edit                   → Policy editor
      /versions                → Version history
      /compare                 → Version comparison
  /templates                  → Template listing page
  page.tsx                    → Home page
/services                     → Business logic layer
/repositories                  → Prisma database access
/prisma
  /schema.prisma              → Database models
  /seed.ts                    → Seed script
/lib                          → Shared utilities (Prisma client)
/types                        → TypeScript type definitions
```

## Features

✅ Template management - Create and manage policy templates  
✅ Policy versioning - Append-only version history with timestamps  
✅ Version comparison - Side-by-side diff view  
✅ View/Edit versions - View read-only or edit any version (creates new version)  

## Server Actions

This project uses Next.js Server Actions for server-side operations. Actions are located in:

- `app/templates/actions.ts` - Template operations (create, list, get)
- `app/policies/actions.ts` - Policy operations (create, list, get)
- `app/policies/[policyId]/actions.ts` - Policy version operations (create, list, get, get latest)

All server actions use the `'use server'` directive and can be called directly from client components or server components.

## Data Model

**Template**: Defines form structure and available options  
**Policy**: Links customer to template (one policy per customer per template)  
**PolicyVersion**: Stores stance choices with version number and change notes

## Usage Flow

1. **Create Template** - Define policy structure with sections, options, and conditional text
2. **Create Policy** - Link a customer to a template
3. **Edit Policy** - Select stances/choices, save as new version
4. **View History** - See all versions with timestamps and change notes
5. **Compare** - Side-by-side diff of any two versions
6. **Edit Previous Version** - Click "Edit" on any version to create a new version from it

## Seed Data

The seed script creates:
- Sample "High-Risk Client Assessment Policy" template
- Policy for `customer-1`
- Two initial versions demonstrating version history

## Testing

Minimal test coverage for critical functionality:

- **Version numbering logic**: Tests that version numbers increment correctly
- **Version creation**: Tests policy version creation with proper version assignment

Run tests:
```bash
npm test
```

## Development Status

✅ Complete - All features implemented with step-by-step Git commits
✅ Minimal tests added for critical versioning
📝 **Focus:** Option B - Basic Versioning System (as per technical challenge requirements)

## 📚 Additional Documentation

- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Database setup guide (Prisma Data Platform, Docker PostgreSQL, or existing instance)
- **[ENHANCEMENTS.md](./ENHANCEMENTS.md)** - Future enhancements, improvements, and production-ready considerations

## Technical Decisions

### Why Option B (Basic Versioning System)?

This implementation focuses on versioning because:
1. **Core Requirement**: Versioning is fundamental to compliance systems where audit trails are critical
2. **Data Integrity**: Demonstrates handling of version storage, change tracking, and historical data access
3. **User Experience**: Shows how to build intuitive interfaces for legal professionals managing policy changes over time
4. **Scalability**: Versioning system can be extended with live data integration in the future (see ENHANCEMENTS.md)

## AI Tool Usage

This project was developed with AI assistance (Claude/Cursor) for:
- Initial project structure and boilerplate
- TypeScript type definitions
- Test case generation
- Documentation structure

Manual coding focused on:
- Business logic for versioning
- Server action handlers
- UI components and user flows
- Database schema design

