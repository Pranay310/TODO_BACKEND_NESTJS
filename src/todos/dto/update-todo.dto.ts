// Import decorators from class-validator for validating incoming data
import { IsString, IsOptional, IsBoolean } from 'class-validator';

// Define a DTO class for updating a Todo
export class UpdateTodoDto {
  // Optional title; must be a string if provided
  @IsOptional()
  @IsString()
  title?: string;

  // Optional description; must be a string if provided
  @IsOptional()
  @IsString()
  description?: string;

  // Optional completed status; must be a boolean if provided
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
