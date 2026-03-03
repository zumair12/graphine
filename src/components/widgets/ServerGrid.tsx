import React from 'react';
import type { ServerNode } from '../../types';
import { formatNumber } from '../../utils/formatters';

function getBarColor(value: number): string {
  if (value >= 90) return 'var(--color-rose-400)';
  if (value >= 75) return 'var(--color-amber-400)';
  return 'var(--color-indigo-400)';
}

interface ServerGridProps {
  nodes: ServerNode[];
}

export const ServerGrid: React.FC<ServerGridProps> = ({ nodes }) => (
  <div className="server-grid">
    {nodes.map((node) => (
      <div
        key={node.id}
        className={`server-node server-node--${node.status}`}
        role="article"
        aria-label={node.name}
      >
        <div className="server-node__header">
          <span className={`status-dot status-dot--${node.status}`} aria-label={node.status} />
          <span className="server-node__name">{node.name}</span>
          <span className="server-node__region">{node.region}</span>
        </div>

        {node.status !== 'offline' ? (
          <div className="server-node__metrics">
            <ServerMetric label="CPU" value={node.cpu} unit="%" />
            <ServerMetric label="MEM" value={node.memory} unit="%" />
            <ServerMetric
              label="LAT"
              value={Math.min(node.latency, 200)}
              max={200}
              displayValue={`${node.latency.toFixed(0)}ms`}
            />
          </div>
        ) : (
          <span style={{ fontSize: 11, color: 'var(--color-rose-400)', marginTop: 4 }}>
            Service unavailable
          </span>
        )}
      </div>
    ))}
  </div>
);

const ServerMetric: React.FC<{
  label: string;
  value: number;
  max?: number;
  unit?: string;
  displayValue?: string;
}> = ({ label, value, max = 100, unit = '', displayValue }) => (
  <div className="server-metric">
    <span className="server-metric__label">{label}</span>
    <div className="server-metric__bar">
      <div
        className="server-metric__fill"
        style={{
          width: `${(value / max) * 100}%`,
          background: getBarColor((value / max) * 100),
        }}
      />
    </div>
    <span className="server-metric__value">
      {displayValue ?? `${formatNumber(value, false)}${unit}`}
    </span>
  </div>
);
