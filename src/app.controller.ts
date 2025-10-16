import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('check-env')
  // getEnv() {
  //   const jwtSecret = this.configService.get<string>('JWT_SECRET');
  //   const dbHost = this.configService.get<string>('POSTGRES_HOST');
  //   return {
  //     JWT_SECRET: jwtSecret,
  //     POSTGRES_HOST: dbHost,
  //   };
  // }
}
