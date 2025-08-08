/* eslint-disable @typescript-eslint/require-await */
import {
  Controller,
  Get,
  Patch,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import type { Request } from 'express';
import { JwtPayload } from '../auth/jwt.strategy';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getProfile(@Req() req: Request & { user?: JwtPayload }) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('Invalid or missing user in request');
    }
    const userId = req.user.sub;
    return this.userService.getUserById(userId);
  }

  @Patch('me')
  async updateProfile(
    @Req() req: Request & { user?: JwtPayload },
    @Body() updateData: Partial<{ name: string; baseCurrency: string }>,
  ) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('Invalid or missing user in request');
    }
    const userId = req.user.sub;
    return this.userService.updateUser(userId, updateData);
  }

  @Patch('test-update-token')
  async testUpdateToken(
    @Body('email') email: string,
    @Body('token') token: string,
  ) {
    return this.userService.updateUserByEmail(email, {
      emailVerificationToken: token,
    });
  }

  @Get('admin')
  @Roles('admin')
  async getAdminData() {
    return { message: 'This is admin-only data' };
  }

  @Get('user')
  @Roles('user')
  async getUserData() {
    return { message: 'This is user-only data' };
  }
}
