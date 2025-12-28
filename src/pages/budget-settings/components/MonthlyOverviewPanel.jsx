import React from 'react';
import Icon from '../../../components/AppIcon';

const MonthlyOverviewPanel = ({ totalBudget, totalSpending, projectedOverspend }) => {
  const remainingBudget = totalBudget - totalSpending;
  const spendingPercentage = totalBudget > 0 ? (totalSpending / totalBudget) * 100 : 0;
  const isOverBudget = totalSpending > totalBudget;

  const overviewStats = [
    {
      label: 'Total Budget',
      value: `₹${totalBudget?.toLocaleString('en-IN')}`,
      icon: 'Wallet',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Total Spending',
      value: `₹${totalSpending?.toLocaleString('en-IN')}`,
      icon: 'TrendingUp',
      color: isOverBudget ? 'text-error' : 'text-success',
      bgColor: isOverBudget ? 'bg-error/10' : 'bg-success/10'
    },
    {
      label: 'Remaining',
      value: `₹${Math.abs(remainingBudget)?.toLocaleString('en-IN')}`,
      icon: remainingBudget >= 0 ? 'PiggyBank' : 'AlertTriangle',
      color: remainingBudget >= 0 ? 'text-success' : 'text-error',
      bgColor: remainingBudget >= 0 ? 'bg-success/10' : 'bg-error/10'
    },
    {
      label: 'Projected Overspend',
      value: projectedOverspend > 0 ? `₹${projectedOverspend?.toLocaleString('en-IN')}` : '₹0',
      icon: 'AlertCircle',
      color: projectedOverspend > 0 ? 'text-warning' : 'text-muted-foreground',
      bgColor: projectedOverspend > 0 ? 'bg-warning/10' : 'bg-muted/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Monthly Overview</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">November 2025</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {overviewStats?.map((stat, index) => (
          <div key={index} className="bg-background rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={20} color={`var(--color-${stat?.color?.replace('text-', '')})`} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{stat?.label}</p>
                <p className={`text-lg font-semibold ${stat?.color}`}>{stat?.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-background rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">Overall Budget Usage</span>
          <span className={`text-sm font-semibold ${isOverBudget ? 'text-error' : 'text-success'}`}>
            {spendingPercentage?.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${isOverBudget ? 'bg-error' : spendingPercentage >= 80 ? 'bg-warning' : 'bg-success'}`}
            style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
          />
        </div>
        {isOverBudget && (
          <div className="flex items-center space-x-2 mt-3 text-error">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">
              You have exceeded your monthly budget by ₹{Math.abs(remainingBudget)?.toLocaleString('en-IN')}
            </span>
          </div>
        )}
        {projectedOverspend > 0 && !isOverBudget && (
          <div className="flex items-center space-x-2 mt-3 text-warning">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">
              Projected to overspend by ₹{projectedOverspend?.toLocaleString('en-IN')} this month
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyOverviewPanel;