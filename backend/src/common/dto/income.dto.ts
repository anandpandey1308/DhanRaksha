import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class IncomeDto {
  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsString()
  category?: string;
}
