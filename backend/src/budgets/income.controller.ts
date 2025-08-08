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
  constructor(private readonly incomeService: IncomeService) {}

  @Get('test')
  test() {
    return { message: 'Income controller is working!' };
  }

  @Get('filter-by-month')
  filterByMonth(@Query('month') month: number, @Query('year') year: number) {
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
