import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BudgetCategoryCard = ({ 
  category, 
  icon, 
  currentSpending, 
  budgetLimit, 
  alertThreshold,
  onUpdateBudget,
  onUpdateThreshold 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(budgetLimit);
  const [tempThreshold, setTempThreshold] = useState(alertThreshold);

  const spendingPercentage = budgetLimit > 0 ? (currentSpending / budgetLimit) * 100 : 0;
  const isOverBudget = currentSpending > budgetLimit;
  const isNearLimit = spendingPercentage >= alertThreshold && !isOverBudget;

  const handleSave = () => {
    onUpdateBudget(category, parseFloat(tempBudget) || 0);
    onUpdateThreshold(category, parseFloat(tempThreshold) || 80);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempBudget(budgetLimit);
    setTempThreshold(alertThreshold);
    setIsEditing(false);
  };

  const getStatusColor = () => {
    if (isOverBudget) return 'text-error';
    if (isNearLimit) return 'text-warning';
    return 'text-success';
  };

  const getProgressColor = () => {
    if (isOverBudget) return 'bg-error';
    if (isNearLimit) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isOverBudget ? 'bg-error/10' : isNearLimit ? 'bg-warning/10' : 'bg-primary/10'}`}>
            <Icon name={icon} size={24} color={isOverBudget ? 'var(--color-error)' : isNearLimit ? 'var(--color-warning)' : 'var(--color-primary)'} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{category}</h3>
            <p className="text-sm text-muted-foreground">
              ₹{currentSpending?.toLocaleString('en-IN')} / ₹{budgetLimit?.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          iconName={isEditing ? 'X' : 'Edit2'}
          onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
        />
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <Input
            label="Budget Limit (₹)"
            type="number"
            value={tempBudget}
            onChange={(e) => setTempBudget(e?.target?.value)}
            placeholder="Enter budget amount"
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Alert Threshold: {tempThreshold}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={tempThreshold}
              onChange={(e) => setTempThreshold(e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="default" onClick={handleSave} fullWidth>
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel} fullWidth>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className={`font-semibold ${getStatusColor()}`}>
                {spendingPercentage?.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${getProgressColor()} transition-all duration-300 rounded-full`}
                style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">Alert at {alertThreshold}%</span>
            </div>
            {isOverBudget && (
              <span className="text-xs font-medium text-error bg-error/10 px-2 py-1 rounded">
                Over Budget
              </span>
            )}
            {isNearLimit && !isOverBudget && (
              <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded">
                Near Limit
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetCategoryCard;