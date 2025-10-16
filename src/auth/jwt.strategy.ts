import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Marks this class as injectable so NestJS can use it in the dependency system
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    // ✅ Retrieve JWT secret from .env using ConfigService
    const secret = config.get<string>('JWT_SECRET');

    // ❌ Throw error early if JWT_SECRET is missing
    if (!secret) throw new Error('JWT_SECRET is not defined');

    // 🧩 Pass configuration to the base PassportStrategy class
    super({
      // Extract JWT token from Authorization header (Bearer <token>)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Reject expired tokens automatically
      ignoreExpiration: false,

      // Secret key used to verify JWT signature
      secretOrKey: secret,
    });
  }

  // ✅ validate() is automatically called once the token is verified
  async validate(payload: any) {
    // payload = { sub: userId, email }  (from AuthService when signing)
    // This return value gets attached to req.user in controllers
    return { userId: payload.sub, email: payload.email };
  }
}
