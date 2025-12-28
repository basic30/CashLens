import React from 'react';
import Icon from '../../../components/AppIcon';

const SetupStep = ({ stepNumber, title, description, isActive, isCompleted }) => {
  return (
    <div className={`flex items-start space-x-4 p-4 rounded-lg transition-all ${
      isActive ? 'bg-primary/5 border border-primary/20' : 'bg-card'
    }`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
        isCompleted 
          ? 'bg-success text-success-foreground' 
          : isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted text-muted-foreground'
      }`}>
        {isCompleted ? <Icon name="Check" size={18} /> : stepNumber}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-semibold mb-1 ${
          isActive ? 'text-primary' : 'text-foreground'
        }`}>{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default SetupStep;