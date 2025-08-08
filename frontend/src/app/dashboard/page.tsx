'use client';

import { useAuth } from '../../contexts/auth-context';
import { ProtectedRoute } from '../../components/protected-route';
import { useState, useEffect } from 'react';
import { theme } from '../../../theme';
import { financeService } from '../../lib/finance-service';

import DashboardHeader from '../../components/dashboard/dashboard-header';
import FinancialOverview from '../../components/dashboard/financial-overview';
import RecentTransactions from '../../components/dashboard/recent-transactions';
import BudgetProgress from '../../components/dashboard/budget-progress';
import QuickActions from '../../components/dashboard/quick-actions';
import ExpenseChart from '../../components/dashboard/expense-chart';
import IncomeVsExpenses from '../../components/dashboard/income-vs-expenses';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [financialData, setFinancialData] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savings: 0,
    budgetUsed: 0,
    recentTransactions: [] as Transaction[],
    loading: true,
    error: null as string | null
  });

  useEffect(() => {
    const loadFinancialData = async () => {
      try {
        setFinancialData(prev => ({ ...prev, loading: true, error: null }));
        
        const summary = await financeService.getFinancialSummary();
        
        // Calculate total balance (this is simplified - in real app you'd have account balances)
        const totalBalance = summary.savings > 0 ? summary.totalIncome * 3 : summary.totalIncome * 2;
        
        setFinancialData({
          totalBalance,
          monthlyIncome: summary.totalIncome,
          monthlyExpenses: summary.totalExpenses,
          savings: summary.savings,
          budgetUsed: summary.totalIncome > 0 ? Math.round((summary.totalExpenses / summary.totalIncome) * 100) : 0,
          recentTransactions: summary.transactions.slice(0, 5) as Transaction[],
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Failed to load financial data:', error);
        setFinancialData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load financial data. Please try again.'
        }));
      }
    };

    loadFinancialData();
  }, []);

  if (financialData.loading) {
    return (
      <ProtectedRoute requireAuth={true}>
        <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh', fontFamily: theme.typography.fontFamily }}>
          <DashboardHeader user={user} />
          <main className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div 
                  className="animate-spin rounded-full h-12 w-12 border-b-2"
                  style={{ borderColor: theme.colors.primary }}
                />
                <p 
                  className="text-sm font-medium"
                  style={{ 
                    color: theme.colors.textSecondary,
                    fontFamily: theme.typography.fontFamily 
                  }}
                >
                  Loading your financial data...
                </p>
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAuth={true}>
      <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh', fontFamily: theme.typography.fontFamily }}>
        {/* Dashboard Header */}
        <DashboardHeader user={user} />
        
        {/* Main Dashboard Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ 
                color: theme.colors.textPrimary,
                fontWeight: theme.typography.fontWeight.bold 
              }}
            >
              Welcome back, {user?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p 
              className="text-lg"
              style={{ 
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.lg 
              }}
            >
              Here&apos;s your financial overview for {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Error Message */}
          {financialData.error && (
            <div 
              className="mb-6 p-4 rounded-md text-sm"
              style={{ 
                backgroundColor: '#FEF2F2',
                color: theme.colors.loss,
                border: `1px solid ${theme.colors.loss}20`,
                borderRadius: theme.radii.md 
              }}
            >
              {financialData.error}
            </div>
          )}

          {/* Financial Overview Cards */}
          <FinancialOverview data={financialData} />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              <IncomeVsExpenses />
              <ExpenseChart />
            </div>

            {/* Right Column - Widgets */}
            <div className="space-y-6">
              <QuickActions />
              <BudgetProgress data={financialData} />
              <RecentTransactions transactions={financialData.recentTransactions} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}