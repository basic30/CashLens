import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name="Search" size={40} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No transactions found</h3>
      <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
        We couldn't find any transactions matching your current filters. Try adjusting your search criteria or reset filters to see all transactions.
      </p>
      <Button
        variant="outline"
        iconName="RotateCcw"
        iconSize={16}
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default EmptyState;