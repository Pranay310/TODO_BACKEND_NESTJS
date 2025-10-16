import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * ------------------------------------------------------------------------
 * main.ts — Application Entry Point
 * ------------------------------------------------------------------------
 * This file is the starting point of every NestJS application.
 *
 * ✅ It’s responsible for:
 *  1. Bootstrapping (starting) the application.
 *  2. Creating an instance of the NestJS app using `AppModule`.
 *  3. Setting up global configurations (like validation, middleware, etc.).
 *  4. Starting the HTTP server and listening on a specific port.
 *
 * When you run `npm run start` or `yarn start`, NestJS executes this file.
 */

async function bootstrap() {
  /**
   * ---------------------------------------------------------------
   * CREATE THE NEST APPLICATION
   * ---------------------------------------------------------------
   * `NestFactory.create(AppModule)` creates the entire NestJS application
   * using the root module (`AppModule`).
   *
   * - AppModule defines which other modules, controllers, and services
   *   will be part of this application.
   * - Think of this as "building the full application container."
   */
  const app = await NestFactory.create(AppModule);

  /**
   * ---------------------------------------------------------------
   * USE GLOBAL VALIDATION PIPE
   * ---------------------------------------------------------------
   * ValidationPipe is a built-in NestJS feature that automatically
   * validates incoming requests using class-validator decorators.
   *
   * ✅ What it does:
   * - Ensures the data you receive (from `@Body()`, `@Query()`, etc.)
   *   matches the validation rules defined in your DTOs (Data Transfer Objects).
   * - Prevents unwanted or unsafe data from reaching your controllers.
   *
   * ✅ Options Explained:
   * - `whitelist: true`
   *     → Automatically removes any extra/unexpected fields
   *       that are not defined in your DTO.
   *     → Helps secure your API from unnecessary or malicious inputs.
   *
   * Example:
   * ---------------------------------------------------------------
   * Suppose your DTO looks like:
   *   class CreateUserDto {
   *     @IsString()
   *     name: string;
   *   }
   *
   * Request body received:
   *   { "name": "Pranay", "role": "admin" }
   *
   * With `whitelist: true`, NestJS automatically removes `role`
   * before passing the data to your controller.
   *
   * Without it, `role` would still be accessible — which is unsafe.
   * ---------------------------------------------------------------
   *
   * You can also add more options if needed:
   * - `forbidNonWhitelisted: true` → throws an error if extra fields exist.
   * - `transform: true` → automatically convert incoming strings to correct types.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ✅ Removes extra fields from request data
      // forbidNonWhitelisted: true, // ❌ Uncomment to throw error for extra fields
      // transform: true, // 🔄 Automatically transform payloads into DTO instances
    }),
  );

  /**
   * ---------------------------------------------------------------
   * START THE SERVER
   * ---------------------------------------------------------------
   * `app.listen(3000)` starts an HTTP server on port 3000.
   *
   * Once started, you can open:
   *   👉 http://localhost:3000
   *
   * You can also change the port dynamically using environment variables:
   *   await app.listen(process.env.PORT || 3000);
   */
  await app.listen(3000);

  /**
   * ---------------------------------------------------------------
   * LOG A STARTUP MESSAGE
   * ---------------------------------------------------------------
   * This console message confirms that your server has successfully started
   * and is now ready to accept requests.
   */
  console.log('🚀 Server started on: http://localhost:3000');
}

/**
 * ---------------------------------------------------------------
 * BOOTSTRAP THE APPLICATION
 * ---------------------------------------------------------------
 * Finally, call the `bootstrap()` function to run the setup defined above.
 * This officially starts your NestJS application.
 */
bootstrap();
