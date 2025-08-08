import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) throw new BadRequestException('Email already registered');

    const hash = await bcrypt.hash(dto.password, 10);
    const newUser = new this.userModel({
      name: dto.name,
      email: dto.email,
      passwordHash: hash,
    });
    await newUser.save();

    return { message: 'Signup successful' };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async requestPasswordReset(email: string): Promise<{ message: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const token = this.jwtService.sign({ sub: user._id }, { expiresIn: '1h' });
    // Send token via email (integration pending)
    return { message: 'Password reset email sent' };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const payload = this.jwtService.verify<{ sub: string }>(token);
    const user = await this.userService.getUserById(payload.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updateUser(user._id, {
      passwordHash: hashedPassword,
    });
    return { message: 'Password reset successful' };
  }

  async sendVerificationEmail(email: string): Promise<{ message: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isEmailVerified) {
      throw new BadRequestException('Email is already verified');
    }
    const token = this.jwtService.sign(
      { sub: user._id, email: user.email },
      { expiresIn: '1d' },
    );
    console.log('Generated valid JWT token:', token);
    await this.userService.updateUser(user._id, {
      emailVerificationToken: token,
    });
    console.log('Token saved in database.');
    return { message: 'Verification email sent' };
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    console.log('Received token:', token);
    const payload = this.jwtService.verify<{ sub: string }>(token);
    const user = await this.userService.getUserById(payload.sub);
    if (!user) {
      console.log('User not found for token payload:', payload);
      throw new BadRequestException('Invalid or expired token');
    }
    console.log('Stored emailVerificationToken:', user.emailVerificationToken);
    if (user.emailVerificationToken !== token) {
      console.log('Token mismatch:', {
        received: token,
        stored: user.emailVerificationToken,
      });
      throw new BadRequestException('Invalid or expired token');
    }
    await this.userService.updateUser(user._id, {
      isEmailVerified: true,
      emailVerificationToken: undefined,
    });
    return { message: 'Email verified successfully' };
  }
}
