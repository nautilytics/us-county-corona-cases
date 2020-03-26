import React, { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import { axisLeft } from 'd3-axis';
import './index.scss';

const Axes = ({ yScale }) => {
  const yAxisRef = useRef(null);

  useEffect(() => {
    renderAxes();
  });

  const renderAxes = () => {
    renderYAxis();
  };

  const renderYAxis = () => {
    const yAxis = select(yAxisRef.current);

    yAxis.call(axisLeft(yScale).ticks(3)).call(g => g.select('.domain').remove());
  };

  return (
    <g className="axes">
      <g className="axis axis--y" ref={yAxisRef} />
    </g>
  );
};
export default Axes;
