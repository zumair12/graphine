import React, { useRef, useEffect } from 'react';
import {
  DollarSign, Users, Activity, TrendingUp,
  TrendingDown, Minus,
} from 'lucide-react';
import type { KPIMetric } from '../../types';
import { formatNumber, formatCurrency, formatPercent } from '../../utils/formatters';
import { Sparkline } from '../charts/Sparkline';

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  DollarSign, Users, Activity, TrendingUp,
};

const COLOR_CSS: Record<KPIMetric['color'], { icon: string; accent: string; text: string }> = {
  indigo: { icon: 'rgba(99,102,241,0.15)', accent: '#6366f1', text: 'var(--color-indigo-400)' },
  violet: { icon: 'rgba(139,92,246,0.15)', accent: '#8b5cf6', text: 'var(--color-violet-400)' },
  cyan: { icon: 'rgba(6,182,212,0.15)', accent: '#06b6d4', text: 'var(--color-cyan-400)' },
  emerald: { icon: 'rgba(16,185,129,0.15)', accent: '#10b981', text: 'var(--color-emerald-400)' },
  rose: { icon: 'rgba(244,63,94,0.15)', accent: '#f43f5e', text: 'var(--color-rose-400)' },
  amber: { icon: 'rgba(245,158,11,0.15)', accent: '#f59e0b', text: 'var(--color-amber-400)' },
};

function formatValue(metric: KPIMetric): string {
  if (metric.prefix === '$') return formatCurrency(metric.value, true);
  if (metric.unit === '%') return `${metric.value.toFixed(2)}%`;
  return formatNumber(metric.value, true);
}

interface KPICardProps {
  metric: KPIMetric;
}

export const KPICard: React.FC<KPICardProps> = ({ metric }) => {
  const colors = COLOR_CSS[metric.color];
  const Icon = ICON_MAP[metric.icon] ?? Activity;
  const valueRef = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef(metric.value);

  useEffect(() => {
    if (metric.value !== prevValueRef.current && valueRef.current) {
      valueRef.current.classList.remove('value-updated');
      // Force reflow
      void valueRef.current.offsetWidth;
      valueRef.current.classList.add('value-updated');
      prevValueRef.current = metric.value;
    }
  }, [metric.value]);

  return (
    <div className="card kpi-card card--elevated" role="article" aria-label={metric.label}>
      {/* Accent glow */}
      <div
        className="kpi-card__accent"
        style={{ background: colors.accent, right: -20, top: -20 }}
      />

      {/* Header */}
      <div className="kpi-card__header">
        <span className="kpi-card__label">{metric.label}</span>
        <div className="kpi-card__icon" style={{ background: colors.icon }}>
          <Icon size={16} color={colors.text} />
        </div>
      </div>

      {/* Value */}
      <div ref={valueRef} className="kpi-card__value">
        {formatValue(metric)}
      </div>

      {/* Change */}
      <div className="kpi-card__footer">
        <span className={`kpi-card__change kpi-card__change--${metric.trend}`}>
          {metric.trend === 'up' && <TrendingUp size={13} />}
          {metric.trend === 'down' && <TrendingDown size={13} />}
          {metric.trend === 'neutral' && <Minus size={13} />}
          {formatPercent(metric.changePercent)}
          <span style={{ fontWeight: 400, color: 'var(--text-tertiary)', marginLeft: 4, fontSize: 11 }}>
            vs last period
          </span>
        </span>
      </div>

      {/* Sparkline */}
      <div className="kpi-card__sparkline">
        <Sparkline
          data={metric.sparklineData}
          color={colors.accent}
          width={180}
          height={38}
        />
      </div>
    </div>
  );
};

// ─── KPI Grid ─────────────────────────────────────────────────────────────────

interface KPIGridProps {
  metrics: KPIMetric[];
}

export const KPIGrid: React.FC<KPIGridProps> = ({ metrics }) => (
  <div className="kpi-grid">
    {metrics.map((metric) => (
      <KPICard key={metric.id} metric={metric} />
    ))}
  </div>
);
