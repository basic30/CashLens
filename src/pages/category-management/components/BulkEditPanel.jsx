import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const BulkEditPanel = ({ selectedCount, onBulkUpdate, onClearSelection }) => {
  const [bulkCategory, setBulkCategory] = useState('');

  const categoryOptions = [
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

  const handleBulkUpdate = () => {
    if (bulkCategory) {
      onBulkUpdate(bulkCategory);
      setBulkCategory('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-card border border-border rounded-lg shadow-modal p-4 min-w-[400px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {selectedCount} transaction{selectedCount > 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-muted-foreground">Apply bulk category update</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={16}
            onClick={onClearSelection}
          />
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Select
              label="New Category"
              options={categoryOptions}
              value={bulkCategory}
              onChange={setBulkCategory}
              placeholder="Select category"
            />
          </div>
          <Button
            variant="default"
            iconName="Check"
            iconSize={16}
            onClick={handleBulkUpdate}
            disabled={!bulkCategory}
          >
            Apply to All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkEditPanel;