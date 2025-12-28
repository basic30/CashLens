import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';

const SpendingTrendsChart = ({ dailyData, weeklyData, monthlyData }) => {
  const [timeframe, setTimeframe] = useState('daily');

  const getChartData = () => {
    switch (timeframe) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-foreground mb-1">{payload?.[0]?.payload?.name}</p>
          <p className="text-sm text-primary">
            ₹{payload?.[0]?.value?.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Spending Trends</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={timeframe === 'daily' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeframe('daily')}
          >
            Daily
          </Button>
          <Button
            variant={timeframe === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeframe('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant={timeframe === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeframe('monthly')}
          >
            Monthly
          </Button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={getChartData()}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="name" 
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="var(--color-primary)" 
            strokeWidth={2}
            dot={{ fill: 'var(--color-primary)', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrendsChart;
