import React from 'react';
import { useSelector } from 'react-redux';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { schemeRdYlGn } from 'd3-scale-chromatic';
import { scaleThreshold } from 'd3-scale';
import { descending, max } from 'd3-array';
import { xAccessor } from '../../../utils';
import Map from './Map';
import ThresholdLegend from './ThresholdLegend';
import * as topojson from 'topojson-client';
import TopCounties from './TopCounties';

const Maps = () => {
  const data = useSelector(state => state.global.data);
  const topology = useSelector(state => state.global.topology);
  const geoJson = topojson.feature(topology, topology.objects.counties);

  const width = 975;
  const height = 610;
  const projection = geoAlbersUsa().fitExtent(
    [
      [5, 5],
      [width, height],
    ],
    geoJson,
  );
  const path = geoPath(projection);

  const colorScale = scaleThreshold()
    .domain([1, 10, 20, 50, 100, 200, 500, Math.max(...max(data.map(d => d.values.map(xAccessor))))])
    .range(schemeRdYlGn[8].reverse());

  const topCounties = data[data.length - 1].values
    .filter(d => d.level === 'county' && d.fip_code !== '00000')
    .sort((a, b) => descending(xAccessor(a), xAccessor(b)))
    .slice(0, 10);

  return (
    <div className="maps content">
      {data.slice(-1).map((d, idx) => {
        return (
          <Map
            key={`map-for-${d.dt.format('YYYY-MM-DD')}`}
            colorScale={colorScale}
            idx={data.length - 1}
            dt={d.dt}
            width={width}
            height={height}
            geoJson={geoJson}
            path={path}
          />
        );
      })}
      <TopCounties counties={topCounties} />
      <ThresholdLegend colorScale={colorScale} />
      <p className="citation">
        Source:{' '}
        <a className="link" href="https://coronavirus.1point3acres.com/en" target="_blank" rel="noopener noreferrer">
          COVID-19 in US and Canada
        </a>
      </p>
    </div>
  );
};

export default Maps;
