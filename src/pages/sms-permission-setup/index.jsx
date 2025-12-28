import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PrivacyBadge from './components/PrivacyBadge';
import SetupStep from './components/SetupStep';
import SampleTransaction from './components/SampleTransaction';
import PermissionStatusCard from './components/PermissionStatusCard';

const SMSPermissionSetup = () => {
  const navigate = useNavigate();
  const [permissionStatus, setPermissionStatus] = useState('pending');
  const [currentStep, setCurrentStep] = useState(1);
  const [showSampleTransactions, setShowSampleTransactions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const privacyFeatures = [
    {
      icon: 'Shield',
      title: '100% Local Processing',
      description: 'All SMS data is processed directly on your device. Nothing is uploaded to any cloud server or external database.'
    },
    {
      icon: 'Lock',
      title: 'Zero Data Collection',
      description: 'We never store, transmit, or share your SMS messages. Only transaction amounts and categories are saved locally.'
    },
    {
      icon: 'Eye',
      title: 'Full Transparency',
      description: 'You can review, edit, or delete any transaction at any time. Complete control over your financial data.'
    },
    {
      icon: 'IndianRupee',
      title: 'UPI-Specific Parsing',
      description: 'Smart detection of Indian UPI transactions from banks like HDFC, ICICI, SBI, Paytm, PhonePe, and Google Pay.'
    }
  ];

  const setupSteps = [
    {
      stepNumber: 1,
      title: 'Grant SMS Permission',
      description: 'Click the button below to allow CashLens to read SMS messages for transaction detection.'
    },
    {
      stepNumber: 2,
      title: 'Automatic Parsing',
      description: 'Our AI will scan for UPI transaction alerts and extract amount, merchant, and date information.'
    },
    {
      stepNumber: 3,
      title: 'Smart Categorization',
      description: 'Transactions are automatically categorized using merchant names and machine learning algorithms.'
    },
    {
      stepNumber: 4,
      title: 'Start Tracking',
      description: 'View your dashboard with real-time spending insights and AI-powered financial recommendations.'
    }
  ];

  const sampleTransactions = [
    {
      merchant: 'Swiggy',
      amount: 485,
      category: 'Food',
      date: '21/11/2025 09:30 AM',
      upiId: 'swiggy@paytm'
    },
    {
      merchant: 'Amazon India',
      amount: 1299,
      category: 'Shopping',
      date: '20/11/2025 02:15 PM',
      upiId: 'amazon@icici'
    },
    {
      merchant: 'Uber',
      amount: 245,
      category: 'Travel',
      date: '19/11/2025 08:45 PM',
      upiId: 'uber@axisbank'
    }
  ];

  const handleGrantPermission = async () => {
    setIsProcessing(true);
    setCurrentStep(2);

    setTimeout(() => {
      setCurrentStep(3);
    }, 1500);

    setTimeout(() => {
      setCurrentStep(4);
    }, 3000);

    setTimeout(() => {
      setPermissionStatus('granted');
      setShowSampleTransactions(true);
      setIsProcessing(false);
    }, 4500);
  };

  const handleRetryPermission = () => {
    setPermissionStatus('pending');
    setCurrentStep(1);
    setShowSampleTransactions(false);
  };

  const handleContinueToDashboard = () => {
    navigate('/transaction-dashboard');
  };

  const handleSkipSetup = () => {
    navigate('/transaction-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
              <Icon name="MessageSquare" size={40} color="var(--color-primary)" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Enable SMS Access
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Grant SMS permission to automatically track your UPI expenses with zero manual effort. Your privacy is our top priority.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {privacyFeatures?.map((feature, index) => (
              <PrivacyBadge
                key={index}
                icon={feature?.icon}
                title={feature?.title}
                description={feature?.description}
              />
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Icon name="ListChecks" size={28} className="mr-3" color="var(--color-primary)" />
              Setup Process
            </h2>
            
            <div className="space-y-4 mb-8">
              {setupSteps?.map((step) => (
                <SetupStep
                  key={step?.stepNumber}
                  stepNumber={step?.stepNumber}
                  title={step?.title}
                  description={step?.description}
                  isActive={currentStep === step?.stepNumber}
                  isCompleted={currentStep > step?.stepNumber}
                />
              ))}
            </div>

            {permissionStatus === 'pending' && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="Shield"
                  iconPosition="left"
                  loading={isProcessing}
                  onClick={handleGrantPermission}
                >
                  {isProcessing ? 'Processing...' : 'Grant SMS Access'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSkipSetup}
                  className="sm:w-auto"
                >
                  Skip for Now
                </Button>
              </div>
            )}

            {permissionStatus === 'granted' && (
              <PermissionStatusCard
                status="granted"
                message="SMS permission granted successfully! CashLens can now automatically detect and categorize your UPI transactions. Your data remains completely private and local to your device."
                onRetry={handleRetryPermission}
              />
            )}

            {permissionStatus === 'denied' && (
              <PermissionStatusCard
                status="denied"
                message="SMS permission was denied. To enable automatic expense tracking, please grant SMS access. You can also manually add transactions from the dashboard."
                onRetry={handleRetryPermission}
              />
            )}
          </div>

          {showSampleTransactions && (
            <div className="bg-card border border-border rounded-xl p-8 mb-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center">
                  <Icon name="Sparkles" size={28} className="mr-3" color="var(--color-success)" />
                  Sample Transactions Detected
                </h2>
                <span className="text-sm font-medium text-success bg-success/10 px-3 py-1 rounded-full">
                  3 Found
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Here's how CashLens automatically categorizes your UPI transactions. These are sample transactions for demonstration purposes.
              </p>

              <div className="space-y-4">
                {sampleTransactions?.map((transaction, index) => (
                  <SampleTransaction
                    key={index}
                    merchant={transaction?.merchant}
                    amount={transaction?.amount}
                    category={transaction?.category}
                    date={transaction?.date}
                    upiId={transaction?.upiId}
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={handleContinueToDashboard}
                >
                  Continue to Dashboard
                </Button>
              </div>
            </div>
          )}

          <div className="bg-muted/30 border border-border rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Icon name="Info" size={24} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Privacy Policy Highlights
                </h3>
                <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <Icon name="Check" size={14} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-success)" />
                    <span>SMS messages are processed locally using browser-based JavaScript and never leave your device</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={14} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-success)" />
                    <span>Only transaction metadata (amount, merchant, category) is stored in browser localStorage</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={14} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-success)" />
                    <span>No personal information, SMS content, or sensitive data is transmitted to external servers</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={14} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-success)" />
                    <span>You can revoke SMS permission at any time from your browser settings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-card border-t border-border py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={18} color="var(--color-primary)" />
              </div>
              <span className="text-sm font-semibold text-foreground">CashLens</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} CashLens. Privacy-first expense tracking.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SMSPermissionSetup;