import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { User, UserSchema } from './users/user.schema';
import { IncomeController } from './budgets/income.controller';
import { IncomeService } from './budgets/income.service';
import { Income, IncomeSchema } from './budgets/income.schema';
import { ExpenseController } from './budgets/expense.controller';
import { ExpenseService } from './budgets/expense.service';
import { Expense, ExpenseSchema } from './budgets/expense.schema';
import { Task, TaskSchema } from './budgets/task.schema';
import { TaskController } from './budgets/task.controller';
import { TaskService } from './budgets/task.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ useFactory: mongoConfig }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Income.name, schema: IncomeSchema }]),
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    AuthModule,
  ],
  controllers: [
    UserController,
    IncomeController,
    ExpenseController,
    TaskController,
  ],
  providers: [UserService, IncomeService, ExpenseService, TaskService],
})
export class AppModule {}
