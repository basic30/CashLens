import React from 'react';
import Icon from '../../../components/AppIcon';

const AnomalyCard = ({ anomaly }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-error/10 border-error/20';
      case 'medium':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-primary/10 border-primary/20';
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getSeverityBg(anomaly?.severity)}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Icon 
            name="AlertTriangle" 
            size={20} 
            color={`var(--color-${getSeverityColor(anomaly?.severity)})`} 
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-foreground">{anomaly?.title}</h4>
            <span className="text-xs text-muted-foreground">{anomaly?.date}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{anomaly?.description}</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-foreground font-medium">
              Amount: ₹{anomaly?.amount?.toLocaleString('en-IN')}
            </span>
            <span className="text-muted-foreground">{anomaly?.merchant}</span>
          </div>
          {anomaly?.action && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground">{anomaly?.action}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnomalyCard;