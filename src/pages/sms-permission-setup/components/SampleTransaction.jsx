import React from 'react';
import Icon from '../../../components/AppIcon';

const SampleTransaction = ({ merchant, amount, category, date, upiId }) => {
  const categoryColors = {
    'Food': 'text-amber-600 bg-amber-50 dark:bg-amber-950/30',
    'Shopping': 'text-purple-600 bg-purple-50 dark:bg-purple-950/30',
    'Travel': 'text-blue-600 bg-blue-50 dark:bg-blue-950/30',
    'Bills': 'text-red-600 bg-red-50 dark:bg-red-950/30',
    'Entertainment': 'text-pink-600 bg-pink-50 dark:bg-pink-950/30'
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Receipt" size={20} color="var(--color-primary)" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">{merchant}</h4>
          <p className="text-xs text-muted-foreground truncate">{upiId}</p>
          <p className="text-xs text-muted-foreground mt-1">{date}</p>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2 flex-shrink-0 ml-4">
        <span className="text-base font-bold text-foreground">₹{amount?.toLocaleString('en-IN')}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors?.[category]}`}>
          {category}
        </span>
      </div>
    </div>
  );
};

export default SampleTransaction;