'use client';

import { theme } from '../../../theme';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type?: 'income' | 'expense';
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Food': '🍽️',
      'Income': '💰',
      'Utilities': '⚡',
      'Transport': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Healthcare': '🏥',
      'Education': '📚'
    };
    return icons[category] || '💳';
  };

  return (
    <div
      className="p-6 rounded-lg shadow-md"
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.lg,
        boxShadow: theme.shadows.md
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-lg font-semibold"
          style={{
            color: theme.colors.textPrimary,
            fontWeight: theme.typography.fontWeight.semibold,
            fontSize: theme.typography.fontSize.lg
          }}
        >
          Recent Transactions
        </h3>
        <button
          className="text-sm font-medium hover:underline"
          style={{
            color: theme.colors.primary,
            fontWeight: theme.typography.fontWeight.medium,
            fontSize: theme.typography.fontSize.sm
          }}
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            style={{
              borderRadius: theme.radii.md
            }}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: transaction.amount > 0 ? `${theme.colors.profit}15` : `${theme.colors.loss}15`
                }}
              >
                <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
              </div>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{
                    color: theme.colors.textPrimary,
                    fontWeight: theme.typography.fontWeight.medium,
                    fontSize: theme.typography.fontSize.sm
                  }}
                >
                  {transaction.description}
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.xs
                  }}
                >
                  {transaction.category} • {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className="text-sm font-semibold"
                style={{
                  color: transaction.amount > 0 ? theme.colors.profit : theme.colors.loss,
                  fontWeight: theme.typography.fontWeight.semibold,
                  fontSize: theme.typography.fontSize.sm
                }}
              >
                {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}