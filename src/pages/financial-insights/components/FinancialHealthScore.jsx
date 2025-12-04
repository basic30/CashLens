import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialHealthScore = ({ score, breakdown, suggestions }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'primary';
    if (score >= 40) return 'warning';
    return 'error';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Financial Health Score</h2>
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-48 h-48 mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="var(--color-muted)"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke={`var(--color-${scoreColor})`}
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${(score / 100) * 553} 553`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold text-${scoreColor}`}>{score}</span>
            <span className="text-sm text-muted-foreground mt-1">{scoreLabel}</span>
          </div>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-semibold text-foreground">Score Breakdown</h3>
        {breakdown?.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">{item?.category}</span>
              <span className="text-sm font-semibold text-foreground">{item?.score}/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full bg-${getScoreColor(item?.score)}`}
                style={{ width: `${item?.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start gap-2 mb-3">
          <Icon name="TrendingUp" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <h4 className="text-sm font-semibold text-foreground">Improvement Suggestions</h4>
        </div>
        <ul className="space-y-2">
          {suggestions?.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Icon name="ArrowRight" size={16} className="flex-shrink-0 mt-0.5" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinancialHealthScore;