import { IsEmail, IsString, MinLength } from 'class-validator';

// SignupDto → defines the structure and validation rules for user signup data
export class SignupDto {
  // Validates that the email is in a correct email format
  @IsEmail()
  email: string;

  // Ensures the password is a string and at least 6 characters long
  @IsString()
  @MinLength(6)
  password: string;
}
