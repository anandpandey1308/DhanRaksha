/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseDto } from '../common/dto/expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() expenseDto: ExpenseDto) {
    return this.expenseService.create(expenseDto);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Get('filter-by-month')
  filterByMonth(@Query('month') month: number, @Query('year') year: number) {
    return this.expenseService.filterByMonth(month, year);
  }

  @Get('category-breakdown')
  categoryBreakdown() {
    return this.expenseService.categoryBreakdown();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.expenseService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() expenseDto: ExpenseDto) {
    return this.expenseService.update(id, expenseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.expenseService.delete(id);
  }
}