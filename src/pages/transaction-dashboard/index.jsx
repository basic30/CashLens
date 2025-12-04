import React, { useState } from 'react';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import MonthlySpendingCard from './components/MonthlySpendingCard';
import CategoryPieChart from './components/CategoryPieChart';
import SpendingTrendsChart from './components/SpendingTrendsChart';
import TopMerchantsCard from './components/TopMerchantsCard';
import OverspendCategoryCard from './components/OverspendCategoryCard';
import RecentTransactionsList from './components/RecentTransactionsList';
import AIInsightsCard from './components/AIInsightsCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import DarkModeToggle from './components/DarkModeToggle';

const TransactionDashboard = () => {
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  const categoryData = [
    { name: "Food", value: 8500, percentage: 22 },
    { name: "Groceries", value: 6200, percentage: 16 },
    { name: "Travel", value: 5800, percentage: 15 },
    { name: "Bills", value: 4500, percentage: 12 },
    { name: "Entertainment", value: 4200, percentage: 11 },
    { name: "Shopping", value: 3800, percentage: 10 },
    { name: "Health", value: 3200, percentage: 8 },
    { name: "Others", value: 2300, percentage: 6 }
  ];

  const dailyData = [
    { name: "15 Nov", amount: 1200 },
    { name: "16 Nov", amount: 850 },
    { name: "17 Nov", amount: 1450 },
    { name: "18 Nov", amount: 980 },
    { name: "19 Nov", amount: 1650 },
    { name: "20 Nov", amount: 1100 },
    { name: "21 Nov", amount: 1380 }
  ];

  const weeklyData = [
    { name: "Week 1", amount: 8500 },
    { name: "Week 2", amount: 9200 },
    { name: "Week 3", amount: 7800 },
    { name: "Week 4", amount: 10200 }
  ];

  const monthlyData = [
    { name: "Aug", amount: 32500 },
    { name: "Sep", amount: 35800 },
    { name: "Oct", amount: 34200 },
    { name: "Nov", amount: 38500 }
  ];

  const topMerchants = [
    { id: 1, name: "Swiggy", category: "Food", amount: 4200, transactions: 18 },
    { id: 2, name: "Amazon", category: "Shopping", amount: 3800, transactions: 12 },
    { id: 3, name: "Uber", category: "Travel", amount: 2900, transactions: 15 },
    { id: 4, name: "BigBasket", category: "Groceries", amount: 2600, transactions: 8 },
    { id: 5, name: "Netflix", category: "Entertainment", amount: 1500, transactions: 3 }
  ];

  const recentTransactions = [
    {
      id: 1,
      merchant: "Swiggy",
      amount: 450,
      category: "Food",
      date: "21/11/2025",
      time: "09:30 AM",
      type: "expense"
    },
    {
      id: 2,
      merchant: "Salary Credit",
      amount: 75000,
      category: "Income",
      date: "20/11/2025",
      time: "11:45 PM",
      type: "income"
    },
    {
      id: 3,
      merchant: "Amazon",
      amount: 1299,
      category: "Shopping",
      date: "20/11/2025",
      time: "06:15 PM",
      type: "expense"
    },
    {
      id: 4,
      merchant: "Uber",
      amount: 285,
      category: "Travel",
      date: "20/11/2025",
      time: "02:30 PM",
      type: "expense"
    },
    {
      id: 5,
      merchant: "Apollo Pharmacy",
      amount: 850,
      category: "Health",
      date: "19/11/2025",
      time: "05:45 PM",
      type: "expense"
    },
    {
      id: 6,
      merchant: "BigBasket",
      amount: 1450,
      category: "Groceries",
      date: "19/11/2025",
      time: "10:20 AM",
      type: "expense"
    },
    {
      id: 7,
      merchant: "BookMyShow",
      amount: 600,
      category: "Entertainment",
      date: "18/11/2025",
      time: "08:00 PM",
      type: "expense"
    },
    {
      id: 8,
      merchant: "Electricity Bill",
      amount: 1200,
      category: "Bills",
      date: "18/11/2025",
      time: "03:15 PM",
      type: "expense"
    }
  ];

  const aiInsights = [
    {
      id: 1,
      type: "warning",
      title: "Food Spending Alert",
      description: "You've spent 45% more on food delivery this month compared to last month. Consider cooking at home 2-3 times per week to save ₹3,500.",
      action: "View Recommendations"
    },
    {
      id: 2,
      type: "success",
      title: "Great Progress!",
      description: "Your grocery spending is 18% below budget. You're on track to save ₹2,200 this month.",
      action: null
    },
    {
      id: 3,
      type: "tip",
      title: "Subscription Optimization",
      description: "You have 3 OTT subscriptions totaling ₹1,500/month. Consider family plans to save ₹600 monthly.",
      action: "Manage Subscriptions"
    },
    {
      id: 4,
      type: "info",
      title: "Savings Potential",
      description: "Based on your spending patterns, you could save an additional ₹8,500 this month by reducing discretionary expenses by 20%.",
      action: "See Breakdown"
    }
  ];

  const handleExportCSV = () => {
    const csvContent = [
      ["Date", "Merchant", "Category", "Amount", "Type"],
      ...recentTransactions?.map(t => [
        t?.date,
        t?.merchant,
        t?.category,
        t?.amount,
        t?.type
      ])
    ]?.map(row => row?.join(","))?.join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    link?.click();
    window.URL?.revokeObjectURL(url);

    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const handleEditTransaction = () => {
    alert("Transaction editing feature will open a modal to modify transaction details, category, and merchant information.");
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Transaction Dashboard</h1>
            <p className="text-muted-foreground">
              AI-powered insights into your spending patterns and financial health
            </p>
          </div>

          {showExportSuccess && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <span className="text-success text-lg">✓</span>
              </div>
              <p className="text-sm text-success font-medium">
                Transactions exported successfully!
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <MonthlySpendingCard 
                totalSpending={38500}
                monthlyChange={12.5}
                comparisonText="vs last month"
              />
            </div>
            <div className="lg:col-span-1">
              <OverspendCategoryCard
                category="Food"
                amount={8500}
                budgetLimit={6000}
                percentage={42}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <CategoryPieChart data={categoryData} />
            <SpendingTrendsChart 
              dailyData={dailyData}
              weeklyData={weeklyData}
              monthlyData={monthlyData}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1">
              <TopMerchantsCard merchants={topMerchants} />
            </div>
            <div className="lg:col-span-2">
              <RecentTransactionsList transactions={recentTransactions} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIInsightsCard insights={aiInsights} />
            </div>
            <div className="lg:col-span-1">
              <QuickActionsPanel 
                onExportCSV={handleExportCSV}
                onEditTransaction={handleEditTransaction}
              />
            </div>
          </div>
        </div>
      </main>

      <DarkModeToggle />
    </div>
  );
};

export default TransactionDashboard;