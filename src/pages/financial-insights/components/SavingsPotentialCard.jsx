import React from 'react';
import Icon from '../../../components/AppIcon';

const SavingsPotentialCard = ({ category, currentSpend, optimizedSpend, savingsPotential, tips }) => {
  const savingsPercentage = ((savingsPotential / currentSpend) * 100)?.toFixed(1);

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{category}</h3>
        <div className="bg-success/10 px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-success">-{savingsPercentage}%</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current Spend</p>
            <p className="text-xl font-semibold text-foreground">₹{currentSpend?.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Optimized Spend</p>
            <p className="text-xl font-semibold text-primary">₹{optimizedSpend?.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingDown" size={20} color="var(--color-success)" />
            <p className="text-sm font-semibold text-success">
              Save ₹{savingsPotential?.toLocaleString('en-IN')}/month
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Optimization Tips:</p>
          <ul className="space-y-2">
            {tips?.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon name="CheckCircle2" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavingsPotentialCard;