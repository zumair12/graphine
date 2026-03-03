import React from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';

const RADAR_DATA = [
  { metric: 'Performance', value: 87, fullMark: 100 },
  { metric: 'Security', value: 94, fullMark: 100 },
  { metric: 'Reliability', value: 91, fullMark: 100 },
  { metric: 'Scalability', value: 78, fullMark: 100 },
  { metric: 'Efficiency', value: 83, fullMark: 100 },
  { metric: 'UX Score', value: 96, fullMark: 100 },
];

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ value: number; payload: { metric: string } }>;
}> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip" style={{ minWidth: 120 }}>
      <p className="chart-tooltip__label">{payload[0].payload.metric}</p>
      <div className="chart-tooltip__item">
        <span className="chart-tooltip__name" style={{ color: '#6366f1' }}>Score</span>
        <span className="chart-tooltip__value">{payload[0].value}</span>
      </div>
    </div>
  );
};

export const HealthRadarChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={220}>
    <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
      <defs>
        <linearGradient id="radarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <PolarGrid stroke="rgba(255,255,255,0.07)" />
      <PolarAngleAxis
        dataKey="metric"
        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'Inter' }}
      />
      <PolarRadiusAxis
        domain={[0, 100]}
        tick={false}
        axisLine={false}
        tickLine={false}
      />
      <Radar
        name="Score"
        dataKey="value"
        stroke="#6366f1"
        strokeWidth={2}
        fill="url(#radarGrad)"
        dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }}
      />
      <Tooltip content={<CustomTooltip />} />
    </RadarChart>
  </ResponsiveContainer>
);
