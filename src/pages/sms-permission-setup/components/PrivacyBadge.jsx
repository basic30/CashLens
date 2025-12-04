import React from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyBadge = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
        <Icon name={icon} size={20} color="var(--color-primary)" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default PrivacyBadge;