import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import InsightCard from './components/InsightCard';
import SavingsPotentialCard from './components/SavingsPotentialCard';
import AnomalyCard from './components/AnomalyCard';
import GoalCard from './components/GoalCard';
import FinancialHealthScore from './components/FinancialHealthScore';
import SpendingTrendChart from './components/SpendingTrendChart';

// Random helper
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomAmount = (min, max) => Math.round(getRandomInt(min, max) / 100) * 100;

const FinancialInsights = () => {
  const [activeTab, setActiveTab] = useState('insights');

  // Randomize data on component mount
  const data = useMemo(() => {
    // Random AI Insights
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
    ].sort(() => 0.5 - Math.random()); // Shuffle insights

    // Savings Potential
    const savingsPotential = [
      { category: 'Food Delivery', currentSpend: foodSpend, optimizedSpend: prevFoodSpend, savingsPotential: foodSpend - prevFoodSpend, tips: ['Cook at home more', 'Use coupons'] },
      { category: 'Entertainment', currentSpend: entSpend, optimizedSpend: entBudget + 500, savingsPotential: entSpend - (entBudget + 500), tips: ['Cancel unused subs', 'Limit movies'] },
      { category: 'Transportation', currentSpend: getRandomAmount(5000, 7000), optimizedSpend: 4800, savingsPotential: getRandomAmount(1000, 2000), tips: ['Use Metro', 'Carpool'] },
    ];

    // Anomalies
    const anomalies = [
      { id: 1, severity: 'high', title: 'Unusual Large Transaction', description: 'Transaction 3x your average.', amount: getRandomAmount(10000, 20000), merchant: 'TechWorld Electronics', date: '18/11/2025', action: 'Report if unknown' },
      { id: 2, severity: 'medium', title: 'Multiple Small Transactions', description: '8 transactions under ₹100 detected.', amount: getRandomAmount(500, 800), merchant: 'Various', date: '15/11/2025', action: 'Review' },
      { id: 3, severity: 'low', title: 'Late Night Transaction', description: 'Transaction at 2:30 AM.', amount: getRandomAmount(1000, 3000), merchant: 'Gaming Site', date: '12/11/2025', action: 'Verify' }
    ].filter(() => Math.random() > 0.3); // Randomly show 1-3 anomalies

    // Goals
    const goals = [
      { id: 1, title: 'Emergency Fund', category: 'Savings', icon: 'Shield', current: getRandomAmount(20000, 80000), target: 100000, deadline: '31/03/2026', daysLeft: 130, milestone: 'Keep going!' },
      { id: 2, title: 'Vacation', category: 'Travel', icon: 'Plane', current: getRandomAmount(5000, 30000), target: 35000, deadline: '15/12/2025', daysLeft: 24, milestone: null },
      { id: 3, title: 'Gadget', category: 'Electronics', icon: 'Laptop', current: getRandomAmount(10000, 60000), target: 75000, deadline: '28/02/2026', daysLeft: 99, milestone: 'Almost there!' }
    ];

    // Health Score
    const score = getRandomInt(55, 85);
    const healthScore = {
      score: score,
      breakdown: [
        { category: 'Spending', score: getRandomInt(score - 10, score + 10) },
        { category: 'Savings', score: getRandomInt(score - 10, score + 10) },
        { category: 'Budget', score: getRandomInt(score - 10, score + 10) },
        { category: 'Debt', score: getRandomInt(score - 5, score + 15) },
        { category: 'Emergency', score: getRandomInt(score - 20, score) }
      ].map(b => ({...b, score: Math.min(100, Math.max(0, b.score))})), // Clamp 0-100
      suggestions: [
        'Increase monthly savings by 5%',
        'Reduce discretionary spending',
        'Build emergency fund'
      ]
    };

    // Trend Data
    const trendData = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map(m => ({
      month: m,
      current: getRandomAmount(25000, 40000),
      previous: getRandomAmount(25000, 40000)
    }));

    return { aiInsights, savingsPotential, anomalies, goals, healthScore, trendData };
  }, []);

  const handleExportCSV = () => {
    alert("Export functionality simulated.");
  };

  const tabs = [
    { id: 'insights', label: 'AI Insights', icon: 'Brain' },
    { id: 'savings', label: 'Savings Potential', icon: 'PiggyBank' },
    { id: 'anomalies', label: 'Anomalies', icon: 'AlertTriangle' },
    { id: 'goals', label: 'Goals', icon: 'Target' },
    { id: 'health', label: 'Health Score', icon: 'Activity' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Financial Insights</h1>
              <p className="text-muted-foreground">AI-powered financial coaching and personalized recommendations</p>
            </div>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={handleExportCSV}
            >
              Export Report
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-1 mb-8 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <Icon name={tab.icon} size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'insights' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <SpendingTrendChart 
                    data={data.trendData} 
                    title="Monthly Spending Trend Comparison"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Personalized AI Insights</h2>
                {data.aiInsights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg flex-shrink-0">
                    <Icon name="Sparkles" size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Monthly Summary</h3>
                    <p className="text-muted-foreground mb-4">
                      Based on your spending patterns, you could save up to ₹{data.savingsPotential.reduce((sum, item) => sum + item.savingsPotential, 0).toLocaleString('en-IN')} per month.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/budget-settings">
                        <Button variant="default" size="sm" iconName="Settings" iconPosition="left">
                          Adjust Budgets
                        </Button>
                      </Link>
                      <Link to="/category-management">
                        <Button variant="outline" size="sm" iconName="FolderTree" iconPosition="left">
                          Review Categories
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'savings' && (
            <div className="space-y-6">
              <div className="bg-success/10 border border-success/20 rounded-lg p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Total Savings Potential</h2>
                    <p className="text-muted-foreground">Optimize your spending across these categories</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Monthly Savings</p>
                    <p className="text-4xl font-bold text-success">
                      ₹{data.savingsPotential.reduce((sum, item) => sum + item.savingsPotential, 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.savingsPotential.map((item, index) => (
                  <SavingsPotentialCard key={index} {...item} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'anomalies' && (
            <div className="space-y-6">
               <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-error/10 p-3 rounded-lg flex-shrink-0">
                    <Icon name="Shield" size={24} color="var(--color-error)" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Fraud Detection & Anomalies</h2>
                    <p className="text-muted-foreground">
                      We monitor your transactions for unusual patterns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {data.anomalies.length > 0 ? data.anomalies.map((anomaly) => (
                  <AnomalyCard key={anomaly.id} anomaly={anomaly} />
                )) : (
                  <div className="text-center p-8 text-muted-foreground">No anomalies detected in recent transactions.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.goals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <FinancialHealthScore 
                    score={data.healthScore.score}
                    breakdown={data.healthScore.breakdown}
                    suggestions={data.healthScore.suggestions}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FinancialInsights;