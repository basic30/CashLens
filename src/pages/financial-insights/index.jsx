import React, { useState } from 'react';
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

const FinancialInsights = () => {
  const [activeTab, setActiveTab] = useState('insights');

  const aiInsights = [
    {
      id: 1,
      type: 'warning',
      icon: 'TrendingUp',
      title: 'Food Delivery Overspending Detected',
      description: 'Your food delivery expenses increased by 45% this month compared to last month. You spent ₹8,450 on Swiggy and Zomato orders.',
      metrics: [
        { label: 'This Month', value: '₹8,450' },
        { label: 'Last Month', value: '₹5,820' }
      ],
      recommendation: 'Consider meal planning and cooking at home 3-4 times per week. This could reduce your monthly food delivery costs by 40%.',
      potentialSavings: 3380
    },
    {
      id: 2,
      type: 'success',
      icon: 'CheckCircle2',
      title: 'Excellent Grocery Management',
      description: 'Your grocery spending is 15% below average for your income bracket. You maintained consistent spending of ₹4,200 monthly.',
      metrics: [
        { label: 'Your Spend', value: '₹4,200' },
        { label: 'Category Average', value: '₹4,950' }
      ],
      recommendation: 'Great job! Continue using your current grocery shopping strategy. Consider sharing your tips with friends.',
      potentialSavings: null
    },
    {
      id: 3,
      type: 'error',
      icon: 'AlertCircle',
      title: 'Entertainment Budget Exceeded',
      description: 'You exceeded your entertainment budget by ₹2,800 this month. Major expenses include movie tickets, concerts, and gaming subscriptions.',
      metrics: [
        { label: 'Budget', value: '₹3,000' },
        { label: 'Actual Spend', value: '₹5,800' }
      ],
      recommendation: 'Review your entertainment subscriptions. Cancel unused services and limit movie outings to twice per month.',
      potentialSavings: 1500
    },
    {
      id: 4,
      type: 'info',
      icon: 'Info',
      title: 'Travel Spending Pattern Analysis',
      description: 'Your cab and auto expenses show peak usage during weekends. Average daily spend: ₹450 on weekends vs ₹180 on weekdays.',
      metrics: [
        { label: 'Weekend Avg', value: '₹450' },
        { label: 'Weekday Avg', value: '₹180' }
      ],
      recommendation: 'Consider using public transport or carpooling on weekends. This could save approximately ₹1,080 monthly.',
      potentialSavings: 1080
    }
  ];

  const savingsPotential = [
    {
      category: 'Food Delivery',
      currentSpend: 8450,
      optimizedSpend: 5070,
      savingsPotential: 3380,
      tips: [
        'Cook at home 4 times per week instead of ordering',
        'Use discount coupons and cashback offers when ordering',
        'Batch cook meals on weekends to reduce weekday temptation'
      ]
    },
    {
      category: 'Entertainment',
      currentSpend: 5800,
      optimizedSpend: 3500,
      savingsPotential: 2300,
      tips: [
        'Cancel unused OTT subscriptions (identified 3 unused services)',
        'Limit movie theater visits to twice per month',
        'Explore free entertainment options like parks and community events'
      ]
    },
    {
      category: 'Transportation',
      currentSpend: 6200,
      optimizedSpend: 4800,
      savingsPotential: 1400,
      tips: [
        'Use metro/bus for daily commute instead of cabs',
        'Carpool with colleagues 3 days per week',
        'Walk or cycle for distances under 2km'
      ]
    },
    {
      category: 'Shopping',
      currentSpend: 4500,
      optimizedSpend: 3200,
      savingsPotential: 1300,
      tips: [
        'Wait 24 hours before making impulse purchases',
        'Use price comparison apps before buying',
        'Shop during sale seasons for non-urgent items'
      ]
    }
  ];

  const anomalies = [
    {
      id: 1,
      severity: 'high',
      title: 'Unusual Large Transaction',
      description: 'A transaction of ₹15,000 was detected at an electronics store, which is 3x your average purchase amount.',
      amount: 15000,
      merchant: 'TechWorld Electronics',
      date: '18/11/2025',
      action: 'If this was not you, please report this transaction immediately and contact your bank.'
    },
    {
      id: 2,
      severity: 'medium',
      title: 'Multiple Small Transactions',
      description: '8 transactions under ₹100 detected within 2 hours at different locations.',
      amount: 640,
      merchant: 'Various Merchants',
      date: '15/11/2025',
      action: 'Review these transactions to ensure they are legitimate.'
    },
    {
      id: 3,
      severity: 'low',
      title: 'Late Night Transaction',
      description: 'Transaction made at 2:30 AM, which is outside your typical spending hours.',
      amount: 2500,
      merchant: 'Online Gaming Platform',
      date: '12/11/2025',
      action: 'Verify this transaction if you do not recognize it.'
    }
  ];

  const goals = [
    {
      id: 1,
      title: 'Emergency Fund',
      category: 'Savings',
      icon: 'Shield',
      current: 45000,
      target: 100000,
      deadline: '31/03/2026',
      daysLeft: 130,
      milestone: 'Halfway there! Keep up the great work!'
    },
    {
      id: 2,
      title: 'Vacation to Goa',
      category: 'Travel',
      icon: 'Plane',
      current: 18000,
      target: 35000,
      deadline: '15/12/2025',
      daysLeft: 24,
      milestone: null
    },
    {
      id: 3,
      title: 'New Laptop',
      category: 'Electronics',
      icon: 'Laptop',
      current: 52000,
      target: 75000,
      deadline: '28/02/2026',
      daysLeft: 99,
      milestone: '70% complete! Almost there!'
    },
    {
      id: 4,
      title: 'Reduce Food Delivery',
      category: 'Expense Reduction',
      icon: 'Target',
      current: 3200,
      target: 3000,
      deadline: '30/11/2025',
      daysLeft: 9,
      milestone: 'Final push! You can do it!'
    }
  ];

  const healthScore = {
    score: 72,
    breakdown: [
      { category: 'Spending Control', score: 68 },
      { category: 'Savings Rate', score: 75 },
      { category: 'Budget Adherence', score: 65 },
      { category: 'Debt Management', score: 85 },
      { category: 'Emergency Fund', score: 70 }
    ],
    suggestions: [
      'Increase your monthly savings by 5% to reach the recommended 20% savings rate',
      'Reduce discretionary spending in Food Delivery and Entertainment categories',
      'Build your emergency fund to cover 6 months of expenses',
      'Review and optimize your subscription services to eliminate unused ones',
      'Set up automatic transfers to savings account on salary day'
    ]
  };

  const trendData = [
    { month: 'Jun', current: 28500, previous: 26800 },
    { month: 'Jul', current: 31200, previous: 28500 },
    { month: 'Aug', current: 29800, previous: 31200 },
    { month: 'Sep', current: 33500, previous: 29800 },
    { month: 'Oct', current: 35200, previous: 33500 },
    { month: 'Nov', current: 38400, previous: 35200 }
  ];

  const handleExportCSV = () => {
    const csvContent = `Financial Insights Report - November 2025\n\nAI Insights Summary:\n${aiInsights?.map(insight => `${insight?.title},${insight?.description}`)?.join('\n')}\n\nSavings Potential:\nTotal Monthly Savings: ₹${savingsPotential?.reduce((sum, item) => sum + item?.savingsPotential, 0)?.toLocaleString('en-IN')}\n\nFinancial Health Score: ${healthScore?.score}/100`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `financial-insights-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    window.URL?.revokeObjectURL(url);
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
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap
                    ${activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'insights' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <SpendingTrendChart 
                    data={trendData} 
                    title="Monthly Spending Trend Comparison"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Personalized AI Insights</h2>
                {aiInsights?.map((insight) => (
                  <InsightCard key={insight?.id} insight={insight} />
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
                      Based on your spending patterns, you could save up to ₹{savingsPotential?.reduce((sum, item) => sum + item?.savingsPotential, 0)?.toLocaleString('en-IN')} per month by implementing our AI recommendations.
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
                      ₹{savingsPotential?.reduce((sum, item) => sum + item?.savingsPotential, 0)?.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {savingsPotential?.map((item, index) => (
                  <SavingsPotentialCard key={index} {...item} />
                ))}
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Annual Impact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Yearly Savings</p>
                    <p className="text-3xl font-bold text-primary">
                      ₹{(savingsPotential?.reduce((sum, item) => sum + item?.savingsPotential, 0) * 12)?.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Current Annual Spend</p>
                    <p className="text-3xl font-bold text-foreground">
                      ₹{(savingsPotential?.reduce((sum, item) => sum + item?.currentSpend, 0) * 12)?.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Optimized Annual Spend</p>
                    <p className="text-3xl font-bold text-success">
                      ₹{(savingsPotential?.reduce((sum, item) => sum + item?.optimizedSpend, 0) * 12)?.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
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
                      We monitor your transactions for unusual patterns and potential fraud. Review these flagged transactions carefully.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-error/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">High Severity</p>
                    <p className="text-2xl font-bold text-error">
                      {anomalies?.filter(a => a?.severity === 'high')?.length}
                    </p>
                  </div>
                  <div className="bg-warning/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Medium Severity</p>
                    <p className="text-2xl font-bold text-warning">
                      {anomalies?.filter(a => a?.severity === 'medium')?.length}
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Low Severity</p>
                    <p className="text-2xl font-bold text-primary">
                      {anomalies?.filter(a => a?.severity === 'low')?.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {anomalies?.map((anomaly) => (
                  <AnomalyCard key={anomaly?.id} anomaly={anomaly} />
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">How We Detect Anomalies</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Transactions significantly larger than your average spending</li>
                      <li>• Multiple transactions in unusual time periods or locations</li>
                      <li>• Spending patterns that deviate from your historical behavior</li>
                      <li>• Transactions at merchants you have never used before</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Financial Goals</h2>
                  <p className="text-muted-foreground">Track your progress towards savings and spending targets</p>
                </div>
                <Link to="/budget-settings">
                  <Button variant="default" iconName="Plus" iconPosition="left">
                    Create New Goal
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {goals?.map((goal) => (
                  <GoalCard key={goal?.id} goal={goal} />
                ))}
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Goal Achievement Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Icon name="Target" size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Set Realistic Targets</h4>
                      <p className="text-sm text-muted-foreground">Break large goals into smaller milestones</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-success/10 p-2 rounded-lg flex-shrink-0">
                      <Icon name="Calendar" size={20} color="var(--color-success)" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Automate Savings</h4>
                      <p className="text-sm text-muted-foreground">Set up automatic transfers on payday</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-warning/10 p-2 rounded-lg flex-shrink-0">
                      <Icon name="TrendingUp" size={20} color="var(--color-warning)" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Track Progress</h4>
                      <p className="text-sm text-muted-foreground">Review your goals weekly to stay motivated</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 p-2 rounded-lg flex-shrink-0">
                      <Icon name="Award" size={20} color="var(--color-accent)" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Celebrate Milestones</h4>
                      <p className="text-sm text-muted-foreground">Reward yourself for achieving targets</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <FinancialHealthScore 
                    score={healthScore?.score}
                    breakdown={healthScore?.breakdown}
                    suggestions={healthScore?.suggestions}
                  />
                </div>

                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Link to="/budget-settings" className="block">
                        <Button variant="outline" fullWidth iconName="Settings" iconPosition="left">
                          Adjust Budgets
                        </Button>
                      </Link>
                      <Link to="/subscription-tracker" className="block">
                        <Button variant="outline" fullWidth iconName="RefreshCw" iconPosition="left">
                          Review Subscriptions
                        </Button>
                      </Link>
                      <Link to="/category-management" className="block">
                        <Button variant="outline" fullWidth iconName="FolderTree" iconPosition="left">
                          Manage Categories
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-success/10 border border-success/20 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="TrendingUp" size={24} color="var(--color-success)" />
                      <h4 className="text-sm font-semibold text-foreground">Score Improved</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your financial health score increased by 8 points this month!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Keep up the great work with your spending control.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Understanding Your Score</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      <span className="text-sm font-medium text-foreground">80-100</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Excellent financial health with strong savings and spending control</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-sm font-medium text-foreground">60-79</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Good financial health with room for improvement</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-warning" />
                      <span className="text-sm font-medium text-foreground">40-59</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Fair financial health requiring attention and optimization</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-error" />
                      <span className="text-sm font-medium text-foreground">0-39</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Needs immediate improvement with significant changes required</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-lg font-semibold text-foreground">CashLens</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} CashLens. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FinancialInsights;