import React from 'react';
import Icon from '../../../components/AppIcon';

const OverspendCategoryCard = ({ category, amount, budgetLimit, percentage }) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-error/20 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Biggest Overspend</h3>
        <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
          <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Category</p>
          <p className="text-xl font-bold text-foreground">{category}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Spent</p>
            <p className="text-lg font-semibold text-error">
              ₹{amount?.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Budget</p>
            <p className="text-lg font-semibold text-foreground">
              ₹{budgetLimit?.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Over budget</span>
            <span className="text-xs font-semibold text-error">{percentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-error rounded-full h-2 transition-all duration-300"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverspendCategoryCard;