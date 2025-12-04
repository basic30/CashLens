import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionCard = ({ subscription, onStatusChange, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'unused':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-muted text-muted-foreground border-border';
      case 'suspected':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getFrequencyIcon = (frequency) => {
    switch (frequency) {
      case 'monthly':
        return 'Calendar';
      case 'yearly':
        return 'CalendarDays';
      case 'quarterly':
        return 'CalendarRange';
      default:
        return 'RefreshCw';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getUsageIndicator = (usagePercentage) => {
    if (usagePercentage >= 70) return { color: 'bg-success', label: 'High Usage' };
    if (usagePercentage >= 40) return { color: 'bg-warning', label: 'Medium Usage' };
    return { color: 'bg-error', label: 'Low Usage' };
  };

  const usage = getUsageIndicator(subscription?.usagePercentage);

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={subscription?.icon} size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{subscription?.name}</h3>
            <p className="text-sm text-muted-foreground">{subscription?.category}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscription?.status)}`}>
          {subscription?.status?.charAt(0)?.toUpperCase() + subscription?.status?.slice(1)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Billing Amount</p>
          <p className="text-2xl font-bold text-foreground">₹{subscription?.amount?.toLocaleString('en-IN')}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Frequency</p>
          <div className="flex items-center space-x-2">
            <Icon name={getFrequencyIcon(subscription?.frequency)} size={16} color="var(--color-muted-foreground)" />
            <p className="text-sm font-medium text-foreground capitalize">{subscription?.frequency}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Next Payment</p>
          <p className="text-sm font-medium text-foreground">{formatDate(subscription?.nextPayment)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Usage Indicator</p>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${usage?.color}`}></div>
            <p className="text-sm font-medium text-foreground">{usage?.label}</p>
          </div>
        </div>
      </div>
      {subscription?.usagePercentage < 40 && subscription?.status === 'active' && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Low Usage Detected</p>
              <p className="text-xs text-muted-foreground mt-1">
                Save ₹{subscription?.amount?.toLocaleString('en-IN')}/{subscription?.frequency} by cancelling
              </p>
            </div>
          </div>
        </div>
      )}
      {subscription?.status === 'suspected' && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="Sparkles" size={16} color="var(--color-accent)" className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-accent">AI Detected Subscription</p>
              <p className="text-xs text-muted-foreground mt-1">
                Confidence: {subscription?.confidenceScore}% based on transaction patterns
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(subscription)}
          className="flex-1"
        >
          View Details
        </Button>
        {subscription?.status === 'active' && (
          <Button
            variant="destructive"
            size="sm"
            iconName="XCircle"
            iconPosition="left"
            onClick={() => onStatusChange(subscription?.id, 'cancelled')}
            className="flex-1"
          >
            Mark Cancelled
          </Button>
        )}
        {subscription?.status === 'unused' && (
          <Button
            variant="success"
            size="sm"
            iconName="CheckCircle"
            iconPosition="left"
            onClick={() => onStatusChange(subscription?.id, 'active')}
            className="flex-1"
          >
            Mark Active
          </Button>
        )}
        {subscription?.status === 'suspected' && (
          <Button
            variant="default"
            size="sm"
            iconName="Check"
            iconPosition="left"
            onClick={() => onStatusChange(subscription?.id, 'active')}
            className="flex-1"
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;