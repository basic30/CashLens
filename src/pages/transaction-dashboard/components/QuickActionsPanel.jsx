import React from 'react';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const QuickActionsPanel = ({ onExportCSV, onEditTransaction }) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          iconName="Edit" 
          iconPosition="left"
          onClick={onEditTransaction}
          fullWidth
        >
          Edit Transaction
        </Button>
        
        <Link to="/category-management" className="w-full">
          <Button 
            variant="outline" 
            iconName="FolderTree" 
            iconPosition="left"
            fullWidth
          >
            Manage Categories
          </Button>
        </Link>
        
        <Button 
          variant="outline" 
          iconName="Download" 
          iconPosition="left"
          onClick={onExportCSV}
          fullWidth
        >
          Export CSV
        </Button>
        
        <Link to="/budget-settings" className="w-full">
          <Button 
            variant="outline" 
            iconName="Settings" 
            iconPosition="left"
            fullWidth
          >
            Budget Settings
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActionsPanel;