import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';

// @Module() → defines a feature module in NestJS
@Module({
  // imports: registers the User entity for TypeORM so we can inject its repository
  imports: [TypeOrmModule.forFeature([User])],

  // providers: declares which services (like UsersService) belong to this module
  providers: [UsersService],

  // exports: allows other modules (like AuthModule) to use UsersService
  exports: [UsersService],
})
export class UsersModule {}
