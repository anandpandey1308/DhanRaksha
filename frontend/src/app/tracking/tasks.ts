export const projectTasks = [
  {
    category: 'Phase 0 — Project Setup',
    icon: '🔧',
    color: 'from-indigo-500 to-indigo-700',
    items: [
      // Root Monorepo
      { name: 'Monorepo Scripts Setup', done: true, description: 'npm run dev runs both backend and frontend with concurrently' },
      
      // Backend Environment & Tooling
      { name: 'Backend Environment Variables', done: false, description: '.env for MONGO_URI, JWT_SECRET, PORT=5000' },
      { name: 'Backend ESLint + Prettier', done: true, description: 'ESLint + Prettier configs for code quality' },
      { name: 'Backend Hot Reload', done: true, description: 'Hot reload functionality working' },
      
      // Frontend Environment & Tooling
      { name: 'Frontend Environment Variables', done: false, description: 'NEXT_PUBLIC_API_BASE_URL configuration' },
      { name: 'Tailwind Configuration', done: true, description: 'Tailwind configured with base styles imported' },
      { name: 'Frontend Starter Page', done: true, description: 'npm run dev shows starter page with Tailwind utilities' },
    ],
  },
  {
    category: 'Phase 1 — Authentication (MVP Security)',
    icon: '🔐',
    color: 'from-blue-500 to-blue-700',
    items: [
      // Backend Auth
      { name: 'BE-02: User Model (Mongoose)', done: true, description: 'Fields: name, email(unique), passwordHash, baseCurrency(INR), riskProfile(SAFE|VERY_SAFE)' },
      { name: 'BE-03: Auth APIs', done: true, description: 'POST /auth/signup and /auth/login with password hashing and JWT' },
      { name: 'BE-04: JWT Guard & Strategy', done: true, description: 'JwtStrategy, JwtAuthGuard, typed payload with protected routes' },
      
      // Frontend Auth
      { name: 'FE-02: HTTP Client Setup', done: false, description: 'Axios instance + interceptors (attach Authorization, 401 → /signin)' },
      { name: 'FE-03: Auth Pages', done: false, description: '/signup, /signin with React Hook Form + Zod validation' },
      { name: 'Route Protection Middleware', done: false, description: 'Next.js middleware protecting /app/** routes' },
    ],
  },
  {
    category: 'Phase 2 — Transactions (Income/Expense)',
    icon: '💰',
    color: 'from-green-500 to-green-700',
    items: [
      // Backend Transactions
      { name: 'BE-05: Transaction Model', done: true, description: 'Fields: userId, date, type(INCOME|EXPENSE), category, amount, currency(INR), note' },
      { name: 'BE-05: Transactions CRUD APIs', done: true, description: 'GET/POST/PATCH/DELETE /transactions with pagination and filtering' },
      { name: 'BE-06: Monthly Aggregates', done: true, description: 'GET /transactions/summary with totals by category + income/expense' },
      
      // Frontend Transactions
      { name: 'FE-05: Transactions UI', done: false, description: 'Table with filter bar, pagination, Add/Edit/Delete modals' },
      { name: 'FE-10: CSV Import', done: false, description: 'File parse, preview, map columns, bulk POST for transactions' },
    ],
  },
  {
    category: 'Phase 3 — Budgets',
    icon: '📊',
    color: 'from-purple-500 to-purple-700',
    items: [
      // Backend Budgets
      { name: 'BE-07: Budget Model', done: false, description: 'Fields: userId, month, year, category, planned with unique constraints' },
      { name: 'BE-07: Budgets APIs', done: false, description: 'GET/POST/PATCH /budgets with variance computation' },
      
      // Frontend Budgets
      { name: 'FE-06: Budgets UI', done: false, description: 'Grid of categories with planned amounts, inline edit, variance chips' },
    ],
  },
  {
    category: 'Phase 4 — Goals (Goal-based Saving)',
    icon: '🎯',
    color: 'from-pink-500 to-pink-700',
    items: [
      // Backend Goals
      { name: 'BE-08: Goal Model', done: false, description: 'name, targetAmt, targetCurr(INR), deadline, savedSoFar, progress tracking' },
      { name: 'BE-08: Goals APIs', done: false, description: 'GET/POST/PATCH/DELETE /goals with progress updates' },
      { name: 'BE-08: Goal Projection API', done: false, description: 'GET /goals/:id/projection for required monthly saving calculation' },
      
      // Frontend Goals
      { name: 'FE-07: Goals UI', done: false, description: 'Create/edit goal, progress add dialog, progress chart + completion ETA' },
    ],
  },
  {
    category: 'Phase 5 — Portfolio & Quotes',
    icon: '📈',
    color: 'from-cyan-500 to-cyan-700',
    items: [
      // Backend Portfolio
      { name: 'BE-09: Instrument & Holding Models', done: false, description: 'Instrument and Holding models with proper indexing' },
      { name: 'BE-10: Quotes Service', done: false, description: 'GET /quotes with adapter layer, FX rates cache, Redis/TTL cache' },
      { name: 'BE-11: Portfolio API', done: false, description: 'GET/POST/PATCH/DELETE /portfolio/holdings with live INR valuation' },
      
      // Frontend Portfolio
      { name: 'FE-08: Portfolio UI', done: false, description: 'Holdings table with qty, avg price, LTP, value (INR), P&L' },
    ],
  },
  {
    category: 'Phase 6 — Advisor (Safe/Very Safe)',
    icon: '🤖',
    color: 'from-orange-500 to-orange-700',
    items: [
      // Backend Advisor
      { name: 'BE-12: Policy Engine', done: false, description: 'Rules-first approach for Very Safe and Safe risk profiles' },
      { name: 'BE-12: Advisor Endpoint', done: false, description: 'POST /advisor/safe-suggestions with allocation and rationale' },
      
      // Frontend Advisor
      { name: 'FE-09: Advisor UI', done: false, description: 'Form + result cards with allocations, safe options, and disclaimer' },
    ],
  },
  {
    category: 'Phase 7 — Dashboard & Reports',
    icon: '📋',
    color: 'from-teal-500 to-teal-700',
    items: [
      // Backend Dashboard
      { name: 'BE-13: Dashboard API', done: false, description: 'GET /dashboard/summary with income, expense, savings, goals snapshot' },
      { name: 'Export API', done: false, description: 'GET /export/transactions.csv for data export' },
      
      // Frontend Dashboard
      { name: 'FE-04: Dashboard Page', done: false, description: 'Stat cards (Income, Expense, Savings, Net Worth), charts with responsive design' },
    ],
  },
  {
    category: 'Phase 8 — Quality, Security, DevOps',
    icon: '🛡️',
    color: 'from-red-500 to-red-700',
    items: [
      // Backend Quality & Security
      { name: 'BE-14: Input Validation', done: false, description: 'DTOs with class-validator for all write endpoints' },
      { name: 'BE-14: Rate Limiting', done: false, description: 'Rate limiting for Advisor & Quotes endpoints' },
      { name: 'BE-14: CORS Configuration', done: false, description: 'CORS setup for frontend origin in development' },
      { name: 'BE-14: Comprehensive Testing', done: false, description: 'Unit tests (services), integration tests (Mongo memory server)' },
      { name: 'BE-14: Logging System', done: true, description: 'Request logs with userId and error filtering' },
      { name: 'BE-14: Docker Setup', done: false, description: 'Dockerfile and docker-compose for local MongoDB' },
      { name: 'BE-14: CI/CD Pipeline', done: false, description: 'Lint, test, build on PR with .env.example' },
      
      // Frontend Quality & Security
      { name: 'FE-11: React Query Setup', done: false, description: 'React Query provider with error boundaries' },
      { name: 'FE-11: Toast System', done: false, description: 'Success/error toast notifications' },
      { name: 'FE-11: Accessibility', done: false, description: 'Labels, focus traps in modals, WCAG compliance' },
      { name: 'FE-12: Testing Suite', done: false, description: 'Testing Library for forms, Playwright E2E for happy paths' },
      { name: 'FE-12: Performance Optimization', done: false, description: 'Code-splitting routes, image optimization' },
    ],
  },
  {
    category: 'Phase 9 — Polishing & Nice-to-haves',
    icon: '✨',
    color: 'from-violet-500 to-violet-700',
    items: [
      // Enhanced Features
      { name: 'Recurring Transactions', done: false, description: 'Recurring entries and category manager' },
      { name: 'Advanced Search', done: false, description: 'Notes search and transaction filtering' },
      { name: 'Budget Templates', done: false, description: 'Budget templates and auto-carry forward' },
      { name: 'Goal Calculator', done: false, description: 'What-if calculator for increasing monthly savings' },
      { name: 'Portfolio CSV Import', done: false, description: 'CSV import for portfolio holdings' },
      { name: 'XIRR Calculations', done: false, description: 'Advanced portfolio performance calculations' },
      { name: 'Enhanced Advisor', done: false, description: '"Explain my plan" summary and save plan functionality' },
      { name: 'Documentation', done: false, description: 'README with run commands, Swagger API documentation' },
    ],
  },
];

export const getTaskStats = () => {
  const allItems = projectTasks.flatMap(category => category.items);
  const completed = allItems.filter(item => item.done).length;
  const total = allItems.length;
  const percentage = Math.round((completed / total) * 100);
  
  return {
    completed,
    remaining: total - completed,
    total,
    percentage,
    categories: projectTasks.length
  };
};