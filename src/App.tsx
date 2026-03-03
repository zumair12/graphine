import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewPage } from './components/pages/OverviewPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { PerformancePage } from './components/pages/PerformancePage';
import { ActivityPage } from './components/pages/ActivityPage';
import { useRealtimeData } from './hooks/useRealtimeData';
import type { NavSection, DateRange } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('overview');
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  const {
    kpiMetrics,
    trafficData,
    serverNodes,
    recentActivity,
    isLive,
    lastUpdated,
    toggleLive,
  } = useRealtimeData();

  const renderPage = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <OverviewPage
            kpiMetrics={kpiMetrics}
            recentActivity={recentActivity}
            dateRange={dateRange}
          />
        );
      case 'analytics':
        return (
          <AnalyticsPage
            trafficData={trafficData}
            dateRange={dateRange}
          />
        );
      case 'performance':
        return <PerformancePage serverNodes={serverNodes} />;
      case 'activity':
        return <ActivityPage events={recentActivity} />;
      default:
        return null;
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className="layout__sidebar">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Main Area */}
      <main className="layout__main">
        <Header
          activeSection={activeSection}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isLive={isLive}
          lastUpdated={lastUpdated}
          onToggleLive={toggleLive}
        />

        <div className="layout__content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
