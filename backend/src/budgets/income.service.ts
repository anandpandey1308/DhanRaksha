import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Income, IncomeDocument } from './income.schema';
import { IncomeDto } from '../common/dto/income.dto';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income.name) private incomeModel: Model<IncomeDocument>,
  ) {}

  async create(incomeDto: IncomeDto): Promise<Income> {
    const createdIncome = new this.incomeModel(incomeDto);
    return createdIncome.save();
  }

  async findAll(): Promise<Income[]> {
    return this.incomeModel.find().exec();
  }

  async findById(id: string): Promise<Income | null> {
    return this.incomeModel.findById(id).exec();
  }

  async update(id: string, incomeDto: IncomeDto): Promise<Income | null> {
    return this.incomeModel
      .findByIdAndUpdate(id, incomeDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.incomeModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async filterByMonth(month: number, year: number): Promise<Income[]> {
    return this.incomeModel
      .find({
        date: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1),
        },
      })
      .exec();
  }
}
