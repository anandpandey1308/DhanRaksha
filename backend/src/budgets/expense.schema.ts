import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Expense {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop()
  category?: string;

  // New: owner of this expense
  @Prop({ type: Types.ObjectId, ref: 'User', index: true, required: true })
  userId: Types.ObjectId;
}

export type ExpenseDocument = Expense & Document;
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
