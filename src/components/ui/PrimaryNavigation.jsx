import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryNavigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/transaction-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'View spending overview'
    },
    {
      label: 'Insights',
      path: '/financial-insights',
      icon: 'TrendingUp',
      tooltip: 'AI-powered financial coaching'
    },
    {
      label: 'Categories',
      path: '/category-management',
      icon: 'FolderTree',
      tooltip: 'Manage transaction categories'
    },
    {
      label: 'Budget',
      path: '/budget-settings',
      icon: 'Wallet',
      tooltip: 'Configure spending limits'
    },
    {
      label: 'Subscriptions',
      path: '/subscription-tracker',
      icon: 'RefreshCw',
      tooltip: 'Track recurring payments'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/transaction-dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-transform hover:scale-105">
                  <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
                </div>
                <span className="text-xl font-semibold text-foreground">CashLens</span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium
                    transition-all duration-200 hover:scale-[1.02]
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                  title={item?.tooltip}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[200] lg:hidden"
          onClick={closeMobileMenu}
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" />
          
          <div
            className="fixed top-0 right-0 bottom-0 w-64 bg-card border-l border-border shadow-modal animate-slide-in"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-lg font-semibold text-foreground">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium
                    transition-colors
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
              <Link
                to="/sms-permission-setup"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Icon name="Settings" size={20} />
                <span>Setup</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrimaryNavigation;