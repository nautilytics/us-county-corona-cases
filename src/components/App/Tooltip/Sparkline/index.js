import React from 'react';
import { line as d3_line } from 'd3-shape';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import Axes from './Axes';

const Sparkline = ({ points }) => {
  const width = 150;
  const height = 100;
  const margin = {
    top: 10,
    bottom: 10,
    right: 10,
    left: 40,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime()
    .range([0, innerWidth])
    .domain(extent(points, d => d.x));

  const yScale = scaleLinear()
    .range([innerHeight, 0])
    .domain(extent(points, d => d.y));

  const line = d3_line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  return (
    <svg width={width} height={height} className="spark-line">
      <g transform={`translate(${margin.left},${margin.top})`}>
        <path d={line(points)} />
        {points.map(point => {
          return <circle key={`marker-for-${point.x}`} cx={xScale(point.x)} cy={yScale(point.y)} r={5} style={{ stroke: point.color }} />;
        })}
        <Axes yScale={yScale} />
      </g>
    </svg>
  );
};

export default Sparkline;
