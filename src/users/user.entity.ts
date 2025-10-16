import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from '../todos/todo.entity';

/**
 * ---------------------------------------------------------------
 * USER ENTITY
 * ---------------------------------------------------------------
 * An Entity in TypeORM represents a table in your database.
 * Each property inside this class becomes a column in that table.
 *
 * Here, the `User` entity maps to the `user` table in PostgreSQL.
 */

@Entity() // Marks this class as a database entity (table)
export class User {
  /**
   * ---------------------------------------------------------------
   * PRIMARY KEY
   * ---------------------------------------------------------------
   * `@PrimaryGeneratedColumn('uuid')`
   * → Creates a unique identifier for every user.
   * → 'uuid' means it generates a Universally Unique ID (e.g., "4b8f8c1b-...")
   * → Safer than numeric IDs because they’re hard to guess.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * ---------------------------------------------------------------
   * EMAIL COLUMN
   * ---------------------------------------------------------------
   * `@Column({ unique: true })`
   * → Creates a unique column for the user's email address.
   * → The `unique` property ensures that no two users can register
   *   with the same email.
   */
  @Column({ unique: true })
  email: string;

  /**
   * ---------------------------------------------------------------
   * PASSWORD COLUMN
   * ---------------------------------------------------------------
   * `@Column()` creates a standard column for storing passwords.
   * ⚠️ IMPORTANT: Always store hashed passwords, never plaintext!
   * Example: hash using bcrypt before saving to the DB.
   */
  @Column()
  password: string; // hashed password (e.g., bcrypt hash)

  /**
   * ---------------------------------------------------------------
   * RELATIONSHIP WITH TODOS
   * ---------------------------------------------------------------
   * `@OneToMany` defines a one-to-many relationship:
   * - One user can have many todos.
   * - The `Todo` entity has a corresponding `@ManyToOne` back to User.
   *
   * Syntax:
   *   @OneToMany(() => TargetEntity, targetEntityProperty)
   *
   * In this case:
   *   - TargetEntity → Todo
   *   - targetEntityProperty → todo.user (from Todo entity)
   */
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  /**
   * ---------------------------------------------------------------
   * CREATED AT COLUMN
   * ---------------------------------------------------------------
   * `@CreateDateColumn()` automatically stores the timestamp
   * when the record is first created.
   * Example: "2025-10-06T17:25:32.512Z"
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * ---------------------------------------------------------------
   * UPDATED AT COLUMN
   * ---------------------------------------------------------------
   * `@UpdateDateColumn()` automatically updates its value
   * whenever the entity is modified or updated.
   * Helps track when a user's record was last changed.
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
