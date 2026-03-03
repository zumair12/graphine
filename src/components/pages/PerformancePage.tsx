import React from 'react';
import { GaugeChart } from '../charts/GaugeChart';
import { HealthRadarChart } from '../charts/RadarChart';
import { ServerGrid } from '../widgets/ServerGrid';
import type { ServerNode } from '../../types';
import { PERFORMANCE_METRICS } from '../../data/mockData';

const STATUS_COLORS: Record<string, string> = {
  excellent: 'var(--color-emerald-400)',
  good: 'var(--color-indigo-400)',
  warning: 'var(--color-amber-400)',
  critical: 'var(--color-rose-400)',
};

const STATUS_BAR_COLORS: Record<string, string> = {
  excellent: '#10b981',
  good: '#6366f1',
  warning: '#f59e0b',
  critical: '#f43f5e',
};

interface PerformancePageProps {
  serverNodes: ServerNode[];
}

export const PerformancePage: React.FC<PerformancePageProps> = ({ serverNodes }) => {
  const online = serverNodes.filter((n) => n.status === 'online').length;
  const degraded = serverNodes.filter((n) => n.status === 'degraded').length;
  const offline = serverNodes.filter((n) => n.status === 'offline').length;
  const avgCpu = serverNodes.filter((n) => n.status !== 'offline').reduce((s, n) => s + n.cpu, 0) / (serverNodes.length - offline) || 0;
  const avgMem = serverNodes.filter((n) => n.status !== 'offline').reduce((s, n) => s + n.memory, 0) / (serverNodes.length - offline) || 0;

  return (
    <div className="dashboard">
      {/* Infrastructure Overview */}
      <div className="grid-3" style={{ gap: 16 }}>
        {/* Gauges */}
        <div className="card card--elevated">
          <h2 className="chart-title" style={{ marginBottom: 20 }}>System Load</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div className="gauge-container">
              <GaugeChart value={avgCpu} color="#6366f1" size={130} label="CPU" />
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>Avg. CPU</span>
            </div>
            <div className="gauge-container">
              <GaugeChart value={avgMem} color="#8b5cf6" size={130} label="MEM" />
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>Avg. Memory</span>
            </div>
          </div>
        </div>

        {/* Node Summary */}
        <div className="card card--elevated">
          <h2 className="chart-title" style={{ marginBottom: 16 }}>Node Status</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Online', count: online, total: serverNodes.length, color: '#10b981', dotClass: 'status-dot--online' },
              { label: 'Degraded', count: degraded, total: serverNodes.length, color: '#f59e0b', dotClass: 'status-dot--degraded' },
              { label: 'Offline', count: offline, total: serverNodes.length, color: '#f43f5e', dotClass: 'status-dot--offline' },
            ].map(({ label, count, total, color, dotClass }) => (
              <div key={label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span className={`status-dot ${dotClass}`} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {count}/{total}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar__fill"
                    style={{ width: `${(count / total) * 100}%`, background: color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: 12, background: 'var(--surface-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>SLA Uptime (30d)</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-emerald-400)', fontFamily: 'JetBrains Mono, monospace' }}>
              99.97%
            </div>
          </div>
        </div>

        {/* Health Radar */}
        <div className="card card--elevated">
          <h2 className="chart-title" style={{ marginBottom: 4 }}>System Health Radar</h2>
          <p className="chart-subtitle" style={{ marginBottom: 8 }}>Composite scores across dimensions</p>
          <HealthRadarChart />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <div style={{ padding: '6px 16px', background: 'rgba(99,102,241,0.12)', borderRadius: 999, border: '1px solid rgba(99,102,241,0.25)' }}>
              <span style={{ fontSize: 12, color: 'var(--color-indigo-400)', fontWeight: 700 }}>Overall Score: 88/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics Table */}
      <div className="card card--elevated">
        <div className="chart-header">
          <div>
            <h2 className="chart-title">Performance Benchmarks</h2>
            <p className="chart-subtitle">Real-time system metrics</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {['excellent', 'good', 'warning', 'critical'].map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLORS[s] }} />
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="perf-list">
          {PERFORMANCE_METRICS.map((metric) => {
            const percentage = (metric.score / metric.maxScore) * 100;
            return (
              <div key={metric.name} className="perf-item">
                <span className="perf-item__name">{metric.name}</span>
                <div className="perf-item__bar-wrap">
                  <div style={{ height: 8, background: 'var(--surface-4)', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: STATUS_BAR_COLORS[metric.status],
                        borderRadius: 999,
                        transition: 'width 1s ease',
                        boxShadow: `0 0 8px ${STATUS_BAR_COLORS[metric.status]}40`,
                      }}
                    />
                  </div>
                </div>
                <span className="perf-item__value" style={{ color: STATUS_COLORS[metric.status] }}>
                  {metric.score}{metric.unit}
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '2px 8px',
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: `${STATUS_COLORS[metric.status]}15`,
                  color: STATUS_COLORS[metric.status],
                  width: 72,
                  justifyContent: 'center',
                }}>
                  {metric.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Server Grid */}
      <div className="card card--elevated">
        <div className="chart-header">
          <div>
            <h2 className="chart-title">Infrastructure Nodes</h2>
            <p className="chart-subtitle">Live server metrics</p>
          </div>
        </div>
        <ServerGrid nodes={serverNodes} />
      </div>
    </div>
  );
};
