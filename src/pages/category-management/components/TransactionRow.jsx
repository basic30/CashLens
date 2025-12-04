import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const TransactionRow = ({ transaction, onCategoryUpdate, onSelect, isSelected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(transaction?.category);

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

  const handleSave = () => {
    onCategoryUpdate(transaction?.id, selectedCategory);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedCategory(transaction?.category);
    setIsEditing(false);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Food: 'Utensils',
      Groceries: 'ShoppingCart',
      Travel: 'Car',
      Bills: 'FileText',
      Entertainment: 'Film',
      Shopping: 'ShoppingBag',
      Health: 'Heart',
      Income: 'TrendingUp',
      Others: 'MoreHorizontal'
    };
    return icons?.[category] || 'Tag';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 transition-all hover:shadow-sm ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="flex items-center pt-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(transaction?.id, e?.target?.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {transaction?.merchant}
                </h3>
                {transaction?.confidence < 70 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-warning/10 text-warning">
                    <Icon name="AlertCircle" size={12} className="mr-1" />
                    Review
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{transaction?.upiId}</p>
            </div>

            <div className="text-right">
              <p className={`text-sm font-semibold ${transaction?.type === 'debit' ? 'text-error' : 'text-success'}`}>
                {transaction?.type === 'debit' ? '-' : '+'}₹{transaction?.amount?.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-muted-foreground">{transaction?.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {!isEditing ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-md">
                    <Icon name={getCategoryIcon(transaction?.category)} size={14} className="text-primary" />
                    <span className="text-xs font-medium text-foreground">{transaction?.category}</span>
                  </div>
                  <span className={`text-xs font-medium ${getConfidenceColor(transaction?.confidence)}`}>
                    {transaction?.confidence}% confident
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit2"
                  iconSize={14}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2 flex-1">
                <div className="flex-1 max-w-xs">
                  <Select
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    placeholder="Select category"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Check"
                    iconSize={14}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    iconSize={14}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;