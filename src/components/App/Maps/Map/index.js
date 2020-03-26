import React from 'react';
import { useSelector } from 'react-redux';
import * as topojson from 'topojson-client';
import Path from './Path';
import { NUMBER_FORMAT, AVAILABLE_DATES } from '../../../../constant';
import { xAccessor } from '../../../../utils';
import countyDataSelector from '../../../../redux/selectors/county.data.selector';
import moment from 'moment';

const Map = ({ colorScale, path, idx, geoJson, width, height, dt }) => {
  const topology = useSelector(state => state.global.topology);
  const roads = useSelector(state => state.global.roads);
  const data = useSelector(countyDataSelector(idx));
  const allData = useSelector(state => state.global.data);

  return (
    <div className="map">
      <h4>{`Last updated at ${moment(AVAILABLE_DATES[idx], 'YYYY-MM-DD.HH.mm.ss').format('MMM DD, YYYY hh:mm a')}`}</h4>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <g className="map-container">
          {geoJson.features.map(feature => {
            const id = feature.id.toString().padStart(5, '0');
            const matchingRow = data.find(x => x.fip_code === id);
            let value = 0;
            let dayChange = 0;
            let state = '';
            let zipCodes = '';
            if (matchingRow) {
              state = matchingRow.parent;
              dayChange = matchingRow.confirmed_change;
              zipCodes = matchingRow.zip_codes;
              value = xAccessor(matchingRow);
            } else {
              const matchingStateProxy = data.find(x => x.fip_code.startsWith(id.slice(0, 2)));
              if (matchingStateProxy) {
                state = matchingStateProxy.parent;
              }
            }

            // Find matching points
            let points = [];
            for (let i = 0; i < allData.length; i++) {
              let y = 0;
              const matchingIdRow = allData[i].values.find(g => g.fip_code === feature.id);
              if (matchingIdRow) {
                y = xAccessor(matchingIdRow);
              }
              points.push({ x: i, y, color: !y ? 'white' : colorScale(y) });
            }

            return (
              <Path
                key={`feature-for-${id}`}
                className={!value ? 'no-data' : ''}
                feature={{
                  ...feature,
                  id,
                  path: path(feature),
                  state,
                  value,
                  dt,
                  points,
                  zipCodes,
                  dayChange: NUMBER_FORMAT(dayChange),
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
          {topojson.feature(roads, roads.objects['us-interstate-roads']).features.map((road, i) => {
            return <path key={`road-for-${i}`} className="interstate-road" d={path(road)} />;
          })}
        </g>
      </svg>
    </div>
  );
};

export default Map;
