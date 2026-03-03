import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import type { PieSegment } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface DonutChartProps {
  data: PieSegment[];
  total?: number;
  label?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props as {
    cx: number; cy: number; innerRadius: number; outerRadius: number;
    startAngle: number; endAngle: number; fill: string;
  };
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={(outerRadius as number) + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.95}
      />
    </g>
  );
};

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: PieSegment }>;
}> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value, payload: seg } = payload[0];
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__item">
        <span className="chart-tooltip__name">
          <span className="chart-legend__dot" style={{ background: seg.color }} />
          {name}
        </span>
        <span className="chart-tooltip__value">{value}%</span>
      </div>
    </div>
  );
};

export const DonutChart: React.FC<DonutChartProps> = ({ data, label = 'Total' }) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 160, height: 160, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
              {...{ activeIndex } as Record<string, unknown>}
              activeShape={renderActiveShape}
              onMouseEnter={(_: unknown, idx: number) => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              {data.map((seg, idx) => (
                <Cell
                  key={seg.name}
                  fill={seg.color}
                  opacity={activeIndex === undefined || activeIndex === idx ? 1 : 0.5}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Label */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'rgba(255,255,255,0.95)', letterSpacing: -0.5 }}>
            {formatNumber(total)}%
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{label}</span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.map((seg) => (
          <div key={seg.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{seg.name}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontFamily: 'JetBrains Mono, monospace' }}>
              {seg.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
