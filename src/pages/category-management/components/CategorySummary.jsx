import React from 'react';
import Icon from '../../../components/AppIcon';

const CategorySummary = ({ summaries }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      Food: 'Utensils',
      Groceries: 'ShoppingCart',
      Travel: 'Car',
      Bills: 'FileText',
      Entertainment: 'Film',
      Shopping: 'ShoppingBag',
      Health: 'Heart',
      Income: 'TrendingUp',
      Others: 'MoreHorizontal'
    };
    return icons?.[category] || 'Tag';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-500/10 text-orange-500',
      Groceries: 'bg-green-500/10 text-green-500',
      Travel: 'bg-blue-500/10 text-blue-500',
      Bills: 'bg-purple-500/10 text-purple-500',
      Entertainment: 'bg-pink-500/10 text-pink-500',
      Shopping: 'bg-yellow-500/10 text-yellow-500',
      Health: 'bg-red-500/10 text-red-500',
      Income: 'bg-emerald-500/10 text-emerald-500',
      Others: 'bg-gray-500/10 text-gray-500'
    };
    return colors?.[category] || 'bg-gray-500/10 text-gray-500';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Category Summary</h2>
      <div className="space-y-3">
        {summaries?.map((summary) => (
          <div key={summary?.category} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(summary?.category)}`}>
                <Icon name={getCategoryIcon(summary?.category)} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{summary?.category}</p>
                <p className="text-xs text-muted-foreground">{summary?.count} transactions</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">₹{summary?.amount?.toLocaleString('en-IN')}</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${summary?.accuracy}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{summary?.accuracy}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Overall ML Accuracy</span>
          <span className="text-lg font-semibold text-success">87%</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Based on {summaries?.reduce((acc, s) => acc + s?.count, 0)} categorized transactions
        </p>
      </div>
    </div>
  );
};

export default CategorySummary;