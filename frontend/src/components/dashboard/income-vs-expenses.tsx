'use client';

import { useState, useEffect } from 'react';
import { theme } from '../../../theme';
import { financeService } from '../../lib/finance-service';

export default function IncomeVsExpenses() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMonthlyData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get data for last 6 months
        const months = [];
        const currentDate = new Date();
        
        for (let i = 5; i >= 0; i--) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          
          const [incomes, expenses] = await Promise.all([
            financeService.getIncomesByMonth(month, year),
            financeService.getExpensesByMonth(month, year)
          ]);

          const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
          const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

          months.push({
            month: date.toLocaleDateString('en-IN', { month: 'short' }),
            income: totalIncome,
            expenses: totalExpenses
          });
        }

        setMonthlyData(months);
      } catch (err) {
        console.error('Failed to load monthly data:', err);
        setError('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };

    loadMonthlyData();
  }, []);

  const maxAmount = monthlyData.length > 0 ? Math.max(...monthlyData.flatMap(d => [d.income, d.expenses])) : 1;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div
        className="p-6 rounded-lg shadow-md"
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.lg,
          boxShadow: theme.shadows.md
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            color: theme.colors.textPrimary,
            fontWeight: theme.typography.fontWeight.semibold,
            fontSize: theme.typography.fontSize.lg
          }}
        >
          Income vs Expenses
        </h3>
        <div className="flex items-center justify-center h-40">
          <div 
            className="animate-spin rounded-full h-8 w-8 border-b-2"
            style={{ borderColor: theme.colors.primary }}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-6 rounded-lg shadow-md"
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.lg,
          boxShadow: theme.shadows.md
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            color: theme.colors.textPrimary,
            fontWeight: theme.typography.fontWeight.semibold,
            fontSize: theme.typography.fontSize.lg
          }}
        >
          Income vs Expenses
        </h3>
        <div className="text-center text-sm" style={{ color: theme.colors.loss }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-lg shadow-md"
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.lg,
        boxShadow: theme.shadows.md
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-lg font-semibold"
          style={{
            color: theme.colors.textPrimary,
            fontWeight: theme.typography.fontWeight.semibold,
            fontSize: theme.typography.fontSize.lg
          }}
        >
          Income vs Expenses
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.colors.profit }}
            />
            <span
              className="text-sm"
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.sm
              }}
            >
              Income
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.colors.loss }}
            />
            <span
              className="text-sm"
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.sm
              }}
            >
              Expenses
            </span>
          </div>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="space-y-4">
        {monthlyData.map((data, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium w-12"
                style={{
                  color: theme.colors.textPrimary,
                  fontWeight: theme.typography.fontWeight.medium,
                  fontSize: theme.typography.fontSize.sm
                }}
              >
                {data.month}
              </span>
              <div className="flex-1 mx-4 space-y-1">
                {/* Income Bar */}
                <div className="flex items-center space-x-2">
                  <div
                    className="h-6 rounded transition-all duration-300 flex items-center justify-end pr-2"
                    style={{
                      width: `${maxAmount > 0 ? (data.income / maxAmount) * 100 : 0}%`,
                      backgroundColor: theme.colors.profit,
                      borderRadius: theme.radii.sm,
                      minWidth: data.income > 0 ? '60px' : '0px'
                    }}
                  >
                    {data.income > 0 && (
                      <span
                        className="text-xs font-medium text-white"
                        style={{ fontSize: theme.typography.fontSize.xs }}
                      >
                        {formatCurrency(data.income)}
                      </span>
                    )}
                  </div>
                </div>
                {/* Expenses Bar */}
                <div className="flex items-center space-x-2">
                  <div
                    className="h-6 rounded transition-all duration-300 flex items-center justify-end pr-2"
                    style={{
                      width: `${maxAmount > 0 ? (data.expenses / maxAmount) * 100 : 0}%`,
                      backgroundColor: theme.colors.loss,
                      borderRadius: theme.radii.sm,
                      minWidth: data.expenses > 0 ? '60px' : '0px'
                    }}
                  >
                    {data.expenses > 0 && (
                      <span
                        className="text-xs font-medium text-white"
                        style={{ fontSize: theme.typography.fontSize.xs }}
                      >
                        {formatCurrency(data.expenses)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-20 text-right">
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: data.income - data.expenses > 0 ? theme.colors.profit : theme.colors.loss,
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontSize: theme.typography.fontSize.sm
                  }}
                >
                  {data.income - data.expenses > 0 ? '+' : ''}{formatCurrency(data.income - data.expenses)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}