import React from 'react';
import type { RegionData } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface RegionTableProps {
  data: RegionData[];
}

export const RegionTable: React.FC<RegionTableProps> = ({ data }) => {
  const totalSessions = data.reduce((s, d) => s + d.sessions, 0);

  return (
    <div>
      {data.map((region) => {
        const share = ((region.sessions / totalSessions) * 100).toFixed(1);
        return (
          <div key={region.region} className="region-item">
            <div
              className="region-item__flag"
              style={{ background: region.fill }}
              aria-hidden="true"
            />
            <span className="region-item__name">{region.region}</span>

            {/* Mini progress */}
            <div style={{ flex: 1, height: 4, background: 'var(--surface-5)', borderRadius: 999, overflow: 'hidden', maxWidth: 80 }}>
              <div
                style={{
                  height: '100%',
                  width: `${(region.sessions / totalSessions) * 100}%`,
                  background: region.fill,
                  borderRadius: 999,
                  transition: 'width 0.8s ease',
                }}
              />
            </div>

            <span className="region-item__value">{formatNumber(region.sessions, true)}</span>
            <span className="region-item__share">{share}%</span>
          </div>
        );
      })}
    </div>
  );
};
