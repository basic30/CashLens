import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentTransactionsList = ({ transactions }) => {
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Food': 'Utensils',
      'Groceries': 'ShoppingCart',
      'Travel': 'Car',
      'Bills': 'Receipt',
      'Entertainment': 'Film',
      'Shopping': 'ShoppingBag',
      'Health': 'Heart',
      'Income': 'TrendingUp',
      'Others': 'MoreHorizontal'
    };
    return iconMap?.[category] || 'Circle';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Food': 'var(--color-accent)',
      'Groceries': 'var(--color-secondary)',
      'Travel': 'var(--color-primary)',
      'Bills': '#F97316',
      'Entertainment': '#EC4899',
      'Shopping': '#8B5CF6',
      'Health': '#14B8A6',
      'Income': 'var(--color-success)',
      'Others': 'var(--color-muted-foreground)'
    };
    return colorMap?.[category] || 'var(--color-muted-foreground)';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <Icon name="Clock" size={20} color="var(--color-primary)" />
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions?.map((transaction) => (
          <div 
            key={transaction?.id} 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${getCategoryColor(transaction?.category)}20` }}
              >
                <Icon 
                  name={getCategoryIcon(transaction?.category)} 
                  size={18} 
                  color={getCategoryColor(transaction?.category)} 
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{transaction?.merchant}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">{transaction?.date}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{transaction?.time}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`text-sm font-semibold ${
                transaction?.type === 'income' ? 'text-success' : 'text-foreground'
              }`}>
                {transaction?.type === 'income' ? '+' : '-'}₹{transaction?.amount?.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{transaction?.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactionsList;