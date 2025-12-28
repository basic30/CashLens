import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HiddenSubscriptionAlert = ({ unusedSubscriptions, onViewDetails }) => {
  if (unusedSubscriptions?.length === 0) return null;

  const totalSavings = unusedSubscriptions?.reduce((sum, sub) => sum + sub?.amount, 0);

  return (
    <div className="bg-warning/10 border-2 border-warning/30 rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="AlertTriangle" size={24} color="var(--color-warning)" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Hidden Subscriptions Detected!
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            We found {unusedSubscriptions?.length} subscription{unusedSubscriptions?.length > 1 ? 's' : ''} with low usage. 
            You could save ₹{totalSavings?.toLocaleString('en-IN')} per month by cancelling these services.
          </p>
          
          <div className="space-y-3 mb-4">
            {unusedSubscriptions?.slice(0, 3)?.map((sub) => (
              <div key={sub?.id} className="flex items-center justify-between bg-card rounded-lg p-3 border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name={sub?.icon} size={20} color="var(--color-muted-foreground)" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{sub?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {sub?.usagePercentage}% usage in last 30 days
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">₹{sub?.amount?.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-muted-foreground">{sub?.frequency}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="warning"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onViewDetails(unusedSubscriptions)}
              className="flex-1"
            >
              Review All Unused Services
            </Button>
            <Button
              variant="outline"
              iconName="BookOpen"
              iconPosition="left"
              className="flex-1"
            >
              Cancellation Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiddenSubscriptionAlert;