import React from 'react';
import { Bell, Search, Download } from 'lucide-react';
import { formatTime } from '../../utils/formatters';
import type { NavSection, DateRange } from '../../types';

interface HeaderProps {
  activeSection: NavSection;
  dateRange: DateRange;
  onDateRangeChange: (r: DateRange) => void;
  isLive: boolean;
  lastUpdated: Date;
  onToggleLive: () => void;
}

const SECTION_LABELS: Record<NavSection, { title: string; subtitle: string }> = {
  overview: { title: 'Overview', subtitle: 'Real-time business snapshot' },
  analytics: { title: 'Analytics', subtitle: 'Traffic & conversion insights' },
  performance: { title: 'Performance', subtitle: 'System health & infrastructure' },
  activity: { title: 'Activity Feed', subtitle: 'Live user events stream' },
};

const DATE_RANGES: { value: DateRange; label: string }[] = [
  { value: '24h', label: 'Last 24h' },
  { value: '7d', label: 'Last 7d' },
  { value: '30d', label: 'Last 30d' },
  { value: '90d', label: 'Last 90d' },
  { value: '1y', label: 'Last year' },
];

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  dateRange,
  onDateRangeChange,
  isLive,
  lastUpdated,
  onToggleLive,
}) => {
  const { title, subtitle } = SECTION_LABELS[activeSection];

  return (
    <header className="header">
      <div>
        <h1 className="header__title">{title}</h1>
        <p className="header__subtitle">{subtitle}</p>
      </div>

      <div className="header__spacer" />

      <div className="header__actions">
        {/* Date Range Select */}
        <select
          className="select"
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value as DateRange)}
          aria-label="Date range"
        >
          {DATE_RANGES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Live Badge */}
        <button
          className={`live-badge ${isLive ? 'live-badge--active' : 'live-badge--paused'}`}
          onClick={onToggleLive}
          title={isLive ? `Last updated: ${formatTime(lastUpdated)}` : 'Click to resume live updates'}
          aria-label={isLive ? 'Pause live updates' : 'Resume live updates'}
        >
          <span className="live-badge__dot" />
          {isLive ? 'Live' : 'Paused'}
        </button>

        {/* Search */}
        <button className="btn btn--ghost btn--icon" aria-label="Search">
          <Search size={16} />
        </button>

        {/* Notifications */}
        <button className="btn btn--ghost btn--icon" aria-label="Notifications" style={{ position: 'relative' }}>
          <Bell size={16} />
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 7, height: 7, borderRadius: '50%',
            background: '#6366f1', border: '1.5px solid var(--surface-0)',
          }} />
        </button>

        {/* Export */}
        <button className="btn btn--primary btn--sm" aria-label="Export data">
          <Download size={14} />
          Export
        </button>
      </div>
    </header>
  );
};
