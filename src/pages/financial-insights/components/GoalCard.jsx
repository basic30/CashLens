import React from 'react';
import Icon from '../../../components/AppIcon';

const GoalCard = ({ goal }) => {
  const progressPercentage = (goal?.current / goal?.target) * 100;
  const isCompleted = progressPercentage >= 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Icon name={goal?.icon} size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{goal?.title}</h3>
            <p className="text-sm text-muted-foreground">{goal?.category}</p>
          </div>
        </div>
        {isCompleted && (
          <div className="bg-success/10 p-2 rounded-full">
            <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current</p>
            <p className="text-xl font-semibold text-foreground">₹{goal?.current?.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Target</p>
            <p className="text-xl font-semibold text-primary">₹{goal?.target?.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm font-semibold text-primary">{Math.min(progressPercentage, 100)?.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-success' : 'bg-primary'}`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Deadline: {goal?.deadline}</span>
          <span className="text-foreground font-medium">{goal?.daysLeft} days left</span>
        </div>

        {goal?.milestone && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Icon name="Trophy" size={16} color="var(--color-accent)" />
              <p className="text-sm text-foreground">{goal?.milestone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalCard;