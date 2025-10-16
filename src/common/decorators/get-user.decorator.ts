// Import necessary NestJS functions for creating custom decorators
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Define a custom decorator named "GetUser"
export const GetUser = createParamDecorator(
  // This function is called when the decorator is used in a controller
  (data, ctx: ExecutionContext) => {
    // Get the request object from the execution context
    const req = ctx.switchToHttp().getRequest();

    // Return the "user" property that was attached by JwtStrategy.validate
    // This allows routes to access the authenticated user easily
    return req.user;
  },
);
