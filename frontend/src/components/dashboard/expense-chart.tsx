'use client';

import { useState, useEffect } from 'react';
import { theme } from '../../../theme';
import { financeService, CategoryBreakdown } from '../../lib/finance-service';

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export default function ExpenseChart() {
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const loadExpenseData = async () => {
      try {
        setLoading(true);
        setError(null);

        const breakdown: CategoryBreakdown[] = await financeService.getExpenseCategoryBreakdown();
        const total = breakdown.reduce((sum, cat) => sum + cat.total, 0);
        
        // Map backend data to frontend format with colors
        const colors = [theme.colors.chart1, theme.colors.chart2, theme.colors.chart3, theme.colors.chart4, theme.colors.chart5];
        
        const categoriesWithPercentage: ExpenseCategory[] = breakdown.map((category, index) => ({
          name: category.category,
          amount: category.total,
          percentage: total > 0 ? Math.round((category.total / total) * 100) : 0,
          color: colors[index % colors.length]
        })).slice(0, 5); // Take top 5 categories

        setExpenseCategories(categoriesWithPercentage);
        setTotalExpenses(total);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load expense data';
        console.error('Failed to load expense breakdown:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadExpenseData();
  }, []);

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
          Expense Breakdown
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

  if (error || expenseCategories.length === 0) {
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
          Expense Breakdown
        </h3>
        <div className="text-center text-sm" style={{ color: theme.colors.textSecondary }}>
          {error || 'No expense data available'}
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
          Expense Breakdown
        </h3>
        <button
          className="text-sm font-medium hover:underline"
          style={{
            color: theme.colors.primary,
            fontWeight: theme.typography.fontWeight.medium,
            fontSize: theme.typography.fontSize.sm
          }}
        >
          View Details
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simple Donut Chart Representation */}
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Outer ring segments */}
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke={theme.colors.surfaceAlt}
                strokeWidth="20"
              />
              {expenseCategories.map((category, index) => {
                const startAngle = expenseCategories.slice(0, index).reduce((sum, cat) => sum + (cat.percentage * 3.6), 0);
                const endAngle = startAngle + (category.percentage * 3.6);
                const largeArcFlag = category.percentage > 50 ? 1 : 0;
                
                const startX = 80 + 60 * Math.cos((startAngle - 90) * Math.PI / 180);
                const startY = 80 + 60 * Math.sin((startAngle - 90) * Math.PI / 180);
                const endX = 80 + 60 * Math.cos((endAngle - 90) * Math.PI / 180);
                const endY = 80 + 60 * Math.sin((endAngle - 90) * Math.PI / 180);
                
                return (
                  <path
                    key={index}
                    d={`M 80 80 L ${startX} ${startY} A 60 60 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                    fill={category.color}
                    opacity="0.8"
                  />
                );
              })}
              {/* Inner circle */}
              <circle
                cx="80"
                cy="80"
                r="35"
                fill={theme.colors.surface}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span
                className="text-2xl font-bold"
                style={{
                  color: theme.colors.textPrimary,
                  fontWeight: theme.typography.fontWeight.bold
                }}
              >
                {formatCurrency(totalExpenses).replace('₹', '₹').replace('.00', '')}
              </span>
              <span
                className="text-xs"
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.fontSize.xs
                }}
              >
                Total
              </span>
            </div>
          </div>
        </div>

        {/* Category List */}
        <div className="space-y-3">
          {expenseCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span
                  className="text-sm font-medium"
                  style={{
                    color: theme.colors.textPrimary,
                    fontWeight: theme.typography.fontWeight.medium,
                    fontSize: theme.typography.fontSize.sm
                  }}
                >
                  {category.name}
                </span>
              </div>
              <div className="text-right">
                <div
                  className="text-sm font-semibold"
                  style={{
                    color: theme.colors.textPrimary,
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontSize: theme.typography.fontSize.sm
                  }}
                >
                  {formatCurrency(category.amount)}
                </div>
                <div
                  className="text-xs"
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.xs
                  }}
                >
                  {category.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}