import React, { useState } from 'react';
import type { ActivityEvent } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';
import { Filter, Download } from 'lucide-react';

const TYPE_FILTERS: Array<{ value: ActivityEvent['type'] | 'all'; label: string; color: string }> = [
  { value: 'all', label: 'All Events', color: 'var(--text-secondary)' },
  { value: 'purchase', label: 'Sales', color: 'var(--color-indigo-400)' },
  { value: 'signup', label: 'Sign-ups', color: 'var(--color-emerald-400)' },
  { value: 'upgrade', label: 'Upgrades', color: 'var(--color-violet-400)' },
  { value: 'refund', label: 'Refunds', color: 'var(--color-rose-400)' },
  { value: 'alert', label: 'Alerts', color: 'var(--color-amber-400)' },
];

interface ActivityPageProps {
  events: ActivityEvent[];
}

export const ActivityPage: React.FC<ActivityPageProps> = ({ events }) => {
  const [filter, setFilter] = useState<ActivityEvent['type'] | 'all'>('all');

  const filtered = filter === 'all' ? events : events.filter((e) => e.type === filter);

  const counts = {
    all: events.length,
    purchase: events.filter((e) => e.type === 'purchase').length,
    signup: events.filter((e) => e.type === 'signup').length,
    upgrade: events.filter((e) => e.type === 'upgrade').length,
    refund: events.filter((e) => e.type === 'refund').length,
    alert: events.filter((e) => e.type === 'alert').length,
  };

  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {TYPE_FILTERS.slice(1).map(({ value, label, color }) => {
          if (value === 'all') return null;
          return (
            <div key={value} className="card card--elevated card--interactive" onClick={() => setFilter(value)}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, color, fontFamily: 'JetBrains Mono, monospace' }}>{counts[value]}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>events in feed</div>
            </div>
          );
        })}
      </div>

      {/* Filter Bar + Feed */}
      <div className="card card--elevated">
        <div className="chart-header">
          <div>
            <h2 className="chart-title">Event Stream</h2>
            <p className="chart-subtitle">Real-time user activity feed</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Filter size={15} style={{ color: 'var(--text-tertiary)' }} />
            <div className="tabs" style={{ flex: 'unset' }}>
              {TYPE_FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  className={`tab${filter === value ? ' active' : ''}`}
                  onClick={() => setFilter(value)}
                >
                  {label}
                  <span style={{
                    marginLeft: 5,
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 999,
                    padding: '0 5px',
                    fontSize: 10,
                    fontWeight: 700,
                  }}>
                    {counts[value]}
                  </span>
                </button>
              ))}
            </div>
            <button className="btn btn--ghost btn--sm">
              <Download size={13} />
              Export
            </button>
          </div>
        </div>

        {/* Full Activity Feed */}
        <div className="activity-list" style={{ maxHeight: 'none' }}>
          {filtered.length === 0 ? (
            <div className="empty-state">No events match the selected filter.</div>
          ) : (
            filtered.map((event) => (
              <div key={event.id} className="activity-item">
                <div className="activity-item__avatar">
                  <img src={event.user.avatar} alt={event.user.name} loading="lazy" />
                </div>
                <div className="activity-item__content">
                  <p className="activity-item__text">
                    <strong>{event.user.name}</strong>
                    {' '}{event.action}{' '}
                    <strong>{event.target}</strong>
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{event.user.email}</p>
                  <p className="activity-item__time">{formatRelativeTime(event.timestamp)}</p>
                </div>
                <span className={`activity-item__badge activity-badge--${event.type}`}>
                  {event.type}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
