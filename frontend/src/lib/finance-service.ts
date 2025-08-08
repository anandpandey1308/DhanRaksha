import httpClient from './http-client';

// Income interfaces
export interface Income {
  _id: string;
  source: string;
  amount: number;
  date: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIncomeDto {
  source: string;
  amount: number;
  date: string;
  category: string;
}

// Expense interfaces
export interface Expense {
  _id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseDto {
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  count: number;
}

class FinanceService {
  // Income methods
  async createIncome(data: CreateIncomeDto): Promise<Income> {
    const response = await httpClient.post<Income>('/income', data);
    return response.data;
  }

  async getAllIncomes(): Promise<Income[]> {
    const response = await httpClient.get<Income[]>('/income');
    return response.data;
  }

  async getIncomeById(id: string): Promise<Income> {
    const response = await httpClient.get<Income>(`/income/${id}`);
    return response.data;
  }

  async updateIncome(id: string, data: CreateIncomeDto): Promise<Income> {
    const response = await httpClient.put<Income>(`/income/${id}`, data);
    return response.data;
  }

  async deleteIncome(id: string): Promise<void> {
    await httpClient.delete(`/income/${id}`);
  }

  async getIncomesByMonth(month: number, year: number): Promise<Income[]> {
    const response = await httpClient.get<Income[]>(`/income/filter-by-month?month=${month}&year=${year}`);
    return response.data;
  }

  // Expense methods
  async createExpense(data: CreateExpenseDto): Promise<Expense> {
    const response = await httpClient.post<Expense>('/expense', data);
    return response.data;
  }

  async getAllExpenses(): Promise<Expense[]> {
    const response = await httpClient.get<Expense[]>('/expense');
    return response.data;
  }

  async getExpenseById(id: string): Promise<Expense> {
    const response = await httpClient.get<Expense>(`/expense/${id}`);
    return response.data;
  }

  async updateExpense(id: string, data: CreateExpenseDto): Promise<Expense> {
    const response = await httpClient.put<Expense>(`/expense/${id}`, data);
    return response.data;
  }

  async deleteExpense(id: string): Promise<void> {
    await httpClient.delete(`/expense/${id}`);
  }

  async getExpensesByMonth(month: number, year: number): Promise<Expense[]> {
    const response = await httpClient.get<Expense[]>(`/expense/filter-by-month?month=${month}&year=${year}`);
    return response.data;
  }

  async getExpenseCategoryBreakdown(): Promise<CategoryBreakdown[]> {
    const response = await httpClient.get<CategoryBreakdown[]>('/expense/category-breakdown');
    return response.data;
  }

  // Combined methods for dashboard
  async getFinancialSummary(month?: number, year?: number) {
    const currentMonth = month || new Date().getMonth() + 1;
    const currentYear = year || new Date().getFullYear();

    const [incomes, expenses] = await Promise.all([
      this.getIncomesByMonth(currentMonth, currentYear),
      this.getExpensesByMonth(currentMonth, currentYear)
    ]);

    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const savings = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      savings,
      incomes,
      expenses,
      transactions: [
        ...incomes.map(income => ({
          id: income._id,
          description: income.source,
          amount: income.amount,
          date: income.date,
          category: income.category,
          type: 'income' as const
        })),
        ...expenses.map(expense => ({
          id: expense._id,
          description: expense.description,
          amount: -expense.amount, // Negative for expenses
          date: expense.date,
          category: expense.category,
          type: 'expense' as const
        }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    };
  }
}

export const financeService = new FinanceService();