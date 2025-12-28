import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const SpendingComparisonChart = ({ comparisonData }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-foreground mb-2">{payload?.[0]?.payload?.month}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Budget:</span>
              <span className="text-xs font-medium text-primary">₹{payload?.[0]?.value?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Spending:</span>
              <span className="text-xs font-medium text-success">₹{payload?.[1]?.value?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">Variance:</span>
              <span className={`text-xs font-medium ${payload?.[0]?.value - payload?.[1]?.value >= 0 ? 'text-success' : 'text-error'}`}>
                ₹{Math.abs(payload?.[0]?.value - payload?.[1]?.value)?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Multi-Month Comparison</h2>
            <p className="text-sm text-muted-foreground">Budget vs Actual Spending</p>
          </div>
        </div>
      </div>
      <div className="w-full h-80" aria-label="Multi-month budget comparison chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="budget" 
              fill="var(--color-primary)" 
              name="Budget Limit"
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="spending" 
              fill="var(--color-success)" 
              name="Actual Spending"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Avg. Budget</p>
          <p className="text-lg font-semibold text-primary">
            ₹{(comparisonData?.reduce((sum, item) => sum + item?.budget, 0) / comparisonData?.length)?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Avg. Spending</p>
          <p className="text-lg font-semibold text-success">
            ₹{(comparisonData?.reduce((sum, item) => sum + item?.spending, 0) / comparisonData?.length)?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Avg. Variance</p>
          <p className="text-lg font-semibold text-foreground">
            ₹{(comparisonData?.reduce((sum, item) => sum + Math.abs(item?.budget - item?.spending), 0) / comparisonData?.length)?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpendingComparisonChart;