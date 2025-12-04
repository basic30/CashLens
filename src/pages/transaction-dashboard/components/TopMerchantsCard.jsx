import React from 'react';
import Icon from '../../../components/AppIcon';

const TopMerchantsCard = ({ merchants }) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Top Merchants</h3>
        <Icon name="Store" size={20} color="var(--color-primary)" />
      </div>
      <div className="space-y-4">
        {merchants?.map((merchant, index) => (
          <div key={merchant?.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-foreground">{index + 1}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{merchant?.name}</p>
                <p className="text-xs text-muted-foreground">{merchant?.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">
                ₹{merchant?.amount?.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-muted-foreground">{merchant?.transactions} txns</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMerchantsCard;