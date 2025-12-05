import React, { createContext, useContext, useState, useMemo } from 'react';

const DataContext = createContext();

// Helper functions for random data
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomAmount = (min, max) => Math.round(getRandomInt(min, max) / 10) * 10;

export const DataProvider = ({ children }) => {
  // --- 1. Transaction Dashboard Data (Stable Random Generation) ---
  const dashboardData = useMemo(() => {
    // Generate Random Monthly Data
    const months = ["Aug", "Sep", "Oct", "Nov"];
    const monthlyData = months.map(name => ({
      name,
      amount: getRandomAmount(30000, 45000)
    }));
    const currentMonthSpending = monthlyData[monthlyData.length - 1].amount;
    const prevMonthSpending = monthlyData[monthlyData.length - 2].amount;
    const monthlyChange = (((currentMonthSpending - prevMonthSpending) / prevMonthSpending) * 100).toFixed(1);

    // Generate Category Data
    const categories = ["Food", "Groceries", "Travel", "Bills", "Entertainment", "Shopping", "Health", "Others"];
    let remainingAmount = currentMonthSpending;
    const categoryData = categories.map((name, index) => {
      const isLast = index === categories.length - 1;
      const value = isLast ? Math.max(0, remainingAmount) : getRandomAmount(1000, Math.max(2000, remainingAmount / 2));
      remainingAmount -= value;
      return { name, value, percentage: 0 };
    }).filter(c => c.value > 0);
    
    const totalCat = categoryData.reduce((sum, item) => sum + item.value, 0);
    categoryData.forEach(item => item.percentage = Math.round((item.value / totalCat) * 100));
    categoryData.sort((a, b) => b.value - a.value);

    // Generate Daily & Weekly Data
    const dailyData = Array.from({ length: 7 }, (_, i) => ({
      name: `${15 + i} Nov`,
      amount: getRandomAmount(500, 2500)
    }));

    const weeklyData = Array.from({ length: 4 }, (_, i) => ({
      name: `Week ${i + 1}`,
      amount: getRandomAmount(7000, 12000)
    }));

    // Generate Recent Transactions
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
      const isIncome = Math.random() > 0.9;
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

    // Generate Top Merchants
    const topMerchants = merchantsList.slice(0, 5).map((m, i) => ({
      id: i + 1,
      name: m.name,
      category: m.cat,
      amount: getRandomAmount(2000, 8000),
      transactions: getRandomInt(3, 20)
    })).sort((a, b) => b.amount - a.amount);

    // Generate Insights
    const possibleInsights = [
      { type: "warning", title: "Food Spending Alert", description: `You've spent ${getRandomInt(30, 60)}% more on food delivery this month.`, action: "View Recommendations" },
      { type: "success", title: "Great Progress!", description: `Your grocery spending is ${getRandomInt(10, 25)}% below budget.`, action: null },
      { type: "tip", title: "Subscription Optimization", description: `You have ${getRandomInt(2, 5)} active subscriptions. Review them to save money.`, action: "Manage Subscriptions" },
      { type: "info", title: "Savings Potential", description: `You could save an additional ₹${getRandomAmount(2000, 10000)} this month.`, action: "See Breakdown" },
      { type: "warning", title: "Unusual Activity", description: "A transaction of ₹15,000 was detected at an unknown merchant.", action: "Review" }
    ];
    const aiInsights = possibleInsights.sort(() => 0.5 - Math.random()).slice(0, 4).map((insight, i) => ({ ...insight, id: i + 1 }));

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
        percentage: Math.round(((overspendCat.value - budgetLimit) / budgetLimit) * 100) + 100
      }
    };
  }, []);

  // --- 2. Financial Insights Data (Stable Random Generation) ---
  const insightsData = useMemo(() => {
    const foodSpend = getRandomAmount(6000, 9000);
    const prevFoodSpend = Math.round(foodSpend * (1 - getRandomInt(20, 40)/100));
    
    const grocerySpend = getRandomAmount(3000, 5000);
    const groceryAvg = Math.round(grocerySpend * 1.15);

    const entBudget = 3000;
    const entSpend = getRandomAmount(3500, 6000);

    const aiInsights = [
      {
        id: 1,
        type: 'warning',
        icon: 'TrendingUp',
        title: 'Food Delivery Overspending Detected',
        description: `Your food delivery expenses increased by ${getRandomInt(30, 50)}% this month compared to last month.`,
        metrics: [
          { label: 'This Month', value: `₹${foodSpend.toLocaleString()}` },
          { label: 'Last Month', value: `₹${prevFoodSpend.toLocaleString()}` }
        ],
        recommendation: 'Consider meal planning and cooking at home 3-4 times per week.',
        potentialSavings: Math.round((foodSpend - prevFoodSpend) * 0.8)
      },
      {
        id: 2,
        type: 'success',
        icon: 'CheckCircle2',
        title: 'Excellent Grocery Management',
        description: `Your grocery spending is ${getRandomInt(10, 20)}% below average for your income bracket.`,
        metrics: [
          { label: 'Your Spend', value: `₹${grocerySpend.toLocaleString()}` },
          { label: 'Category Average', value: `₹${groceryAvg.toLocaleString()}` }
        ],
        recommendation: 'Great job! Continue using your current grocery shopping strategy.',
        potentialSavings: null
      },
      {
        id: 3,
        type: 'error',
        icon: 'AlertCircle',
        title: 'Entertainment Budget Exceeded',
        description: `You exceeded your entertainment budget by ₹${entSpend - entBudget} this month.`,
        metrics: [
          { label: 'Budget', value: `₹${entBudget.toLocaleString()}` },
          { label: 'Actual Spend', value: `₹${entSpend.toLocaleString()}` }
        ],
        recommendation: 'Review your entertainment subscriptions and movie outings.',
        potentialSavings: Math.round((entSpend - entBudget) * 0.8)
      },
      {
        id: 4,
        type: 'info',
        icon: 'Info',
        title: 'Travel Spending Pattern Analysis',
        description: 'Your cab and auto expenses show peak usage during weekends.',
        metrics: [
          { label: 'Weekend Avg', value: `₹${getRandomInt(400, 600)}` },
          { label: 'Weekday Avg', value: `₹${getRandomInt(150, 250)}` }
        ],
        recommendation: 'Consider using public transport or carpooling on weekends.',
        potentialSavings: getRandomAmount(800, 1500)
      }
    ].sort(() => 0.5 - Math.random());

    const savingsPotential = [
      { category: 'Food Delivery', currentSpend: foodSpend, optimizedSpend: prevFoodSpend, savingsPotential: foodSpend - prevFoodSpend, tips: ['Cook at home more', 'Use coupons'] },
      { category: 'Entertainment', currentSpend: entSpend, optimizedSpend: entBudget + 500, savingsPotential: entSpend - (entBudget + 500), tips: ['Cancel unused subs', 'Limit movies'] },
      { category: 'Transportation', currentSpend: getRandomAmount(5000, 7000), optimizedSpend: 4800, savingsPotential: getRandomAmount(1000, 2000), tips: ['Use Metro', 'Carpool'] },
    ];

    const anomalies = [
      { id: 1, severity: 'high', title: 'Unusual Large Transaction', description: 'Transaction 3x your average.', amount: getRandomAmount(10000, 20000), merchant: 'TechWorld Electronics', date: '18/11/2025', action: 'Report if unknown' },
      { id: 2, severity: 'medium', title: 'Multiple Small Transactions', description: '8 transactions under ₹100 detected.', amount: getRandomAmount(500, 800), merchant: 'Various', date: '15/11/2025', action: 'Review' },
      { id: 3, severity: 'low', title: 'Late Night Transaction', description: 'Transaction at 2:30 AM.', amount: getRandomAmount(1000, 3000), merchant: 'Gaming Site', date: '12/11/2025', action: 'Verify' }
    ].filter(() => Math.random() > 0.3);

    const goals = [
      { id: 1, title: 'Emergency Fund', category: 'Savings', icon: 'Shield', current: getRandomAmount(20000, 80000), target: 100000, deadline: '31/03/2026', daysLeft: 130, milestone: 'Keep going!' },
      { id: 2, title: 'Vacation', category: 'Travel', icon: 'Plane', current: getRandomAmount(5000, 30000), target: 35000, deadline: '15/12/2025', daysLeft: 24, milestone: null },
      { id: 3, title: 'Gadget', category: 'Electronics', icon: 'Laptop', current: getRandomAmount(10000, 60000), target: 75000, deadline: '28/02/2026', daysLeft: 99, milestone: 'Almost there!' }
    ];

    const score = getRandomInt(55, 85);
    const healthScore = {
      score: score,
      breakdown: [
        { category: 'Spending', score: getRandomInt(score - 10, score + 10) },
        { category: 'Savings', score: getRandomInt(score - 10, score + 10) },
        { category: 'Budget', score: getRandomInt(score - 10, score + 10) },
        { category: 'Debt', score: getRandomInt(score - 5, score + 15) },
        { category: 'Emergency', score: getRandomInt(score - 20, score) }
      ].map(b => ({...b, score: Math.min(100, Math.max(0, b.score))})),
      suggestions: [
        'Increase monthly savings by 5%',
        'Reduce discretionary spending',
        'Build emergency fund'
      ]
    };

    const trendData = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map(m => ({
      month: m,
      current: getRandomAmount(25000, 40000),
      previous: getRandomAmount(25000, 40000)
    }));

    return { aiInsights, savingsPotential, anomalies, goals, healthScore, trendData };
  }, []);

  // --- 3. Category Management Data (Persisted State) ---
  const [categoryTransactions, setCategoryTransactions] = useState(() => {
    const merchants = [
      { name: 'Swiggy', upi: 'swiggy@paytm', cat: 'Food' },
      { name: 'Zomato', upi: 'zomato@paytm', cat: 'Food' },
      { name: 'Uber', upi: 'uber@axis', cat: 'Travel' },
      { name: 'Ola', upi: 'ola@paytm', cat: 'Travel' },
      { name: 'Amazon', upi: 'amazon@icici', cat: 'Shopping' },
      { name: 'Flipkart', upi: 'flipkart@phonepe', cat: 'Shopping' },
      { name: 'BigBasket', upi: 'bb@paytm', cat: 'Groceries' },
      { name: 'JioMart', upi: 'jio@rel', cat: 'Groceries' },
      { name: 'Netflix', upi: 'netflix@paytm', cat: 'Entertainment' },
      { name: 'Spotify', upi: 'spotify@upi', cat: 'Entertainment' },
      { name: 'Apollo', upi: 'apollo@paytm', cat: 'Health' },
      { name: 'Bescom', upi: 'bescom@upi', cat: 'Bills' },
      { name: 'Salary', upi: 'corp@hdfc', cat: 'Income' }
    ];
    const count = getRandomInt(15, 20);
    return Array.from({ length: count }, (_, i) => {
      const merch = merchants[getRandomInt(0, merchants.length - 1)];
      const isIncome = merch.cat === 'Income';
      const type = isIncome ? 'credit' : 'debit';
      return {
        id: i + 1,
        date: `${getRandomInt(1, 30)}/11/2025`,
        merchant: merch.name,
        upiId: merch.upi,
        amount: isIncome ? getRandomAmount(30000, 80000) : getRandomAmount(100, 5000),
        type: type,
        category: merch.cat,
        confidence: getRandomInt(50, 100)
      };
    });
  });

  // --- 4. Budget Settings (Persisted State) ---
  const [budgetCategories, setBudgetCategories] = useState([
    { category: 'Food', icon: 'UtensilsCrossed', currentSpending: 8500, budgetLimit: 10000, alertThreshold: 80 },
    { category: 'Groceries', icon: 'ShoppingCart', currentSpending: 6200, budgetLimit: 7000, alertThreshold: 85 },
    { category: 'Travel', icon: 'Car', currentSpending: 4800, budgetLimit: 5000, alertThreshold: 90 },
    { category: 'Bills', icon: 'FileText', currentSpending: 3200, budgetLimit: 3500, alertThreshold: 80 },
    { category: 'Entertainment', icon: 'Film', currentSpending: 2800, budgetLimit: 3000, alertThreshold: 85 },
    { category: 'Shopping', icon: 'ShoppingBag', currentSpending: 5600, budgetLimit: 5000, alertThreshold: 80 },
    { category: 'Health', icon: 'Heart', currentSpending: 1800, budgetLimit: 2500, alertThreshold: 75 },
    { category: 'Others', icon: 'MoreHorizontal', currentSpending: 2100, budgetLimit: 3000, alertThreshold: 80 }
  ]);
  const [notificationPreferences, setNotificationPreferences] = useState({
    push: true, email: true, sms: false, frequency: 'instant', defaultThreshold: '80', anomalyDetection: true, fraudDetection: true, budgetExceed: true
  });
  const [anomalySettings, setAnomalySettings] = useState({
    sensitivity: 'medium', threshold: '200', unusualAmount: true, unusualTime: true, unusualMerchant: true, multipleTransactions: true, geographicAnomaly: false
  });

  // --- 5. Subscription Tracker (Persisted State) ---
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: "Netflix Premium", category: "Entertainment", amount: 649, frequency: "monthly", nextPayment: "2025-12-15", status: "active", usagePercentage: 85, icon: "Tv" },
    { id: 2, name: "Spotify Premium", category: "Entertainment", amount: 119, frequency: "monthly", nextPayment: "2025-12-10", status: "active", usagePercentage: 92, icon: "Music" },
    { id: 3, name: "Amazon Prime", category: "Entertainment", amount: 1499, frequency: "yearly", nextPayment: "2026-03-20", status: "active", usagePercentage: 78, icon: "Package" },
    { id: 4, name: "Adobe Creative Cloud", category: "Productivity", amount: 1675, frequency: "monthly", nextPayment: "2025-12-05", status: "active", usagePercentage: 65, icon: "Cloud" },
    { id: 5, name: "Gym Membership", category: "Fitness & Health", amount: 2500, frequency: "monthly", nextPayment: "2025-12-01", status: "unused", usagePercentage: 15, icon: "Dumbbell" },
    { id: 6, name: "Disney+ Hotstar", category: "Entertainment", amount: 299, frequency: "monthly", nextPayment: "2025-12-18", status: "unused", usagePercentage: 22, icon: "Tv" },
    { id: 7, name: "LinkedIn Premium", category: "Productivity", amount: 1699, frequency: "monthly", nextPayment: "2025-12-12", status: "unused", usagePercentage: 8, icon: "Briefcase" },
    { id: 8, name: "Coursera Plus", category: "Education", amount: 3999, frequency: "yearly", nextPayment: "2026-02-15", status: "suspected", usagePercentage: 45, confidenceScore: 87, icon: "GraduationCap" },
    { id: 9, name: "Notion Pro", category: "Productivity", amount: 399, frequency: "monthly", nextPayment: "2025-12-08", status: "suspected", usagePercentage: 60, confidenceScore: 92, icon: "FileText" },
    { id: 10, name: "YouTube Premium", category: "Entertainment", amount: 129, frequency: "monthly", nextPayment: "2025-11-28", status: "cancelled", usagePercentage: 0, icon: "Youtube" }
  ]);

  const value = {
    dashboardData,
    insightsData,
    categoryTransactions,
    setCategoryTransactions,
    budgetCategories,
    setBudgetCategories,
    notificationPreferences,
    setNotificationPreferences,
    anomalySettings,
    setAnomalySettings,
    subscriptions,
    setSubscriptions
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};