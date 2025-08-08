import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeDto } from '../common/dto/income.dto';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {
    console.log('IncomeController instantiated');
  }

  @Get('test')
  testRoute() {
    console.log('Test route in IncomeController executed');
    return { message: 'Test route executed' };
  }

  @Get('filter-by-month')
  filterByMonth(@Query('month') month: number, @Query('year') year: number) {
    console.log(
      'filterByMonth route matched with month:',
      month,
      'and year:',
      year,
    );
    return this.incomeService.filterByMonth(month, year);
  }

  @Post()
  create(@Body() incomeDto: IncomeDto) {
    return this.incomeService.create(incomeDto);
  }

  @Get()
  findAll() {
    return this.incomeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.incomeService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() incomeDto: IncomeDto) {
    return this.incomeService.update(id, incomeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.incomeService.delete(id);
  }
}
