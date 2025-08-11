import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Income {
  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop()
  category?: string;

  // New: owner of this income
  @Prop({ type: Types.ObjectId, ref: 'User', index: true, required: true })
  userId: Types.ObjectId;
}

export type IncomeDocument = Income & Document;
export const IncomeSchema = SchemaFactory.createForClass(Income);
