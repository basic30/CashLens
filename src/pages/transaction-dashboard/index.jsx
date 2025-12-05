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
import { useData } from '../../context/DataContext';

const TransactionDashboard = () => {
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  // Get data from global context instead of generating it locally
  const { dashboardData } = useData();

  const handleExportCSV = () => {
    const csvContent = [
      ["Date", "Merchant", "Category", "Amount", "Type"],
      ...dashboardData.recentTransactions.map(t => [
        t.date,
        t.merchant,
        t.category,
        t.amount,
        t.type
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

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
                totalSpending={dashboardData.monthlySpending}
                monthlyChange={dashboardData.monthlyChange}
                comparisonText="vs last month"
              />
            </div>
            <div className="lg:col-span-1">
              <OverspendCategoryCard
                category={dashboardData.overspend.category}
                amount={dashboardData.overspend.amount}
                budgetLimit={dashboardData.overspend.budgetLimit}
                percentage={dashboardData.overspend.percentage}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <CategoryPieChart data={dashboardData.categoryData} />
            <SpendingTrendsChart 
              dailyData={dashboardData.dailyData}
              weeklyData={dashboardData.weeklyData}
              monthlyData={dashboardData.monthlyData}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1">
              <TopMerchantsCard merchants={dashboardData.topMerchants} />
            </div>
            <div className="lg:col-span-2">
              <RecentTransactionsList transactions={dashboardData.recentTransactions} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIInsightsCard insights={dashboardData.aiInsights} />
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