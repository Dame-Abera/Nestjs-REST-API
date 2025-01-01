// filepath: /c:/Users/Owner/OneDrive/Documents/nestjs/nestjs-api-tutorial/src/user/user.controller.ts
import { Controller, Get, UseFilters, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  
  constructor() {}
  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    return "user info"
  }
}// filepath: /c:/Users/Owner/OneDrive/Documents/nestjs/nestjs-api-tutorial/src/user/user.controller.ts

