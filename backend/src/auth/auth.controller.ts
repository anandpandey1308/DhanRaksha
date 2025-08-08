import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }

  @Post('send-verification-email')
  async sendVerificationEmail(@Body('email') email: string) {
    const result = await this.authService.sendVerificationEmail(email);
    return result;
  }

  @Post('verify-email')
  async verifyEmail(@Headers('Authorization') authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    const result = await this.authService.verifyEmail(token);
    return result;
  }
}
