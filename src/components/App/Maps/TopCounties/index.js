import { NUMBER_FORMAT } from '../../../../constant';
import React from 'react';
import { xAccessor } from '../../../../utils';

const TopCounties = ({ counties }) => {
  return (
    <div className="top-counties">
      <h4>Most Confirmed Cases, by County</h4>
      <div className="wrapper">
        {counties.map(county => {
          return (
            <div key={`top-county-row-for-${county.fips}`} className="row space-between">
              <div>{`${county.county}, ${county.state}`}</div>
              <div>{NUMBER_FORMAT(xAccessor(county))}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCounties;
