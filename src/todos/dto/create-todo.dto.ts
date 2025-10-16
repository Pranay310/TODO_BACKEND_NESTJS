// Import decorators from class-validator to validate incoming data
import { IsString, IsOptional } from 'class-validator';

// Define a DTO class for creating a Todo
export class CreateTodoDto {
  // title must be a string
  @IsString()
  title: string;

  // description is optional, and if provided, must be a string
  @IsOptional() // Field can be omitted
  @IsString() // If present, it must be a string
  description?: string;
}
