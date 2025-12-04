import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AnomalyDetectionSettings = ({ 
  anomalySettings, 
  onUpdateSettings 
}) => {
  const sensitivityOptions = [
    { value: 'low', label: 'Low - Only major anomalies' },
    { value: 'medium', label: 'Medium - Balanced detection' },
    { value: 'high', label: 'High - Detect all unusual patterns' }
  ];

  const thresholdOptions = [
    { value: '150', label: '150% above average' },
    { value: '200', label: '200% above average' },
    { value: '300', label: '300% above average' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
          <Icon name="ShieldAlert" size={24} color="var(--color-error)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Anomaly Detection</h2>
          <p className="text-sm text-muted-foreground">Configure fraud and unusual spending alerts</p>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <Select
            label="Detection Sensitivity"
            description="How aggressively to detect unusual transactions"
            options={sensitivityOptions}
            value={anomalySettings?.sensitivity}
            onChange={(value) => onUpdateSettings('sensitivity', value)}
          />
        </div>

        <div>
          <Select
            label="Anomaly Threshold"
            description="Trigger alerts when spending exceeds this amount"
            options={thresholdOptions}
            value={anomalySettings?.threshold}
            onChange={(value) => onUpdateSettings('threshold', value)}
          />
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Detection Rules</h3>
          <div className="space-y-3">
            <Checkbox
              label="Unusual Transaction Amount"
              description="Alert on transactions significantly higher than usual"
              checked={anomalySettings?.unusualAmount}
              onChange={(e) => onUpdateSettings('unusualAmount', e?.target?.checked)}
            />
            <Checkbox
              label="Unusual Transaction Time"
              description="Detect transactions at odd hours"
              checked={anomalySettings?.unusualTime}
              onChange={(e) => onUpdateSettings('unusualTime', e?.target?.checked)}
            />
            <Checkbox
              label="Unusual Merchant"
              description="Alert on first-time or rare merchants"
              checked={anomalySettings?.unusualMerchant}
              onChange={(e) => onUpdateSettings('unusualMerchant', e?.target?.checked)}
            />
            <Checkbox
              label="Multiple Transactions"
              description="Detect rapid successive transactions"
              checked={anomalySettings?.multipleTransactions}
              onChange={(e) => onUpdateSettings('multipleTransactions', e?.target?.checked)}
            />
            <Checkbox
              label="Geographic Anomaly"
              description="Alert on transactions from unusual locations"
              checked={anomalySettings?.geographicAnomaly}
              onChange={(e) => onUpdateSettings('geographicAnomaly', e?.target?.checked)}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-start space-x-3 bg-warning/5 rounded-lg p-4">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Privacy Notice</p>
              <p className="text-xs text-muted-foreground">
                All anomaly detection happens locally on your device. No transaction data is sent to external servers. 
                The AI model runs entirely in your browser to protect your financial privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetectionSettings;