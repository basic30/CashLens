import React, { useState, useMemo } from 'react';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';

import Button from '../../components/ui/Button';
import TransactionRow from './components/TransactionRow';
import FilterPanel from './components/FilterPanel';
import CategorySummary from './components/CategorySummary';
import BulkEditPanel from './components/BulkEditPanel';
import EmptyState from './components/EmptyState';

const CategoryManagement = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    confidence: 'all',
    dateRange: 'all',
    search: '',
    startDate: '',
    endDate: ''
  });

  const [selectedTransactions, setSelectedTransactions] = useState(new Set());

  const mockTransactions = [
    {
      id: 1,
      date: '15/11/2025',
      merchant: 'Swiggy',
      upiId: 'swiggy@paytm',
      amount: 450,
      type: 'debit',
      category: 'Food',
      confidence: 92
    },
    {
      id: 2,
      date: '15/11/2025',
      merchant: 'Big Bazaar',
      upiId: 'bigbazaar@upi',
      amount: 2340,
      type: 'debit',
      category: 'Groceries',
      confidence: 88
    },
    {
      id: 3,
      date: '14/11/2025',
      merchant: 'Uber',
      upiId: 'uber@paytm',
      amount: 285,
      type: 'debit',
      category: 'Travel',
      confidence: 95
    },
    {
      id: 4,
      date: '14/11/2025',
      merchant: 'Airtel Payments Bank',
      upiId: 'airtel@paytm',
      amount: 599,
      type: 'debit',
      category: 'Bills',
      confidence: 98
    },
    {
      id: 5,
      date: '13/11/2025',
      merchant: 'BookMyShow',
      upiId: 'bookmyshow@paytm',
      amount: 800,
      type: 'debit',
      category: 'Entertainment',
      confidence: 91
    },
    {
      id: 6,
      date: '13/11/2025',
      merchant: 'Amazon Pay',
      upiId: 'amazonpay@icici',
      amount: 1599,
      type: 'debit',
      category: 'Shopping',
      confidence: 65
    },
    {
      id: 7,
      date: '12/11/2025',
      merchant: 'Apollo Pharmacy',
      upiId: 'apollo@paytm',
      amount: 450,
      type: 'debit',
      category: 'Health',
      confidence: 89
    },
    {
      id: 8,
      date: '12/11/2025',
      merchant: 'Salary Credit',
      upiId: 'company@hdfc',
      amount: 75000,
      type: 'credit',
      category: 'Income',
      confidence: 100
    },
    {
      id: 9,
      date: '11/11/2025',
      merchant: 'Zomato',
      upiId: 'zomato@paytm',
      amount: 380,
      type: 'debit',
      category: 'Food',
      confidence: 94
    },
    {
      id: 10,
      date: '11/11/2025',
      merchant: 'DMart',
      upiId: 'dmart@upi',
      amount: 1850,
      type: 'debit',
      category: 'Groceries',
      confidence: 87
    },
    {
      id: 11,
      date: '10/11/2025',
      merchant: 'Ola Cabs',
      upiId: 'ola@paytm',
      amount: 195,
      type: 'debit',
      category: 'Travel',
      confidence: 93
    },
    {
      id: 12,
      date: '10/11/2025',
      merchant: 'Myntra',
      upiId: 'myntra@paytm',
      amount: 2499,
      type: 'debit',
      category: 'Shopping',
      confidence: 58
    },
    {
      id: 13,
      date: '09/11/2025',
      merchant: 'Netflix',
      upiId: 'netflix@paytm',
      amount: 649,
      type: 'debit',
      category: 'Entertainment',
      confidence: 97
    },
    {
      id: 14,
      date: '09/11/2025',
      merchant: 'Electricity Bill',
      upiId: 'bescom@upi',
      amount: 1250,
      type: 'debit',
      category: 'Bills',
      confidence: 99
    },
    {
      id: 15,
      date: '08/11/2025',
      merchant: 'Cafe Coffee Day',
      upiId: 'ccd@paytm',
      amount: 320,
      type: 'debit',
      category: 'Food',
      confidence: 55
    }
  ];

  const categorySummaries = [
    { category: 'Food', count: 45, amount: 12450, accuracy: 89 },
    { category: 'Groceries', count: 28, amount: 34200, accuracy: 92 },
    { category: 'Travel', count: 52, amount: 8950, accuracy: 94 },
    { category: 'Bills', count: 18, amount: 15600, accuracy: 98 },
    { category: 'Entertainment', count: 22, amount: 6800, accuracy: 88 },
    { category: 'Shopping', count: 35, amount: 28500, accuracy: 72 },
    { category: 'Health', count: 12, amount: 5400, accuracy: 85 },
    { category: 'Income', count: 8, amount: 185000, accuracy: 100 }
  ];

  const filteredTransactions = useMemo(() => {
    return mockTransactions?.filter(transaction => {
      if (filters?.category !== 'all' && transaction?.category !== filters?.category) {
        return false;
      }

      if (filters?.confidence !== 'all') {
        if (filters?.confidence === 'high' && transaction?.confidence < 80) return false;
        if (filters?.confidence === 'medium' && (transaction?.confidence < 60 || transaction?.confidence >= 80)) return false;
        if (filters?.confidence === 'low' && transaction?.confidence >= 60) return false;
      }

      if (filters?.search && !transaction?.merchant?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      confidence: 'all',
      dateRange: 'all',
      search: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleCategoryUpdate = (transactionId, newCategory) => {
    console.log(`Updated transaction ${transactionId} to category: ${newCategory}`);
  };

  const handleTransactionSelect = (transactionId, isSelected) => {
    setSelectedTransactions(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet?.add(transactionId);
      } else {
        newSet?.delete(transactionId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedTransactions?.size === filteredTransactions?.length) {
      setSelectedTransactions(new Set());
    } else {
      setSelectedTransactions(new Set(filteredTransactions.map(t => t.id)));
    }
  };

  const handleBulkUpdate = (category) => {
    console.log(`Bulk updating ${selectedTransactions?.size} transactions to category: ${category}`);
    setSelectedTransactions(new Set());
  };

  const handleClearSelection = () => {
    setSelectedTransactions(new Set());
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">Category Management</h1>
              <Button
                variant="outline"
                iconName="Download"
                iconSize={18}
              >
                Export Data
              </Button>
            </div>
            <p className="text-muted-foreground">
              Review and optimize AI-powered transaction categorization to improve accuracy
            </p>
          </div>

          <div className="mb-6">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-foreground">
                      Transactions ({filteredTransactions?.length})
                    </h2>
                    {filteredTransactions?.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName={selectedTransactions?.size === filteredTransactions?.length ? 'CheckSquare' : 'Square'}
                        iconSize={16}
                        onClick={handleSelectAll}
                      >
                        {selectedTransactions?.size === filteredTransactions?.length ? 'Deselect All' : 'Select All'}
                      </Button>
                    )}
                  </div>

                  {selectedTransactions?.size > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {selectedTransactions?.size} selected
                    </span>
                  )}
                </div>

                {filteredTransactions?.length === 0 ? (
                  <EmptyState onReset={handleResetFilters} />
                ) : (
                  <div className="space-y-3">
                    {filteredTransactions?.map(transaction => (
                      <TransactionRow
                        key={transaction?.id}
                        transaction={transaction}
                        onCategoryUpdate={handleCategoryUpdate}
                        onSelect={handleTransactionSelect}
                        isSelected={selectedTransactions?.has(transaction?.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <CategorySummary summaries={categorySummaries} />
            </div>
          </div>
        </div>
      </main>
      <BulkEditPanel
        selectedCount={selectedTransactions?.size}
        onBulkUpdate={handleBulkUpdate}
        onClearSelection={handleClearSelection}
      />
    </div>
  );
};

export default CategoryManagement;