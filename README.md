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
# DATABASE_URL="postgresql://user:password@localhost:5432/forsyte?schema=public"
```

3. Run database migrations:
```bash
npm run db:migrate
```

4. Generate Prisma client:
```bash
npm run db:generate
```

5. (Optional) Seed sample data:
```bash
npm run db:seed
```

6. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
/app                          → UI only (Next.js App Router)
  /api                        → API route handlers
  /policies                   → Policy management pages
  /templates                  → Template listing page
/services                     → Business logic layer
/repositories                 → Prisma database access
/prisma
  /schema.prisma              → Database models
  /seed.ts                    → Seed script
/lib                          → Shared utilities (Prisma client)
```

## Features

✅ Template management - Create and manage policy templates  
✅ Policy versioning - Append-only version history with timestamps  
✅ Version comparison - Side-by-side diff view  
✅ View/Edit versions - View read-only or edit any version (creates new version)  
✅ Preview rendering - Optional HTML preview from schema + content  

## API Routes

### Templates
- `POST /api/templates` - Create template
- `GET /api/templates` - List templates
- `GET /api/templates/:templateId` - Get template

### Policies
- `POST /api/policies` - Create policy (customer + template)
- `GET /api/policies?customerId=` - List customer policies
- `GET /api/policies/:policyId` - Get policy

### Policy Versions
- `POST /api/policies/:policyId/versions` - Create new version
- `GET /api/policies/:policyId/versions` - List all versions
- `GET /api/policies/:policyId/versions/latest` - Get latest version
- `GET /api/policies/:policyId/versions/:version` - Get specific version

### Preview
- `POST /api/preview` - Generate HTML preview (requires schemaJson and contentJson)

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
- **Preview generation**: Tests template + data integration for document preview

Run tests:
```bash
npm test
```

## Development Status

✅ Complete - All features implemented with step-by-step Git commits
✅ Minimal tests added for critical versioning and preview functionality  
📝 **Focus:** Option B - Basic Versioning System (as per technical challenge requirements)

## 📚 Additional Documentation

For details on future enhancements, improvements, and production-ready considerations, see [ENHANCEMENTS.md](./ENHANCEMENTS.md).

