# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install dependencies
pnpm run start:dev    # Run in watch mode (development)
pnpm run build        # Compile TypeScript
pnpm run start:prod   # Run compiled output

pnpm run test              # Unit tests (jest, rootDir: src)
pnpm run test:watch        # Unit tests in watch mode
pnpm run test:cov          # Unit tests with coverage
pnpm run test:e2e          # E2E tests (config: test/jest-e2e.json)
pnpm run test:debug        # Debug unit tests

pnpm run lint         # ESLint with auto-fix
pnpm run format       # Prettier format

# Run a single test file
pnpm run test -- --testPathPattern=app.controller
```

## Environment Setup

Copy `.env.template` to `.env` and fill in values:
- `DATABASE_URL` — MSSQL connection string: `mssql://user:pass@host:1433/db?encrypt=true&trustServerCertificate=true`
- `RABBITMQ_URL` — defaults to `amqp://localhost:5672`
- `RABBITMQ_QUEUE` — defaults to `sgv_queue`
- `RABBITMQ_USER`, `RABBITMQ_PASS`, `RABBITMQ_VHOST` — used by docker-compose

Start RabbitMQ locally via Docker Compose (the SQL Server database is external):
```bash
docker compose up -d
```

## Architecture

This is a **NestJS hybrid application**: it runs both an HTTP server (port 3000) and a RabbitMQ microservice listener simultaneously. Both are started in `main.ts` via `app.connectMicroservice()` + `app.listen()`.

### Data Layer

- **Database**: SQL Server (MSSQL) with two schemas — `dbo` and `OrderManagement`
- **ORM**: Prisma 7 with `@prisma/adapter-mssql` (driver adapter pattern — not the default Prisma TCP connection)
- **Prisma schema**: `prisma/schema.prisma` — large schema introspected from an existing DB
- **Generated client**: outputs to `./generated/prisma/` (configured via `prisma.config.ts`)
- **`PrismaService`** (`src/shared/prisma/prisma.service.ts`): extends `PrismaClient`, injectable NestJS service, handles connect/disconnect via `OnModuleInit`/`OnModuleDestroy`

`PrismaService` is provided in `AppModule` and injected directly into controllers and services. When adding new modules, import `PrismaService` from `src/shared/prisma/prisma.service.ts` and add it to the module's `providers`.

### BigInt serialization

`main.ts` patches `BigInt.prototype.toJSON` to serialize BigInts as strings. Many DB columns are BigInt — keep this patch in place.

### Adding features

Follow NestJS conventions: Module → Controller → Service. Place shared infrastructure (like `PrismaService`) under `src/shared/`. Use `@MessagePattern()` for RabbitMQ handlers alongside `@Get()`/`@Post()` HTTP handlers in controllers.
