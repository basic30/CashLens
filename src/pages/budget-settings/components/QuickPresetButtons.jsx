import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickPresetButtons = ({ onApplyPreset }) => {
  const presets = [
    {
      id: 'conservative',
      name: 'Conservative',
      description: 'Based on 70% of historical spending',
      icon: 'Shield',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      multiplier: 0.7
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Based on 100% of historical spending',
      icon: 'Scale',
      color: 'text-success',
      bgColor: 'bg-success/10',
      multiplier: 1.0
    },
    {
      id: 'flexible',
      name: 'Flexible',
      description: 'Based on 130% of historical spending',
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      multiplier: 1.3
    },
    {
      id: 'ai-recommended',
      name: 'AI Recommended',
      description: 'Optimized by AI based on your patterns',
      icon: 'Sparkles',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      multiplier: 0.85
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Quick Budget Presets</h2>
          <p className="text-sm text-muted-foreground">Apply suggested budgets based on your spending history</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {presets?.map((preset) => (
          <div
            key={preset?.id}
            className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col h-full">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${preset?.bgColor} mb-3`}>
                <Icon name={preset?.icon} size={24} color={`var(--color-${preset?.color?.replace('text-', '')})`} />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">{preset?.name}</h3>
              <p className="text-xs text-muted-foreground mb-4 flex-grow">{preset?.description}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onApplyPreset(preset?.id, preset?.multiplier)}
                fullWidth
              >
                Apply Preset
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-start space-x-3 bg-primary/5 rounded-lg p-4">
          <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">How Presets Work</p>
            <p className="text-xs text-muted-foreground">
              Presets automatically calculate budget limits for each category based on your last 3 months of spending data. 
              Conservative reduces budgets for tighter control, Balanced matches your average spending, Flexible allows more room, 
              and AI Recommended uses machine learning to optimize your budget allocation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPresetButtons;