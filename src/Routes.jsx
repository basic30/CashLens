import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CategoryManagement from './pages/category-management';
import BudgetSettings from './pages/budget-settings';
import FinancialInsights from './pages/financial-insights';
import TransactionDashboard from './pages/transaction-dashboard';
import SMSPermissionSetup from './pages/sms-permission-setup';
import SubscriptionTracker from './pages/subscription-tracker';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<SMSPermissionSetup />} />
        <Route path="/category-management" element={<CategoryManagement />} />
        <Route path="/budget-settings" element={<BudgetSettings />} />
        <Route path="/financial-insights" element={<FinancialInsights />} />
        <Route path="/transaction-dashboard" element={<TransactionDashboard />} />
        <Route path="/sms-permission-setup" element={<SMSPermissionSetup />} />
        <Route path="/subscription-tracker" element={<SubscriptionTracker />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
