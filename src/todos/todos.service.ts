// Import NestJS decorators and exceptions
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

// Import TypeORM repository decorator
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Import Todo entity and DTOs
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

// Import UsersService to get user info
import { UsersService } from '../users/users.service';

// Mark this class as Injectable so it can be injected into controllers
@Injectable()
export class TodosService {
  // Inject Todo repository and UsersService
  constructor(
    @InjectRepository(Todo) private todosRepo: Repository<Todo>,
    private usersService: UsersService,
  ) {}

  // Create a new Todo for a user
  async create(createDto: CreateTodoDto, userPayload: any) {
    // Find the user by ID
    const user = await this.usersService.findById(userPayload.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Create a new Todo entity, associate it with the user
    const todo = this.todosRepo.create({ ...createDto, user });
    // Save it to the database
    return this.todosRepo.save(todo);
  }

  // Get all Todos for a specific user
  async findAll(userPayload: any) {
    return this.todosRepo.find({ where: { user: { id: userPayload.userId } } });
  }

  // Get a single Todo by ID, only if it belongs to the user
  async findOne(id: string, userPayload: any) {
    // Fetch Todo including the user relation
    const todo = await this.todosRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!todo) throw new NotFoundException('Todo not found'); // 404 if not found
    if (todo.user.id !== userPayload.userId)
      throw new ForbiddenException('Not your todo'); // 403 if not owner
    return todo;
  }

  // Update a Todo by ID
  async update(id: string, dto: UpdateTodoDto, userPayload: any) {
    const todo = await this.findOne(id, userPayload); // Ensure it exists and belongs to user
    Object.assign(todo, dto); // Merge updated fields
    return this.todosRepo.save(todo); // Save updated entity
  }

  // Remove a Todo by ID
  async remove(id: string, userPayload: any) {
    const todo = await this.findOne(id, userPayload); // Ensure it exists and belongs to user
    return this.todosRepo.remove(todo); // Delete from DB
  }
}
