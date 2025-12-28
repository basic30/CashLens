import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Food', label: 'Food' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Bills', label: 'Bills' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Health', label: 'Health' },
    { value: 'Income', label: 'Income' },
    { value: 'Others', label: 'Others' }
  ];

  const confidenceOptions = [
    { value: 'all', label: 'All Confidence Levels' },
    { value: 'high', label: 'High (80%+)' },
    { value: 'medium', label: 'Medium (60-79%)' },
    { value: 'low', label: 'Low (<60%)' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconSize={16}
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />

        <Select
          label="Confidence Level"
          options={confidenceOptions}
          value={filters?.confidence}
          onChange={(value) => onFilterChange('confidence', value)}
        />

        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => onFilterChange('dateRange', value)}
        />

        <Input
          label="Search Merchant"
          type="search"
          placeholder="Search by merchant name..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />
      </div>
      {filters?.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Start Date"
            type="date"
            value={filters?.startDate}
            onChange={(e) => onFilterChange('startDate', e?.target?.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={filters?.endDate}
            onChange={(e) => onFilterChange('endDate', e?.target?.value)}
          />
        </div>
      )}
    </div>
  );
};

export default FilterPanel;