'use client';

import { theme } from '../../../theme';

interface FinancialOverviewProps {
  data: {
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    savings: number;
  };
}

export default function FinancialOverview({ data }: FinancialOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Balance',
      amount: data.totalBalance,
      icon: '💰',
      color: theme.colors.primary,
      bgColor: `${theme.colors.primary}10`,
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      title: 'Monthly Income',
      amount: data.monthlyIncome,
      icon: '📈',
      color: theme.colors.profit,
      bgColor: `${theme.colors.profit}10`,
      change: '+12.3%',
      changeType: 'positive'
    },
    {
      title: 'Monthly Expenses',
      amount: data.monthlyExpenses,
      icon: '📊',
      color: theme.colors.secondary,
      bgColor: `${theme.colors.secondary}10`,
      change: '-3.1%',
      changeType: 'negative'
    },
    {
      title: 'Savings',
      amount: data.savings,
      icon: '🎯',
      color: theme.colors.warning,
      bgColor: `${theme.colors.warning}10`,
      change: '+8.7%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-6 rounded-lg shadow-md transition-transform hover:scale-105"
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radii.lg,
            boxShadow: theme.shadows.md
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: card.bgColor }}
            >
              <span className="text-2xl">{card.icon}</span>
            </div>
            <span
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{
                color: card.changeType === 'positive' ? theme.colors.profit : theme.colors.loss,
                backgroundColor: card.changeType === 'positive' ? `${theme.colors.profit}15` : `${theme.colors.loss}15`,
                fontSize: theme.typography.fontSize.xs
              }}
            >
              {card.change}
            </span>
          </div>
          
          <h3
            className="text-sm font-medium mb-2"
            style={{
              color: theme.colors.textSecondary,
              fontWeight: theme.typography.fontWeight.medium,
              fontSize: theme.typography.fontSize.sm
            }}
          >
            {card.title}
          </h3>
          
          <p
            className="text-2xl font-bold"
            style={{
              color: theme.colors.textPrimary,
              fontWeight: theme.typography.fontWeight.bold,
              fontSize: theme.typography.fontSize['2xl']
            }}
          >
            {formatCurrency(card.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}