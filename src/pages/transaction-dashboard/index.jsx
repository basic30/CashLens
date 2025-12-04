import React, { useState, useMemo } from 'react';
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

// Helper functions for random data generation
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomAmount = (min, max) => Math.round(getRandomInt(min, max) / 10) * 10; // Round to nearest 10

const TransactionDashboard = () => {
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  // Use useMemo to generate data once on component mount (page load/refresh)
  const dashboardData = useMemo(() => {
    // 1. Generate Random Monthly Data
    const months = ["Aug", "Sep", "Oct", "Nov"];
    const monthlyData = months.map(name => ({
      name,
      amount: getRandomAmount(30000, 45000)
    }));
    const currentMonthSpending = monthlyData[monthlyData.length - 1].amount;
    const prevMonthSpending = monthlyData[monthlyData.length - 2].amount;
    const monthlyChange = (((currentMonthSpending - prevMonthSpending) / prevMonthSpending) * 100).toFixed(1);

    // 2. Generate Category Data
    const categories = ["Food", "Groceries", "Travel", "Bills", "Entertainment", "Shopping", "Health", "Others"];
    let remainingAmount = currentMonthSpending;
    const categoryData = categories.map((name, index) => {
      // Give random weights, ensure last one takes remainder or just approximate
      const isLast = index === categories.length - 1;
      const value = isLast ? Math.max(0, remainingAmount) : getRandomAmount(1000, Math.max(2000, remainingAmount / 2));
      remainingAmount -= value;
      return { name, value, percentage: 0 }; // Percentage calculated below
    }).filter(c => c.value > 0);
    
    // Recalculate total and percentages correctly
    const totalCat = categoryData.reduce((sum, item) => sum + item.value, 0);
    categoryData.forEach(item => item.percentage = Math.round((item.value / totalCat) * 100));
    categoryData.sort((a, b) => b.value - a.value); // Sort by highest spend

    // 3. Generate Daily & Weekly Data
    const dailyData = Array.from({ length: 7 }, (_, i) => ({
      name: `${15 + i} Nov`,
      amount: getRandomAmount(500, 2500)
    }));

    const weeklyData = Array.from({ length: 4 }, (_, i) => ({
      name: `Week ${i + 1}`,
      amount: getRandomAmount(7000, 12000)
    }));

    // 4. Generate Recent Transactions
    const merchantsList = [
      { name: "Swiggy", cat: "Food" }, { name: "Zomato", cat: "Food" },
      { name: "Amazon", cat: "Shopping" }, { name: "Flipkart", cat: "Shopping" },
      { name: "Uber", cat: "Travel" }, { name: "Ola", cat: "Travel" },
      { name: "BigBasket", cat: "Groceries" }, { name: "JioMart", cat: "Groceries" },
      { name: "Netflix", cat: "Entertainment" }, { name: "BookMyShow", cat: "Entertainment" },
      { name: "Apollo Pharmacy", cat: "Health" }, { name: "Electricity Bill", cat: "Bills" }
    ];

    const recentTransactions = Array.from({ length: 8 }, (_, i) => {
      const merchantObj = merchantsList[getRandomInt(0, merchantsList.length - 1)];
      const isIncome = Math.random() > 0.9; // 10% chance of income
      return {
        id: i + 1,
        merchant: isIncome ? "Salary/Refund" : merchantObj.name,
        amount: isIncome ? getRandomAmount(5000, 50000) : getRandomAmount(100, 5000),
        category: isIncome ? "Income" : merchantObj.cat,
        date: `${21 - i}/11/2025`,
        time: `${getRandomInt(1, 12)}:${getRandomInt(10, 59)} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        type: isIncome ? "income" : "expense"
      };
    });

    // 5. Generate Top Merchants
    const topMerchants = merchantsList.slice(0, 5).map((m, i) => ({
      id: i + 1,
      name: m.name,
      category: m.cat,
      amount: getRandomAmount(2000, 8000),
      transactions: getRandomInt(3, 20)
    })).sort((a, b) => b.amount - a.amount);

    // 6. Generate Insights (Shuffle basic templates)
    const possibleInsights = [
      { type: "warning", title: "Food Spending Alert", description: `You've spent ${getRandomInt(30, 60)}% more on food delivery this month.`, action: "View Recommendations" },
      { type: "success", title: "Great Progress!", description: `Your grocery spending is ${getRandomInt(10, 25)}% below budget.`, action: null },
      { type: "tip", title: "Subscription Optimization", description: `You have ${getRandomInt(2, 5)} active subscriptions. Review them to save money.`, action: "Manage Subscriptions" },
      { type: "info", title: "Savings Potential", description: `You could save an additional ₹${getRandomAmount(2000, 10000)} this month.`, action: "See Breakdown" },
      { type: "warning", title: "Unusual Activity", description: "A transaction of ₹15,000 was detected at an unknown merchant.", action: "Review" }
    ];
    // Pick random 3-4 insights
    const aiInsights = possibleInsights.sort(() => 0.5 - Math.random()).slice(0, 4).map((insight, i) => ({ ...insight, id: i + 1 }));

    // Find biggest overspend category
    const overspendCat = categoryData[0];
    const budgetLimit = Math.round(overspendCat.value * 0.8 / 100) * 100;

    return {
      monthlySpending: currentMonthSpending,
      monthlyChange,
      categoryData,
      dailyData,
      weeklyData,
      monthlyData,
      recentTransactions,
      topMerchants,
      aiInsights,
      overspend: {
        category: overspendCat.name,
        amount: overspendCat.value,
        budgetLimit: budgetLimit,
        percentage: Math.round(((overspendCat.value - budgetLimit) / budgetLimit) * 100) + 100 // simplistic calc for visual
      }
    };
  }, []);

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