import React from 'react';
import { useSelector } from 'react-redux';
import * as topojson from 'topojson-client';
import Path from './Path';
import { NUMBER_FORMAT } from '../../../../constant';
import { xAccessor } from '../../../../utils';
import mostRecentDataSelector from '../../../../redux/selectors/most.recent.data.selector';
import { ascending } from 'd3-array';
import moment from 'moment';

const Map = ({ colorScale, path, geoJson, width, height }) => {
  const topology = useSelector(state => state.global.topology);
  const data = useSelector(mostRecentDataSelector);
  const allData = useSelector(state => state.global.data);
  const dt = moment(data.key);

  return (
    <div className="map">
      <h3>{`Updated on ${dt.format('MMM DD, YYYY')}`}</h3>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <g className="map-container">
          {geoJson.features.map(feature => {
            const id = feature.id.toString().padStart(5, '0');
            const matchingRow = data.values.find(x => x.fips === id);
            let value = 0;
            let state = '';
            if (matchingRow) {
              state = matchingRow.state;
              value = xAccessor(matchingRow);
            }

            // Find matching points
            let points = allData
              .filter(g => g.fips === id)
              .sort((a, b) => ascending(a.dt, b.dt))
              .map(h => {
                return {
                  ...h,
                  x: h.dt,
                  y: xAccessor(h),
                  color: !xAccessor(h) ? 'white' : colorScale(xAccessor(h)),
                };
              });

            return (
              <Path
                key={`feature-for-${id}`}
                className={!value ? 'no-data' : ''}
                feature={{
                  ...feature,
                  id,
                  path: path(feature),
                  state,
                  dt,
                  value,
                  points,
                  confirmed: NUMBER_FORMAT(value),
                  fill: !value ? 'white' : colorScale(value),
                }}
              />
            );
          })}
          <path
            className="state"
            d={path(
              topojson.mesh(topology, topology.objects.states, function(a, b) {
                return a !== b;
              }),
            )}
          />
        </g>
      </svg>
    </div>
  );
};

export default Map;
