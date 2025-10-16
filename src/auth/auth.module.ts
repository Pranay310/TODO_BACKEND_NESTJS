// Importing the necessary decorators, modules, and classes from NestJS and other libraries
import { Module } from '@nestjs/common'; // @Module decorator makes a class a NestJS module
import { JwtModule } from '@nestjs/jwt'; // Handles JWT (JSON Web Token) features like signing and verifying tokens
import { PassportModule } from '@nestjs/passport'; // Integrates Passport.js strategies for authentication
import { ConfigModule, ConfigService } from '@nestjs/config'; // Used to manage environment variables securely
import { UsersModule } from '../users/users.module'; // Imports UsersModule so AuthModule can use user-related services
import { AuthService } from './auth.service'; // Service containing business logic for authentication
import { AuthController } from './auth.controller'; // Controller handling HTTP requests for authentication (like login/signup)
import { JwtStrategy } from './jwt.strategy'; // Defines how JWT tokens are validated (Passport Strategy)

// The @Module decorator defines metadata for this AuthModule
@Module({
  // imports: list of modules required by AuthModule
  imports: [
    ConfigModule, // Gives access to configuration/env variables (e.g., JWT_SECRET)
    UsersModule, // Allows AuthModule to use UsersService for fetching user data
    PassportModule, // Adds Passport middleware for handling different strategies like JWT or local
    // Registering the JWT module asynchronously so it can use ConfigService for dynamic configuration
    JwtModule.registerAsync({
      imports: [ConfigModule], // Ensures ConfigService is available inside useFactory
      inject: [ConfigService], // Injects ConfigService dependency into the factory function
      useFactory: (cfg: ConfigService) => ({
        // A factory function that returns JWT configuration
        secret: cfg.get('JWT_SECRET'), // The secret key for signing JWT tokens (from .env)
        signOptions: {
          expiresIn: cfg.get('JWT_EXPIRES_IN') || '3600s', // Sets token expiration time, default 1 hour
        },
      }),
    }),
  ],

  // providers: Services and strategies used in this module
  providers: [AuthService, JwtStrategy],

  // controllers: Controllers that handle incoming requests and return responses
  controllers: [AuthController],

  // exports: Makes AuthService available to other modules that import AuthModule
  exports: [AuthService],
})

// The main class for the authentication module
export class AuthModule {} // Empty because all logic is handled via the metadata above
