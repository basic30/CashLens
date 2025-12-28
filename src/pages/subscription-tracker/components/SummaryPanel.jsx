import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryPanel = ({ summary }) => {
  const summaryCards = [
    {
      title: 'Total Monthly Cost',
      value: `₹${summary?.totalMonthlyCost?.toLocaleString('en-IN')}`,
      icon: 'Wallet',
      color: 'bg-primary/10 text-primary',
      trend: summary?.monthlyTrend,
      trendLabel: 'vs last month'
    },
    {
      title: 'Active Subscriptions',
      value: summary?.activeCount,
      icon: 'CheckCircle',
      color: 'bg-success/10 text-success',
      subtext: `${summary?.totalCount} total subscriptions`
    },
    {
      title: 'Potential Savings',
      value: `₹${summary?.potentialSavings?.toLocaleString('en-IN')}`,
      icon: 'TrendingDown',
      color: 'bg-warning/10 text-warning',
      subtext: 'From unused services'
    },
    {
      title: 'Annual Spending',
      value: `₹${summary?.annualSpending?.toLocaleString('en-IN')}`,
      icon: 'CalendarDays',
      color: 'bg-accent/10 text-accent',
      trend: summary?.yearlyTrend,
      trendLabel: 'vs last year'
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-error' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-success' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryCards?.map((card, index) => {
        const trendInfo = card?.trend !== undefined ? getTrendIcon(card?.trend) : null;
        
        return (
          <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card?.color}`}>
                <Icon name={card?.icon} size={24} />
              </div>
              {trendInfo && (
                <div className={`flex items-center space-x-1 ${trendInfo?.color}`}>
                  <Icon name={trendInfo?.icon} size={16} />
                  <span className="text-xs font-medium">{Math.abs(card?.trend)}%</span>
                </div>
              )}
            </div>
            <h3 className="text-sm text-muted-foreground mb-2">{card?.title}</h3>
            <p className="text-2xl font-bold text-foreground mb-1">{card?.value}</p>
            {card?.subtext && (
              <p className="text-xs text-muted-foreground">{card?.subtext}</p>
            )}
            {card?.trendLabel && (
              <p className="text-xs text-muted-foreground">{card?.trendLabel}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SummaryPanel;