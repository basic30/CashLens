import React from 'react';
import Icon from '../../../components/AppIcon';

const PermissionStatusCard = ({ status, message, onRetry }) => {
  const statusConfig = {
    pending: {
      icon: 'Clock',
      iconColor: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      textColor: 'text-warning'
    },
    granted: {
      icon: 'CheckCircle2',
      iconColor: 'var(--color-success)',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      textColor: 'text-success'
    },
    denied: {
      icon: 'XCircle',
      iconColor: 'var(--color-error)',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      textColor: 'text-error'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.pending;

  return (
    <div className={`p-6 rounded-lg border ${config?.bgColor} ${config?.borderColor}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Icon name={config?.icon} size={32} color={config?.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold mb-2 ${config?.textColor}`}>
            {status === 'pending' && 'Permission Pending'}
            {status === 'granted' && 'Permission Granted'}
            {status === 'denied' && 'Permission Denied'}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
          {status === 'denied' && onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Try Again →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionStatusCard;