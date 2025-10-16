import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

// @Injectable() → allows this class to be injected as a dependency into other components
@Injectable()
export class UsersService {
  // Injecting the User repository to interact with the database
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  // 🔍 Find a user by email — used for login/authentication
  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  // 🔍 Find a user by their unique ID — used for profile or ownership checks
  findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  // ➕ Create and save a new user
  // Partial<User> means you can pass only some properties (like email and password)
  create(user: Partial<User>) {
    // Step 1: Create a new User instance (not yet saved)
    const u = this.usersRepo.create(user);

    // Step 2: Save it to the database and return the saved user
    return this.usersRepo.save(u);
  }
}
