import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import type { RevenueDataPoint } from '../../types';
import { formatCurrency } from '../../utils/formatters';

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}> = ({ active, payload, label }) => {
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
          <span className="chart-tooltip__value">{formatCurrency(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Revenue Area Chart ────────────────────────────────────────────────────────

interface RevenueChartProps {
  data: RevenueDataPoint[];
  activeTab: 'revenue' | 'profit';
}

export const RevenueAreaChart: React.FC<RevenueChartProps> = ({ data, activeTab }) => (
  <ResponsiveContainer width="100%" height={220}>
    <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
      <defs>
        <linearGradient id="grad-revenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="grad-profit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="grad-expenses" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
      <XAxis
        dataKey="month"
        tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter' }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter' }}
        axisLine={false}
        tickLine={false}
        tickFormatter={(v) => formatCurrency(v, true)}
      />
      <Tooltip content={<CustomTooltip />} />
      {activeTab === 'revenue' ? (
        <>
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#grad-revenue)"
            dot={false}
            activeDot={{ r: 5, fill: '#6366f1', strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#f43f5e"
            strokeWidth={2}
            fill="url(#grad-expenses)"
            dot={false}
            activeDot={{ r: 5, fill: '#f43f5e', strokeWidth: 0 }}
          />
        </>
      ) : (
        <Area
          type="monotone"
          dataKey="profit"
          name="Profit"
          stroke="#10b981"
          strokeWidth={2.5}
          fill="url(#grad-profit)"
          dot={false}
          activeDot={{ r: 5, fill: '#10b981', strokeWidth: 0 }}
        />
      )}
    </AreaChart>
  </ResponsiveContainer>
);

// ─── Bar Chart ────────────────────────────────────────────────────────────────

interface TrafficBarChartProps {
  data: Array<{ hour: string; desktop: number; mobile: number; tablet: number }>;
}

const TrafficTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}> = ({ active, payload, label }) => {
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
          <span className="chart-tooltip__value">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export const TrafficBarChart: React.FC<TrafficBarChartProps> = ({ data }) => {
  // Show every 4 hours for readability
  const filtered = data.filter((_, i) => i % 4 === 0 || i === data.length - 1);
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={filtered} margin={{ top: 5, right: 5, left: -10, bottom: 0 }} barSize={14} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="hour"
          tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v)}
        />
        <Tooltip content={<TrafficTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="desktop" name="Desktop" fill="#6366f1" radius={[3, 3, 0, 0]} opacity={0.9} />
        <Bar dataKey="mobile" name="Mobile" fill="#8b5cf6" radius={[3, 3, 0, 0]} opacity={0.9} />
        <Bar dataKey="tablet" name="Tablet" fill="#06b6d4" radius={[3, 3, 0, 0]} opacity={0.9} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// ─── Composed Chart ────────────────────────────────────────────────────────────

export const ComposedRevenueChart: React.FC<{ data: RevenueDataPoint[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <ComposedChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
      <defs>
        <linearGradient id="grad-comp-revenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
      <XAxis
        dataKey="month"
        tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter' }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter' }}
        axisLine={false}
        tickLine={false}
        tickFormatter={(v) => formatCurrency(v, true)}
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
      <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[3, 3, 0, 0]} opacity={0.7} barSize={18} />
      <Area
        type="monotone"
        dataKey="revenue"
        name="Revenue"
        stroke="#6366f1"
        strokeWidth={2.5}
        fill="url(#grad-comp-revenue)"
        dot={false}
      />
    </ComposedChart>
  </ResponsiveContainer>
);
