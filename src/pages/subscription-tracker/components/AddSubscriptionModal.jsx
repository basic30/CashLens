import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddSubscriptionModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    amount: '',
    frequency: 'monthly',
    nextPayment: '',
    icon: 'Package'
  });

  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'fitness', label: 'Fitness & Health' },
    { value: 'education', label: 'Education' },
    { value: 'software', label: 'Software & Tools' },
    { value: 'other', label: 'Other' }
  ];

  const frequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const iconOptions = [
    { value: 'Tv', label: 'TV/Streaming' },
    { value: 'Music', label: 'Music' },
    { value: 'Smartphone', label: 'Mobile App' },
    { value: 'Cloud', label: 'Cloud Service' },
    { value: 'Dumbbell', label: 'Fitness' },
    { value: 'GraduationCap', label: 'Education' },
    { value: 'Package', label: 'General' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name?.trim()) newErrors.name = 'Subscription name is required';
    if (!formData?.category) newErrors.category = 'Category is required';
    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!formData?.nextPayment) newErrors.nextPayment = 'Next payment date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onAdd({
        ...formData,
        amount: parseFloat(formData?.amount),
        status: 'active',
        usagePercentage: 100,
        id: Date.now()
      });
      setFormData({
        name: '',
        category: '',
        amount: '',
        frequency: 'monthly',
        nextPayment: '',
        icon: 'Package'
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm"></div>
      <div 
        className="relative bg-card border border-border rounded-lg shadow-modal w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e?.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Add New Subscription</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Subscription Name"
            type="text"
            placeholder="e.g., Netflix, Spotify, Adobe Creative Cloud"
            value={formData?.name}
            onChange={(e) => handleChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleChange('category', value)}
            error={errors?.category}
            placeholder="Select category"
            required
          />

          <Input
            label="Billing Amount (₹)"
            type="number"
            placeholder="0.00"
            value={formData?.amount}
            onChange={(e) => handleChange('amount', e?.target?.value)}
            error={errors?.amount}
            required
          />

          <Select
            label="Billing Frequency"
            options={frequencyOptions}
            value={formData?.frequency}
            onChange={(value) => handleChange('frequency', value)}
            required
          />

          <Input
            label="Next Payment Date"
            type="date"
            value={formData?.nextPayment}
            onChange={(e) => handleChange('nextPayment', e?.target?.value)}
            error={errors?.nextPayment}
            required
          />

          <Select
            label="Icon"
            options={iconOptions}
            value={formData?.icon}
            onChange={(value) => handleChange('icon', value)}
            description="Choose an icon that represents this subscription"
          />

          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="submit"
              variant="default"
              iconName="Plus"
              iconPosition="left"
              className="flex-1"
            >
              Add Subscription
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscriptionModal;