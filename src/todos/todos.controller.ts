// Import necessary NestJS decorators and utilities
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

// Import the TodosService which contains the business logic
import { TodosService } from './todos.service';

// Import JWT guard to protect routes
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Import DTOs for data validation
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

// Import custom decorator to get authenticated user
import { GetUser } from '../common/decorators/get-user.decorator';

// Define the base route for this controller
@Controller('todos')
// Apply JWT guard to all routes in this controller
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {} // Inject TodosService

  // POST /todos → Create a new Todo
  @Post()
  create(@Body() dto: CreateTodoDto, @GetUser() user) {
    // Calls service to create Todo for authenticated user
    return this.todosService.create(dto, user);
  }

  // GET /todos → Get all Todos of the authenticated user
  @Get()
  findAll(@GetUser() user) {
    return this.todosService.findAll(user);
  }

  // GET /todos/:id → Get a single Todo by ID
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user) {
    return this.todosService.findOne(id, user);
  }

  // PUT /todos/:id → Update a Todo by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto, @GetUser() user) {
    return this.todosService.update(id, dto, user);
  }

  // DELETE /todos/:id → Delete a Todo by ID
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user) {
    return this.todosService.remove(id, user);
  }
}
