import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

// ✅ @Controller decorator defines this class as a controller that handles incoming HTTP requests
// All routes inside will be prefixed with '/auth'
@Controller('auth')
export class AuthController {
  // Inject AuthService using dependency injection
  constructor(private authService: AuthService) {}

  // 📍 Route: POST /auth/signup
  // Handles new user registration
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    // dto automatically validated using class-validator decorators from SignupDto
    // Calls AuthService.signup() to create a new user with hashed password
    return this.authService.signup(dto.email, dto.password);
  }

  // 📍 Route: POST /auth/login
  // Custom status code: 200 (instead of default 201 for POST)
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    // Validate email and password using AuthService
    const user = await this.authService.validateUser(dto.email, dto.password);

    // If validation fails, return message (you can also throw UnauthorizedException)
    if (!user) {
      return { message: 'Invalid credentials' };
    }

    // If valid → generate and return JWT token
    return this.authService.login(user);
  }
}

/**
 * ✅ What happens overall:
 *
 * 1. POST /auth/signup → Registers new user after hashing password.
 * 2. POST /auth/login → Validates credentials, then returns a signed JWT token.
 * 3. Returned token is used by client for future authenticated requests.
 */
