import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

export interface UpdateTaskDto {
  done?: boolean;
  updatedBy?: string;
  completedAt?: Date | null;
}

export interface CreateTaskDto {
  name: string;
  description: string;
  category: string;
  phase: string;
  done?: boolean;
  order: number;
}

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().sort({ phase: 1, order: 1 }).exec();
  }

  async getTasksByPhase(phase: string): Promise<Task[]> {
    return this.taskModel.find({ phase }).sort({ order: 1 }).exec();
  }

  async updateTask(
    id: string,
    updateData: UpdateTaskDto,
  ): Promise<Task | null> {
    const updatePayload: any = { ...updateData };

    if (updateData.done !== undefined) {
      updatePayload.completedAt = updateData.done ? new Date() : null;
    }

    return this.taskModel
      .findByIdAndUpdate(id, updatePayload, { new: true })
      .exec();
  }

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(taskData);
    return task.save();
  }

  async initializeTasks(): Promise<void> {
    const existingTasks = await this.taskModel.countDocuments();
    if (existingTasks > 0) {
      return; // Tasks already initialized
    }

    const initialTasks = this.getAllProjectTasks();
    await this.taskModel.insertMany(initialTasks);
  }

  async reinitializeTasks(): Promise<void> {
    // Clear existing tasks
    await this.taskModel.deleteMany({});

    // Add all comprehensive tasks
    const allTasks = this.getAllProjectTasks();
    await this.taskModel.insertMany(allTasks);
  }

  async getTaskStats(): Promise<{
    completed: number;
    total: number;
    percentage: number;
    byPhase: Array<{
      phase: string;
      completed: number;
      total: number;
      percentage: number;
    }>;
  }> {
    const tasks = await this.getAllTasks();
    const completed = tasks.filter((task) => task.done).length;
    const total = tasks.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Group by phase
    const phaseStats = tasks.reduce(
      (acc, task) => {
        if (!acc[task.phase]) {
          acc[task.phase] = { completed: 0, total: 0 };
        }
        acc[task.phase].total++;
        if (task.done) {
          acc[task.phase].completed++;
        }
        return acc;
      },
      {} as Record<string, { completed: number; total: number }>,
    );

    const byPhase = Object.entries(phaseStats).map(([phase, stats]) => ({
      phase,
      completed: stats.completed,
      total: stats.total,
      percentage: Math.round((stats.completed / stats.total) * 100),
    }));

    return { completed, total, percentage, byPhase };
  }

  private getAllProjectTasks(): CreateTaskDto[] {
    return [
      // Phase 0 — Project Setup
      {
        name: 'Monorepo Scripts Setup',
        description:
          'npm run dev runs both backend and frontend with concurrently',
        category: 'Phase 0 — Project Setup',
        phase: 'phase-0',
        done: true,
        order: 1,
      },
      {
        name: 'Backend Environment Variables',
        description: '.env for MONGO_URI, JWT_SECRET, PORT=5000',
        category: 'Phase 0 — Project Setup',
        phase: 'phase-0',
        done: false,
        order: 2,
      },
      {
        name: 'Backend ESLint + Prettier',
        description: 'ESLint + Prettier configs for code quality',
        category: 'Phase 0 — Project Setup',
        phase: 'phase-0',
        done: true,
        order: 3,
      },
      {
        name: 'Backend Hot Reload',
        description: 'Hot reload functionality working',
        category: 'Phase 0 — Project Setup',
        phase: 'phase-0',
        done: true,
        order: 4,
      },
      {
        name: 'Frontend Environment Variables',
        description: 'NEXT_PUBLIC_API_BASE_URL configuration',
        category: 'Phase 0 — Project Setup',
        phase: 'phase-0',
        done: true,
        order: 5,
      },
      {
        name: 'Tailwind Configuration',
        description: 'Tailwind configured with base styles imported',
        category: 'Phase 0 — Project Setup',
        phase: 'phase-0',
        done: true,
        order: 6,
      },
      {
        name: 'Frontend Starter Page',
        description: 'npm run dev shows starter page with Tailwind utilities',
        category: 'Phase 0 — Project Setup',
        phase: 'phase-0',
        done: true,
        order: 7,
      },

      // Phase 1 — Authentication (MVP Security)
      {
        name: 'BE-02: User Model (Mongoose)',
        description:
          'Fields: name, email(unique), passwordHash, baseCurrency(INR), riskProfile(SAFE|VERY_SAFE)',
        category: 'Phase 1 — Authentication (MVP Security)',
        phase: 'phase-1',
        done: true,
        order: 1,
      },
      {
        name: 'BE-03: Auth APIs',
        description:
          'POST /auth/signup and /auth/login with password hashing and JWT',
        category: 'Phase 1 — Authentication (MVP Security)',
        phase: 'phase-1',
        done: true,
        order: 2,
      },
      {
        name: 'BE-04: JWT Guard & Strategy',
        description:
          'JwtStrategy, JwtAuthGuard, typed payload with protected routes',
        category: 'Phase 1 — Authentication (MVP Security)',
        phase: 'phase-1',
        done: true,
        order: 3,
      },
      {
        name: 'FE-02: HTTP Client Setup',
        description:
          'Axios instance + interceptors (attach Authorization, 401 → /signin)',
        category: 'Phase 1 — Authentication (MVP Security)',
        phase: 'phase-1',
        done: false,
        order: 4,
      },
      {
        name: 'FE-03: Auth Pages',
        description: '/signup, /signin with React Hook Form + Zod validation',
        category: 'Phase 1 — Authentication (MVP Security)',
        phase: 'phase-1',
        done: false,
        order: 5,
      },
      {
        name: 'Route Protection Middleware',
        description: 'Next.js middleware protecting /app/** routes',
        category: 'Phase 1 — Authentication (MVP Security)',
        phase: 'phase-1',
        done: false,
        order: 6,
      },

      // Phase 2 — Transactions (Income/Expense)
      {
        name: 'BE-05: Transaction Model',
        description:
          'Fields: userId, date, type(INCOME|EXPENSE), category, amount, currency(INR), note',
        category: 'Phase 2 — Transactions (Income/Expense)',
        phase: 'phase-2',
        done: true,
        order: 1,
      },
      {
        name: 'BE-05: Transactions CRUD APIs',
        description:
          'GET/POST/PATCH/DELETE /transactions with pagination and filtering',
        category: 'Phase 2 — Transactions (Income/Expense)',
        phase: 'phase-2',
        done: true,
        order: 2,
      },
      {
        name: 'BE-06: Monthly Aggregates',
        description:
          'GET /transactions/summary with totals by category + income/expense',
        category: 'Phase 2 — Transactions (Income/Expense)',
        phase: 'phase-2',
        done: true,
        order: 3,
      },
      {
        name: 'FE-05: Transactions UI',
        description:
          'Table with filter bar, pagination, Add/Edit/Delete modals',
        category: 'Phase 2 — Transactions (Income/Expense)',
        phase: 'phase-2',
        done: false,
        order: 4,
      },
      {
        name: 'FE-10: CSV Import',
        description:
          'File parse, preview, map columns, bulk POST for transactions',
        category: 'Phase 2 — Transactions (Income/Expense)',
        phase: 'phase-2',
        done: false,
        order: 5,
      },

      // Phase 3 — Budgets
      {
        name: 'BE-07: Budget Model',
        description:
          'Fields: userId, month, year, category, planned with unique constraints',
        category: 'Phase 3 — Budgets',
        phase: 'phase-3',
        done: false,
        order: 1,
      },
      {
        name: 'BE-07: Budgets APIs',
        description: 'GET/POST/PATCH /budgets with variance computation',
        category: 'Phase 3 — Budgets',
        phase: 'phase-3',
        done: false,
        order: 2,
      },
      {
        name: 'FE-06: Budgets UI',
        description:
          'Grid of categories with planned amounts, inline edit, variance chips',
        category: 'Phase 3 — Budgets',
        phase: 'phase-3',
        done: false,
        order: 3,
      },

      // Phase 4 — Goals (Goal-based Saving)
      {
        name: 'BE-08: Goal Model',
        description:
          'name, targetAmt, targetCurr(INR), deadline, savedSoFar, progress tracking',
        category: 'Phase 4 — Goals (Goal-based Saving)',
        phase: 'phase-4',
        done: false,
        order: 1,
      },
      {
        name: 'BE-08: Goals APIs',
        description: 'GET/POST/PATCH/DELETE /goals with progress updates',
        category: 'Phase 4 — Goals (Goal-based Saving)',
        phase: 'phase-4',
        done: false,
        order: 2,
      },
      {
        name: 'BE-08: Goal Projection API',
        description:
          'GET /goals/:id/projection for required monthly saving calculation',
        category: 'Phase 4 — Goals (Goal-based Saving)',
        phase: 'phase-4',
        done: false,
        order: 3,
      },
      {
        name: 'FE-07: Goals UI',
        description:
          'Create/edit goal, progress add dialog, progress chart + completion ETA',
        category: 'Phase 4 — Goals (Goal-based Saving)',
        phase: 'phase-4',
        done: false,
        order: 4,
      },

      // Phase 5 — Portfolio & Quotes
      {
        name: 'BE-09: Instrument & Holding Models',
        description: 'Instrument and Holding models with proper indexing',
        category: 'Phase 5 — Portfolio & Quotes',
        phase: 'phase-5',
        done: false,
        order: 1,
      },
      {
        name: 'BE-10: Quotes Service',
        description:
          'GET /quotes with adapter layer, FX rates cache, Redis/TTL cache',
        category: 'Phase 5 — Portfolio & Quotes',
        phase: 'phase-5',
        done: false,
        order: 2,
      },
      {
        name: 'BE-11: Portfolio API',
        description:
          'GET/POST/PATCH/DELETE /portfolio/holdings with live INR valuation',
        category: 'Phase 5 — Portfolio & Quotes',
        phase: 'phase-5',
        done: false,
        order: 3,
      },
      {
        name: 'FE-08: Portfolio UI',
        description:
          'Holdings table with qty, avg price, LTP, value (INR), P&L',
        category: 'Phase 5 — Portfolio & Quotes',
        phase: 'phase-5',
        done: false,
        order: 4,
      },

      // Phase 6 — Advisor (Safe/Very Safe)
      {
        name: 'BE-12: Policy Engine',
        description:
          'Rules-first approach for Very Safe and Safe risk profiles',
        category: 'Phase 6 — Advisor (Safe/Very Safe)',
        phase: 'phase-6',
        done: false,
        order: 1,
      },
      {
        name: 'BE-12: Advisor Endpoint',
        description:
          'POST /advisor/safe-suggestions with allocation and rationale',
        category: 'Phase 6 — Advisor (Safe/Very Safe)',
        phase: 'phase-6',
        done: false,
        order: 2,
      },
      {
        name: 'FE-09: Advisor UI',
        description:
          'Form + result cards with allocations, safe options, and disclaimer',
        category: 'Phase 6 — Advisor (Safe/Very Safe)',
        phase: 'phase-6',
        done: false,
        order: 3,
      },

      // Phase 7 — Dashboard & Reports
      {
        name: 'BE-13: Dashboard API',
        description:
          'GET /dashboard/summary with income, expense, savings, goals snapshot',
        category: 'Phase 7 — Dashboard & Reports',
        phase: 'phase-7',
        done: false,
        order: 1,
      },
      {
        name: 'Export API',
        description: 'GET /export/transactions.csv for data export',
        category: 'Phase 7 — Dashboard & Reports',
        phase: 'phase-7',
        done: false,
        order: 2,
      },
      {
        name: 'FE-04: Dashboard Page',
        description:
          'Stat cards (Income, Expense, Savings, Net Worth), charts with responsive design',
        category: 'Phase 7 — Dashboard & Reports',
        phase: 'phase-7',
        done: false,
        order: 3,
      },

      // Phase 8 — Quality, Security, DevOps
      {
        name: 'BE-14: Input Validation',
        description: 'DTOs with class-validator for all write endpoints',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: false,
        order: 1,
      },
      {
        name: 'BE-14: Rate Limiting',
        description: 'Rate limiting for Advisor & Quotes endpoints',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: false,
        order: 2,
      },
      {
        name: 'BE-14: CORS Configuration',
        description: 'CORS setup for frontend origin in development',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: true,
        order: 3,
      },
      {
        name: 'BE-14: Comprehensive Testing',
        description:
          'Unit tests (services), integration tests (Mongo memory server)',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: false,
        order: 4,
      },
      {
        name: 'BE-14: Logging System',
        description: 'Request logs with userId and error filtering',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: true,
        order: 5,
      },
      {
        name: 'BE-14: Docker Setup',
        description: 'Dockerfile and docker-compose for local MongoDB',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: false,
        order: 6,
      },
      {
        name: 'BE-14: CI/CD Pipeline',
        description: 'Lint, test, build on PR with .env.example',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: false,
        order: 7,
      },
      {
        name: 'FE-11: React Query Setup',
        description: 'React Query provider with error boundaries',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: false,
        order: 8,
      },
      {
        name: 'FE-11: Toast System',
        description: 'Success/error toast notifications',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: false,
        order: 9,
      },
      {
        name: 'FE-11: Accessibility',
        description: 'Labels, focus traps in modals, WCAG compliance',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: false,
        order: 10,
      },
      {
        name: 'FE-12: Testing Suite',
        description:
          'Testing Library for forms, Playwright E2E for happy paths',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: false,
        order: 11,
      },
      {
        name: 'FE-12: Performance Optimization',
        description: 'Code-splitting routes, image optimization',
        category: 'Phase 8 — Quality, Security, DevOps',
        phase: 'phase-8',
        done: false,
        order: 12,
      },

      // Phase 9 — Polishing & Nice-to-haves
      {
        name: 'Recurring Transactions',
        description: 'Recurring entries and category manager',
        category: 'Phase 9 — Polishing & Nice-to-haves',
        phase: 'phase-9',
        done: false,
        order: 1,
      },
      {
        name: 'Advanced Search',
        description: 'Notes search and transaction filtering',
        category: 'Phase 9 — Polishing & Nice-to-haves',
        phase: 'phase-9',
        done: false,
        order: 2,
      },
      {
        name: 'Budget Templates',
        description: 'Budget templates and auto-carry forward',
        category: 'Phase 9 — Polishing & Nice-to-haves',
        phase: 'phase-9',
        done: false,
        order: 3,
      },
      {
        name: 'Goal Calculator',
        description: 'What-if calculator for increasing monthly savings',
        category: 'Phase 9 — Polishing & Nice-to-haves',
        phase: 'phase-9',
        done: false,
        order: 4,
      },
      {
        name: 'Portfolio CSV Import',
        description: 'CSV import for portfolio holdings',
        category: 'Phase 9 — Polishing & Nice-to-haves',
        phase: 'phase-9',
        done: false,
        order: 5,
      },
      {
        name: 'XIRR Calculations',
        description: 'Advanced portfolio performance calculations',
        category: 'Phase 9 — Polishing & Nice-to-haves',
        phase: 'phase-9',
        done: false,
        order: 6,
      },
      {
        name: 'Enhanced Advisor',
        description: '"Explain my plan" summary and save plan functionality',
        category: 'Phase 9 — Polishing & Nice-to-haves',
        phase: 'phase-9',
        done: false,
        order: 7,
      },
      {
        name: 'Documentation',
        description: 'README with run commands, Swagger API documentation',
        category: 'Phase 9 — Polishing & Nice-to-haves',
        phase: 'phase-9',
        done: false,
        order: 8,
      },
    ];
  }

  // Keep the original method for backward compatibility
  private getInitialTasks(): CreateTaskDto[] {
    return this.getAllProjectTasks().slice(0, 17); // First 17 tasks for basic initialization
  }
}
