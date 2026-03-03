import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GaugeProps {
  value: number;
  max?: number;
  size?: number;
  color: string;
  label?: string;
}

export const GaugeChart: React.FC<GaugeProps> = ({
  value,
  max = 100,
  size = 140,
  color,
  label,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const r = size / 2;
    const innerR = r * 0.72;
    const startAngle = -Math.PI * 0.75;
    const endAngle = Math.PI * 0.75;
    const valueAngle = startAngle + (endAngle - startAngle) * (value / max);

    const arc = d3.arc<{ startAngle: number; endAngle: number }>()
      .innerRadius(innerR)
      .outerRadius(r - 4)
      .cornerRadius(4);

    const g = svg
      .append('g')
      .attr('transform', `translate(${r},${r})`);

    const gradId = `gauge-grad-${Math.random().toString(36).slice(2)}`;
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', gradId)
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', -r).attr('y1', 0).attr('x2', r).attr('y2', 0);
    gradient.append('stop').attr('offset', '0%').attr('stop-color', color).attr('stop-opacity', 0.4);
    gradient.append('stop').attr('offset', '100%').attr('stop-color', color);

    // Track
    g.append('path')
      .datum({ startAngle, endAngle })
      .attr('d', arc as never)
      .attr('fill', 'rgba(255,255,255,0.06)');

    // Value arc
    g.append('path')
      .datum({ startAngle, endAngle: valueAngle })
      .attr('d', arc as never)
      .attr('fill', `url(#${gradId})`);

    // Center text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.1em')
      .attr('fill', 'rgba(255,255,255,0.95)')
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-size', r * 0.36)
      .attr('font-weight', '800')
      .text(`${value.toFixed(0)}%`);

    if (label) {
      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', `${r * 0.3}px`)
        .attr('fill', 'rgba(255,255,255,0.4)')
        .attr('font-family', 'Inter, sans-serif')
        .attr('font-size', r * 0.18)
        .attr('font-weight', '500')
        .text(label);
    }
  }, [value, max, size, color, label]);

  return <svg ref={svgRef} width={size} height={size} />;
};
