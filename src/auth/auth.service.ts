import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// AuthService handles signup, login, and user validation
@Injectable()
export class AuthService {
  // Inject UsersService (for DB ops) and JwtService (for token creation)
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // SIGNUP logic
  async signup(email: string, password: string) {
    // 1. Check if user already exists
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    // 2. Hash the password for security
    const hashed = await bcrypt.hash(password, 10);

    // 3. Save user in DB
    const user = await this.usersService.create({ email, password: hashed });

    // 4. Remove password from the response object
    const { password: _p, ...rest } = user as any;
    return rest;
  }

  // VALIDATE user credentials (for login)
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    // Compare plaintext password with stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    // If valid, return user (used by login or JwtStrategy)
    return user;
  }

  // LOGIN: generate JWT token for authenticated users
  async login(user: any) {
    // Payload is what gets encoded inside the JWT
    const payload = { sub: user.id, email: user.email };

    // Sign and return access token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
