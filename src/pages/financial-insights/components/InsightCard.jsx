import React from 'react';
import Icon from '../../../components/AppIcon';

const InsightCard = ({ insight }) => {
  const getIconColor = (type) => {
    switch (type) {
      case 'warning':
        return 'var(--color-warning)';
      case 'success':
        return 'var(--color-success)';
      case 'error':
        return 'var(--color-error)';
      default:
        return 'var(--color-primary)';
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-warning/10';
      case 'success':
        return 'bg-success/10';
      case 'error':
        return 'bg-error/10';
      default:
        return 'bg-primary/10';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`${getBackgroundColor(insight?.type)} p-3 rounded-lg flex-shrink-0`}>
          <Icon name={insight?.icon} size={24} color={getIconColor(insight?.type)} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{insight?.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{insight?.description}</p>
          
          {insight?.metrics && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {insight?.metrics?.map((metric, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">{metric?.label}</p>
                  <p className="text-lg font-semibold text-foreground">{metric?.value}</p>
                </div>
              ))}
            </div>
          )}

          {insight?.recommendation && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Recommendation</p>
                  <p className="text-sm text-muted-foreground">{insight?.recommendation}</p>
                  {insight?.potentialSavings && (
                    <p className="text-sm font-semibold text-success mt-2">
                      Potential Savings: ₹{insight?.potentialSavings?.toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;