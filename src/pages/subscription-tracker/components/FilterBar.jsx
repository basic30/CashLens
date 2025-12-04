import React from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterBar = ({ filters, onFilterChange, onAddSubscription }) => {
  const statusOptions = [
    { value: 'all', label: 'All Subscriptions' },
    { value: 'active', label: 'Active Only' },
    { value: 'unused', label: 'Unused Only' },
    { value: 'suspected', label: 'Suspected Only' },
    { value: 'cancelled', label: 'Cancelled Only' }
  ];

  const sortOptions = [
    { value: 'amount-desc', label: 'Amount: High to Low' },
    { value: 'amount-asc', label: 'Amount: Low to High' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'date-asc', label: 'Next Payment: Earliest' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search subscriptions by name or merchant..."
            value={filters?.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e?.target?.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
            placeholder="Filter by status"
            className="w-full sm:w-48"
          />

          <Select
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => onFilterChange('sortBy', value)}
            placeholder="Sort by"
            className="w-full sm:w-48"
          />

          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onAddSubscription}
            className="w-full sm:w-auto"
          >
            Add Subscription
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="text-sm text-muted-foreground">Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <span className="text-sm text-muted-foreground">Unused</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-accent"></div>
          <span className="text-sm text-muted-foreground">Suspected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-muted"></div>
          <span className="text-sm text-muted-foreground">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;