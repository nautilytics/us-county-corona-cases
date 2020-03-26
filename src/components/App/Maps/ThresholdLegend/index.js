import { NUMBER_FORMAT } from '../../../../constant';
import React from 'react';

const ThresholdLegend = ({ colorScale }) => {
  // const colorScale = scaleThreshold()
  //     .domain([0, 1, 5, 10, 15, 20, 25, 50, 100, 200, 500, max(data, xAccessor)])
  //     .range(schemeRdYlGn[11].reverse());

  return (
    <div className="threshold-legend">
      <h5>Coronavirus Cases by County</h5>
      <div className="wrapper">
        <div className="row">
          <div className="square no-data" />0 cases
        </div>
        {colorScale
          .range()
          .map(d => colorScale.invertExtent(d))
          .map((d, i) => {
            const [start, end] = d;
            if (!i) return null;
            return (
              <div className="row" key={`row-for-${start}`}>
                <div className="square" style={{ backgroundColor: colorScale(start) }} />
                {`${NUMBER_FORMAT(start)} to ${NUMBER_FORMAT(end)}`}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ThresholdLegend;
