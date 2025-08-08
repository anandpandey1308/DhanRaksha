import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).select('-passwordHash');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<UserDocument> {
    this.logger.log(
      `Updating user with ID: ${userId} with data: ${JSON.stringify(updateData)}`,
    );
    console.log('Preparing to update user with ID:', userId);
    console.log('Update data:', updateData);
    const user = await this.userModel
      .findByIdAndUpdate(userId, updateData, {
        new: true,
      })
      .select('-passwordHash');
    if (!user) {
      console.log('User not found for ID:', userId);
      throw new NotFoundException('User not found');
    }
    console.log('Updated user document:', user);
    this.logger.log(`Updated user: ${JSON.stringify(user)}`);
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUserByEmail(
    email: string,
    updateData: Partial<User>,
  ): Promise<UserDocument> {
    console.log('Updating user with email:', email, 'with data:', updateData);
    const user = await this.userModel
      .findOneAndUpdate({ email }, updateData, {
        new: true,
      })
      .select('-passwordHash');
    if (!user) {
      console.log('User not found for email:', email);
      throw new NotFoundException('User not found');
    }
    console.log('Updated user document:', user);
    return user;
  }
}
