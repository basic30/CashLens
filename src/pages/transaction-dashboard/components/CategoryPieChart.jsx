// src/pages/transaction-dashboard/components/CategoryPieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CategoryPieChart = ({ data }) => {
  const COLORS = [
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-accent)',
    '#8B5CF6',
    '#EC4899',
    '#F97316',
    '#14B8A6',
    '#6B7280'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-foreground mb-1">{payload?.[0]?.name}</p>
          <p className="text-sm text-muted-foreground">
            ₹{payload?.[0]?.value?.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {payload?.[0]?.payload?.percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {payload?.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-xs text-muted-foreground">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Category Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            label={({ percentage }) => `${percentage}%`}
            style={{ outline: 'none' }}
          >
            {data?.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS?.[index % COLORS?.length]} 
                style={{ outline: 'none' }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;