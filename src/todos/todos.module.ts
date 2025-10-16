// Import NestJS decorators and modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import the service and controller for Todos
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

// Import the Todo entity for database mapping
import { Todo } from './todo.entity';

// Import UsersModule to access user-related services
import { UsersModule } from '../users/users.module';

// Define the TodosModule with @Module decorator
@Module({
  // imports: other modules needed by this module
  imports: [
    TypeOrmModule.forFeature([Todo]), // Register the Todo entity with TypeORM
    UsersModule, // Import UsersModule to access UsersService
  ],

  // providers: services that handle business logic
  providers: [TodosService],

  // controllers: handle incoming HTTP requests
  controllers: [TodosController],
})
export class TodosModule {} // Module class itself is empty; all logic is via metadata
