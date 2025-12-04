import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionDetailsModal = ({ isOpen, subscription, onClose, onStatusChange }) => {
  if (!isOpen || !subscription) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const getAnnualCost = () => {
    const multiplier = subscription?.frequency === 'monthly' ? 12 : subscription?.frequency === 'quarterly' ? 4 : 1;
    return subscription?.amount * multiplier;
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm"></div>
      <div 
        className="relative bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e?.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={subscription?.icon} size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{subscription?.name}</h2>
                <p className="text-sm text-muted-foreground">{subscription?.category}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Billing Amount</p>
              <p className="text-2xl font-bold text-foreground">₹{subscription?.amount?.toLocaleString('en-IN')}</p>
              <p className="text-xs text-muted-foreground mt-1 capitalize">{subscription?.frequency}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Annual Cost</p>
              <p className="text-2xl font-bold text-foreground">₹{getAnnualCost()?.toLocaleString('en-IN')}</p>
              <p className="text-xs text-muted-foreground mt-1">Projected yearly spend</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Next Payment Date</span>
              <span className="text-sm font-medium text-foreground">{formatDate(subscription?.nextPayment)}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Usage Percentage</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${subscription?.usagePercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground">{subscription?.usagePercentage}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="text-sm font-medium text-foreground capitalize">{subscription?.status}</span>
            </div>
            {subscription?.confidenceScore && (
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm text-muted-foreground">AI Confidence Score</span>
                <span className="text-sm font-medium text-foreground">{subscription?.confidenceScore}%</span>
              </div>
            )}
          </div>

          {subscription?.usagePercentage < 40 && subscription?.status === 'active' && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-warning mb-2">Optimization Recommendation</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    This subscription shows low usage ({subscription?.usagePercentage}%). Consider cancelling to save 
                    ₹{subscription?.amount?.toLocaleString('en-IN')} per {subscription?.frequency}.
                  </p>
                  <Button
                    variant="warning"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    View Cancellation Guide
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-4">
            {subscription?.status === 'active' && (
              <>
                <Button
                  variant="outline"
                  iconName="AlertCircle"
                  iconPosition="left"
                  onClick={() => {
                    onStatusChange(subscription?.id, 'unused');
                    onClose();
                  }}
                  className="flex-1"
                >
                  Mark as Unused
                </Button>
                <Button
                  variant="destructive"
                  iconName="XCircle"
                  iconPosition="left"
                  onClick={() => {
                    onStatusChange(subscription?.id, 'cancelled');
                    onClose();
                  }}
                  className="flex-1"
                >
                  Cancel Subscription
                </Button>
              </>
            )}
            {subscription?.status === 'unused' && (
              <Button
                variant="success"
                iconName="CheckCircle"
                iconPosition="left"
                onClick={() => {
                  onStatusChange(subscription?.id, 'active');
                  onClose();
                }}
                className="flex-1"
              >
                Reactivate Subscription
              </Button>
            )}
            {subscription?.status === 'suspected' && (
              <>
                <Button
                  variant="default"
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => {
                    onStatusChange(subscription?.id, 'active');
                    onClose();
                  }}
                  className="flex-1"
                >
                  Confirm Active
                </Button>
                <Button
                  variant="outline"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => {
                    onStatusChange(subscription?.id, 'cancelled');
                    onClose();
                  }}
                  className="flex-1"
                >
                  Not a Subscription
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetailsModal;