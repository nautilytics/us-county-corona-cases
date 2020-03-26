import Axes from './Axes';
import { NUMBER_FORMAT } from '../../../../../constant';
import React from 'react';

const QuantizeLegend = ({ colorScale, xScale }) => {
  // const colorScale = scaleQuantize()
  //     .domain([0, max(data, xAccessor)])
  //     .range(schemeRdYlGn[7].reverse());

  // const xScale = scaleLinear()
  //     .domain(extent(colorScale.domain()))
  //     .rangeRound([0, 260]);

  return (
    <g className="legend" transform={`translate(${650},${20})`}>
      {colorScale
        .range()
        .map(d => colorScale.invertExtent(d))
        .map((d, i) => {
          const [start, end] = d;
          return (
            <rect key={`legend-rect-${i}`} height={8} x={xScale(start)} width={xScale(end) - xScale(start)} fill={colorScale(start)} />
          );
        })}
      <text className="title" x={xScale.range()[0]} y={-6}>
        Coronavirus Cases by County
      </text>
      <Axes colorScale={colorScale} xScale={xScale} xTickFormat={NUMBER_FORMAT} />
    </g>
  );
};

export default QuantizeLegend;
