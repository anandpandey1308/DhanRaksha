import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: 'INR' })
  baseCurrency: string;

  @Prop({ enum: ['VERY_SAFE', 'SAFE'], default: 'SAFE' })
  riskProfile: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  emailVerificationToken?: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
