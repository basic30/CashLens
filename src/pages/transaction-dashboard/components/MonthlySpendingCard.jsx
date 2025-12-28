import React from 'react';
import Icon from '../../../components/AppIcon';

const MonthlySpendingCard = ({ totalSpending, monthlyChange, comparisonText }) => {
  const isPositive = monthlyChange > 0;
  
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">Total Spending</p>
          <h2 className="text-4xl font-bold text-foreground">₹{totalSpending?.toLocaleString('en-IN')}</h2>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Wallet" size={24} color="var(--color-primary)" />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-md ${
          isPositive ? 'bg-error/10' : 'bg-success/10'
        }`}>
          <Icon 
            name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            color={isPositive ? 'var(--color-error)' : 'var(--color-success)'} 
          />
          <span className={`text-sm font-semibold ${
            isPositive ? 'text-error' : 'text-success'
          }`}>
            {Math.abs(monthlyChange)}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{comparisonText}</p>
      </div>
    </div>
  );
};

export default MonthlySpendingCard;