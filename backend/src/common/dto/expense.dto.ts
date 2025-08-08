import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class ExpenseDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsString()
  category?: string;
}
