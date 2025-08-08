import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from './expense.schema';
import { ExpenseDto } from '../common/dto/expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
  ) {}

  async create(expenseDto: ExpenseDto): Promise<Expense> {
    const createdExpense = new this.expenseModel(expenseDto);
    return createdExpense.save();
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().exec();
  }

  async findById(id: string): Promise<Expense | null> {
    return this.expenseModel.findById(id).exec();
  }

  async update(id: string, expenseDto: ExpenseDto): Promise<Expense | null> {
    return this.expenseModel
      .findByIdAndUpdate(id, expenseDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.expenseModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async filterByMonth(month: number, year: number): Promise<Expense[]> {
    return this.expenseModel
      .find({
        date: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1),
        },
      })
      .exec();
  }

  async categoryBreakdown(): Promise<Record<string, number>> {
    const expenses = await this.expenseModel.find().exec();
    return expenses.reduce(
      (acc, expense) => {
        const category = expense.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
      },
      {} as Record<string, number>,
    );
  }
}
