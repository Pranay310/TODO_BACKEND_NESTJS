import { IsEmail, IsString } from 'class-validator';

// LoginDto → defines and validates data for user login
export class LoginDto {
  // Ensures email is in a proper email format (e.g., user@example.com)
  @IsEmail()
  email: string;

  // Ensures password is a string (not a number or object)
  @IsString()
  password: string;
}
