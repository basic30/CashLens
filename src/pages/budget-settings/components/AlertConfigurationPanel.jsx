import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const AlertConfigurationPanel = ({ 
  notificationPreferences, 
  onUpdatePreferences 
}) => {
  const frequencyOptions = [
    { value: 'instant', label: 'Instant' },
    { value: 'daily', label: 'Daily Summary' },
    { value: 'weekly', label: 'Weekly Summary' }
  ];

  const thresholdOptions = [
    { value: '70', label: '70% of budget' },
    { value: '80', label: '80% of budget' },
    { value: '90', label: '90% of budget' },
    { value: '100', label: '100% of budget' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Bell" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Alert Configuration</h2>
          <p className="text-sm text-muted-foreground">Customize your budget notifications</p>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Notification Channels</h3>
          <div className="space-y-3">
            <Checkbox
              label="Push Notifications"
              description="Receive alerts on your device"
              checked={notificationPreferences?.push}
              onChange={(e) => onUpdatePreferences('push', e?.target?.checked)}
            />
            <Checkbox
              label="Email Notifications"
              description="Get budget alerts via email"
              checked={notificationPreferences?.email}
              onChange={(e) => onUpdatePreferences('email', e?.target?.checked)}
            />
            <Checkbox
              label="SMS Notifications"
              description="Receive text message alerts"
              checked={notificationPreferences?.sms}
              onChange={(e) => onUpdatePreferences('sms', e?.target?.checked)}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Select
            label="Alert Frequency"
            description="How often you want to receive budget updates"
            options={frequencyOptions}
            value={notificationPreferences?.frequency}
            onChange={(value) => onUpdatePreferences('frequency', value)}
          />
        </div>

        <div>
          <Select
            label="Default Alert Threshold"
            description="When to trigger budget warnings for new categories"
            options={thresholdOptions}
            value={notificationPreferences?.defaultThreshold}
            onChange={(value) => onUpdatePreferences('defaultThreshold', value)}
          />
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Advanced Alerts</h3>
          <div className="space-y-3">
            <Checkbox
              label="Anomaly Detection"
              description="Alert on unusual spending patterns"
              checked={notificationPreferences?.anomalyDetection}
              onChange={(e) => onUpdatePreferences('anomalyDetection', e?.target?.checked)}
            />
            <Checkbox
              label="Fraud-like Transactions"
              description="Notify on suspicious activity"
              checked={notificationPreferences?.fraudDetection}
              onChange={(e) => onUpdatePreferences('fraudDetection', e?.target?.checked)}
            />
            <Checkbox
              label="Budget Exceed Warnings"
              description="Alert when approaching or exceeding limits"
              checked={notificationPreferences?.budgetExceed}
              onChange={(e) => onUpdatePreferences('budgetExceed', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertConfigurationPanel;