import React, { useState } from 'react';
import { KPIGrid } from '../widgets/KPICard';
import { ActivityFeed } from '../widgets/ActivityFeed';
import { RegionTable } from '../widgets/RegionTable';
import { DonutChart } from '../charts/DonutChart';
import { RevenueAreaChart } from '../charts/RechartsCharts';
import type { KPIMetric, ActivityEvent, DateRange } from '../../types';
import { REVENUE_DATA, ACQUISITION_DATA, FUNNEL_DATA, REGION_DATA, TOP_PRODUCTS } from '../../data/mockData';
import { formatNumber, formatCurrency } from '../../utils/formatters';
import { Package } from 'lucide-react';

interface OverviewPageProps {
  kpiMetrics: KPIMetric[];
  recentActivity: ActivityEvent[];
  dateRange: DateRange;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  kpiMetrics,
  recentActivity,
  dateRange,
}) => {
  const [revenueTab, setRevenueTab] = useState<'revenue' | 'profit'>('revenue');

  return (
    <div className="dashboard">
      {/* KPI Metrics */}
      <KPIGrid metrics={kpiMetrics} />

      {/* Revenue Chart + Acquisition */}
      <div className="grid-2-3">
        <div className="card card--elevated">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Revenue Overview</h2>
              <p className="chart-subtitle">Monthly performance · {dateRange}</p>
            </div>
            <div className="tabs">
              <button
                className={`tab${revenueTab === 'revenue' ? ' active' : ''}`}
                onClick={() => setRevenueTab('revenue')}
              >Revenue</button>
              <button
                className={`tab${revenueTab === 'profit' ? ' active' : ''}`}
                onClick={() => setRevenueTab('profit')}
              >Profit</button>
            </div>
          </div>

          {/* Summary Row */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
            {[
              { label: 'Total Revenue', value: formatCurrency(3_873_000, true), color: '#6366f1' },
              { label: 'Total Expenses', value: formatCurrency(2_151_000, true), color: '#f43f5e' },
              { label: 'Net Profit', value: formatCurrency(1_722_000, true), color: '#10b981' },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <RevenueAreaChart data={REVENUE_DATA} activeTab={revenueTab} />
        </div>

        {/* Acquisition Donut */}
        <div className="card card--elevated">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Traffic Sources</h2>
              <p className="chart-subtitle">Acquisition breakdown</p>
            </div>
          </div>
          <DonutChart data={ACQUISITION_DATA} label="Channels" />

          {/* Conversion Funnel */}
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12 }}>
              Conversion Funnel
            </h3>
            {FUNNEL_DATA.map((stage, i) => (
              <div key={stage.stage} className="funnel-stage">
                <span className="funnel-stage__label">{stage.stage}</span>
                <div className="funnel-stage__bar">
                  <div className="progress-bar">
                    <div
                      className="progress-bar__fill"
                      style={{
                        width: `${stage.conversionRate}%`,
                        background: `hsl(${240 - i * 30}, 75%, 65%)`,
                      }}
                    />
                  </div>
                </div>
                <span className="funnel-stage__value">{formatNumber(stage.users, true)}</span>
                <span className="funnel-stage__rate">{stage.conversionRate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products + Activity + Regions */}
      <div className="grid-3">
        {/* Top Products */}
        <div className="card card--elevated">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Top Products</h2>
              <p className="chart-subtitle">By revenue · {dateRange}</p>
            </div>
            <Package size={16} style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ textAlign: 'right' }}>Revenue</th>
                <th style={{ textAlign: 'right' }}>Growth</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PRODUCTS.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{p.category} · {formatNumber(p.units, true)} units</div>
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                    {formatCurrency(p.revenue, true)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <span style={{
                      color: p.growth >= 0 ? 'var(--color-emerald-400)' : 'var(--color-rose-400)',
                      fontWeight: 700,
                      fontSize: 12,
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>
                      {p.growth >= 0 ? '+' : ''}{p.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity Feed */}
        <div className="card card--elevated">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Live Activity</h2>
              <p className="chart-subtitle">Real-time events</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--color-emerald-400)' }}>
              <span className="live-badge__dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', animation: 'pulse-dot 1.5s ease-in-out infinite' }} />
              Streaming
            </div>
          </div>
          <ActivityFeed events={recentActivity} maxItems={8} />
        </div>

        {/* Region Breakdown */}
        <div className="card card--elevated">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Geographic Traffic</h2>
              <p className="chart-subtitle">Sessions by region</p>
            </div>
          </div>
          <RegionTable data={REGION_DATA} />
        </div>
      </div>
    </div>
  );
};
