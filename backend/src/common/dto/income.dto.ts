import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class IncomeDto {
  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  // Accept as ISO string; Mongoose will cast to Date
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsString()
  category?: string;
}
