import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

/**
 * AppModule is the root module of your NestJS application.
 * It connects and initializes all other modules (like Auth, Users, Todos),
 * sets up environment configuration, and handles database connection.
 */

@Module({
  imports: [
    /**
     * ---------------------------------------------------------------
     * CONFIG MODULE SETUP
     * ---------------------------------------------------------------
     * ConfigModule allows you to manage environment variables in NestJS.
     * It automatically loads variables from a `.env` file or your system's environment.
     *
     * ✅ What it does:
     * - Loads environment variables (e.g., DB credentials, API keys, secrets)
     * - Makes them globally available via `process.env`
     *
     * ✅ Why `isGlobal: true`?
     * - When `isGlobal` is set to true, you don’t need to import `ConfigModule`
     *   in every other module (like AuthModule, UserModule, etc.)
     * - It becomes available everywhere automatically.
     *
     * ✅ Why we do this:
     * - Environment variables should **not be hardcoded** in code.
     *   Instead, we store them outside in `.env` for:
     *     🔒 Security (don’t expose sensitive info like passwords)
     *     ⚙️ Flexibility (easily switch between dev, test, and production configs)
     *     🔁 Reusability (same code can run in multiple environments)
     *
     * Example `.env` file:
     * ---------------------------------------------------------------
     * POSTGRES_HOST=localhost
     * POSTGRES_PORT=5432
     * POSTGRES_USER=postgres
     * POSTGRES_PASSWORD=postgres
     * POSTGRES_DB=todo_db
     * ---------------------------------------------------------------
     */
    ConfigModule.forRoot({ isGlobal: true }),

    /**
     * ---------------------------------------------------------------
     * TYPEORM DATABASE CONNECTION SETUP
     * ---------------------------------------------------------------
     * TypeORM is an Object Relational Mapper (ORM) that allows you to
     * interact with your PostgreSQL database using TypeScript/JavaScript
     * classes and objects — instead of writing raw SQL queries.
     *
     * ✅ What this does:
     * - Connects NestJS to a PostgreSQL database using credentials from `.env`
     * - Automatically loads entities (database tables)
     * - Synchronizes entities with the database (creates tables in dev mode)
     *
     * ✅ Configuration Breakdown:
     * ---------------------------------------------------------------
     * type: 'postgres'              → The database type you’re using.
     * host: process.env.POSTGRES_HOST  → Hostname of your database server.
     * port: Number(process.env.POSTGRES_PORT) || 5432 → Port number (default 5432).
     * username: process.env.POSTGRES_USER  → PostgreSQL username.
     * password: process.env.POSTGRES_PASSWORD → PostgreSQL password.
     * database: process.env.POSTGRES_DB   → The database name to connect to.
     * entities: [__dirname + '/**//*.entity{.ts,.js}']
     *     → Path to where all your entity files are located.
     * synchronize: true
     *     → Automatically syncs entities with the database (creates tables).
     *       ✅ Great for development
     *       ⚠️ Dangerous in production (might drop or alter tables).
     *
     * ✅ Example usage:
     * - When your application starts, TypeORM will:
     *     1. Read all entity files (like `User`, `Todo`, etc.)
     *     2. Create corresponding tables in PostgreSQL
     *     3. Allow you to use repository methods (like `.find()`, `.save()`, etc.)
     */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, // ✅ Auto sync entities (only use in dev!)
    }),

    UsersModule,
    AuthModule,
    TodosModule,

    /**
     * ---------------------------------------------------------------
     * FEATURE MODULES (Uncomment when implemented)
     * ---------------------------------------------------------------
     * These modules will be imported once created.
     * Each module handles a specific feature area.
     *
     * AuthModule  → Handles login/signup, JWT, and authentication logic.
     * UsersModule → Manages user profiles and information.
     * TodosModule → Manages to-do list operations (CRUD).
     *
     * Uncomment them after implementing their modules:
     * ---------------------------------------------------------------
     * AuthModule,
     * UsersModule,
     * TodosModule,
     */
    // AuthModule,
    // UsersModule,
    // TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
