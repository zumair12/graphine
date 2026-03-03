import React, { useState } from 'react';
import { TrafficBarChart, ComposedRevenueChart } from '../charts/RechartsCharts';
import { DonutChart } from '../charts/DonutChart';
import type { TrafficDataPoint, DateRange } from '../../types';
import { REVENUE_DATA, ACQUISITION_DATA, REGION_DATA } from '../../data/mockData';
import { formatNumber, formatCurrency } from '../../utils/formatters';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const RETENTION_DATA = [
  { week: 'Wk 1', w1: 100, w2: 72, w3: 58, w4: 49 },
  { week: 'Wk 2', w1: 100, w2: 69, w3: 54, w4: 44 },
  { week: 'Wk 3', w1: 100, w2: 74, w3: 61, w4: 52 },
  { week: 'Wk 4', w1: 100, w2: 71, w3: 57, w4: 47 },
  { week: 'Wk 5', w1: 100, w2: 76, w3: 63, w4: 54 },
  { week: 'Wk 6', w1: 100, w2: 78, w3: 66, w4: 57 },
];

const RetentionTooltip: React.FC<{ active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="chart-tooltip__item">
          <span className="chart-tooltip__name">
            <span className="chart-legend__dot" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="chart-tooltip__value">{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

interface AnalyticsPageProps {
  trafficData: TrafficDataPoint[];
  dateRange: DateRange;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ trafficData, dateRange }) => {
  const [cohortTab, setCohortTab] = useState<'sessions' | 'users'>('sessions');

  const totalSessions = trafficData.reduce((s, d) => s + d.desktop + d.mobile + d.tablet, 0);
  const peakHour = trafficData.reduce((max, d) => {
    const total = d.desktop + d.mobile + d.tablet;
    const maxTotal = max.desktop + max.mobile + max.tablet;
    return total > maxTotal ? d : max;
  }, trafficData[0]);

  return (
    <div className="dashboard">
      {/* Summary stats */}
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Sessions', value: formatNumber(totalSessions, true), sub: `Peak: ${peakHour?.hour}`, color: '#6366f1' },
          { label: 'Avg. Session Duration', value: '4m 32s', sub: '+12% vs last period', color: '#8b5cf6' },
          { label: 'Bounce Rate', value: '34.2%', sub: '-2.1% vs last period', color: '#10b981' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="card card--elevated">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: '10px 0 4px', color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace' }}>
              <span style={{ color }}>{value}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Traffic by Device + Revenue Composed */}
      <div className="grid-2">
        <div className="card card--elevated">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Device Traffic</h2>
              <p className="chart-subtitle">Hourly breakdown · {dateRange}</p>
            </div>
            <div className="chart-legend">
              {[['Desktop', '#6366f1'], ['Mobile', '#8b5cf6'], ['Tablet', '#06b6d4']].map(([name, color]) => (
                <div key={name} className="chart-legend__item">
                  <span className="chart-legend__dot" style={{ background: color }} />
                  {name}
                </div>
              ))}
            </div>
          </div>
          <TrafficBarChart data={trafficData} />
        </div>

        <div className="card card--elevated">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Revenue vs Expenses</h2>
              <p className="chart-subtitle">Monthly comparison</p>
            </div>
          </div>
          <ComposedRevenueChart data={REVENUE_DATA} />
        </div>
      </div>

      {/* Acquisition + Retention */}
      <div className="grid-2">
        <div className="card card--elevated">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Acquisition Channels</h2>
              <p className="chart-subtitle">Traffic source distribution</p>
            </div>
          </div>
          <DonutChart data={ACQUISITION_DATA} label="Sources" />
        </div>

        <div className="card card--elevated">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Cohort Retention</h2>
              <p className="chart-subtitle">Weekly user retention rates</p>
            </div>
            <div className="tabs">
              <button className={`tab${cohortTab === 'sessions' ? ' active' : ''}`} onClick={() => setCohortTab('sessions')}>Sessions</button>
              <button className={`tab${cohortTab === 'users' ? ' active' : ''}`} onClick={() => setCohortTab('users')}>Users</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={RETENTION_DATA} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<RetentionTooltip />} />
              {[
                { key: 'w1', name: 'Week 1', color: '#6366f1' },
                { key: 'w2', name: 'Week 2', color: '#8b5cf6' },
                { key: 'w3', name: 'Week 3', color: '#06b6d4' },
                { key: 'w4', name: 'Week 4', color: '#10b981' },
              ].map((s) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={{ r: 3, fill: s.color, strokeWidth: 0 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Region Breakdown Full */}
      <div className="card card--elevated">
        <div className="chart-header">
          <div>
            <h2 className="chart-title">Geographic Distribution</h2>
            <p className="chart-subtitle">Sessions, revenue, and users by region</p>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Region</th>
              <th style={{ textAlign: 'right' }}>Sessions</th>
              <th style={{ textAlign: 'right' }}>Revenue</th>
              <th style={{ textAlign: 'right' }}>Users</th>
              <th style={{ textAlign: 'right' }}>Share</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const total = REGION_DATA.reduce((s, d) => s + d.sessions, 0);
              return REGION_DATA.map((r) => (
                <tr key={r.region}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.fill }} />
                      <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{r.region}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>{formatNumber(r.sessions, true)}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-emerald-400)', fontWeight: 600 }}>{formatCurrency(r.revenue, true)}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>{formatNumber(r.users, true)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                      <div style={{ width: 60, height: 4, background: 'var(--surface-5)', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(r.sessions / total) * 100}%`, background: r.fill, borderRadius: 999 }} />
                      </div>
                      <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', width: 36, textAlign: 'right' }}>
                        {((r.sessions / total) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
};
