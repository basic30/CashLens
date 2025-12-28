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
import { useData } from '../../context/DataContext';

const FinancialInsights = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const { insightsData: data } = useData();

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