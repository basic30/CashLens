import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const AIInsightsCard = ({ insights }) => {
  const getInsightIcon = (type) => {
    const iconMap = {
      'warning': 'AlertCircle',
      'success': 'CheckCircle',
      'info': 'Info',
      'tip': 'Lightbulb'
    };
    return iconMap?.[type] || 'Sparkles';
  };

  const getInsightColor = (type) => {
    const colorMap = {
      'warning': 'var(--color-warning)',
      'success': 'var(--color-success)',
      'info': 'var(--color-primary)',
      'tip': 'var(--color-accent)'
    };
    return colorMap?.[type] || 'var(--color-primary)';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Sparkles" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">AI Financial Coach</h3>
        </div>
        <Link to="/financial-insights">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {insights?.map((insight) => (
          <div 
            key={insight?.id} 
            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                style={{ backgroundColor: `${getInsightColor(insight?.type)}20` }}
              >
                <Icon 
                  name={getInsightIcon(insight?.type)} 
                  size={16} 
                  color={getInsightColor(insight?.type)} 
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">{insight?.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight?.description}
                </p>
                {insight?.action && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="mt-2 p-0 h-auto"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {insight?.action}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsightsCard;