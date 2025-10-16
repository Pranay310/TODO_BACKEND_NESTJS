// Import decorators and classes from TypeORM to define entities and relationships
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity'; // Import User entity to establish relationship

// Define the "Todo" entity, which maps to a "todo" table in the database
@Entity()
export class Todo {
  // Primary key column, auto-generated as a UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Regular column for the Todo title (required)
  @Column()
  title: string;

  // Optional column for description, can be null
  @Column({ nullable: true })
  description?: string;

  // Boolean column to mark if Todo is completed, default is false
  @Column({ default: false })
  completed: boolean;

  // Many-to-One relationship with User entity
  // Each Todo belongs to a single User
  // On user deletion, cascade deletes all their Todos
  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  user: User;

  // Automatically set when the Todo is created
  @CreateDateColumn()
  createdAt: Date;

  // Automatically updated when the Todo is updated
  @UpdateDateColumn()
  updatedAt: Date;
}
