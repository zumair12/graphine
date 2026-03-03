import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { cn } from '../../utils/formatters';

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  filled?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = '#6366f1',
  width = 120,
  height = 36,
  className,
  filled = true,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 3, right: 3, bottom: 3, left: 3 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([0, data.length - 1]).range([0, w]);
    const y = d3.scaleLinear()
      .domain([d3.min(data)! * 0.9, d3.max(data)! * 1.05])
      .range([h, 0]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const lineGen = d3.line<number>()
      .x((_, i) => x(i))
      .y((d) => y(d))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const areaGen = d3.area<number>()
      .x((_, i) => x(i))
      .y0(h)
      .y1((d) => y(d))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const gradientId = `spark-fill-${Math.random().toString(36).slice(2)}`;

    if (filled) {
      const defs = svg.append('defs');
      const gradient = defs.append('linearGradient')
        .attr('id', gradientId)
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '0%').attr('y2', '100%');
      gradient.append('stop').attr('offset', '0%').attr('stop-color', color).attr('stop-opacity', 0.25);
      gradient.append('stop').attr('offset', '100%').attr('stop-color', color).attr('stop-opacity', 0);

      g.append('path')
        .datum(data)
        .attr('fill', `url(#${gradientId})`)
        .attr('d', areaGen);
    }

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('d', lineGen);

    // End dot
    const lastX = x(data.length - 1);
    const lastY = y(data[data.length - 1]);
    g.append('circle')
      .attr('cx', lastX)
      .attr('cy', lastY)
      .attr('r', 3)
      .attr('fill', color)
      .attr('opacity', 0.9);
  }, [data, color, width, height, filled]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={cn('sparkline', className)}
      style={{ overflow: 'visible' }}
    />
  );
};
