import React from 'react';
import { useSelector } from 'react-redux';
import Sparkline from './Sparkline';
import './index.scss';

const Tooltip = () => {
  const tooltip = useSelector(state => state.global.tooltip);

  if (!tooltip) return null;

  const { top, left, confirmed, name, state, dt, points, zipCodes } = tooltip;

  const tooltipHeight = 325; // handle placement of tooltip

  const borderColor = points[points.length - 1].color;
  return (
    <div className="content tooltip" style={{ top: top - tooltipHeight < 0 ? top + tooltipHeight : top, left: left - 75 }}>
      <div
        className="tooltip-container"
        style={{
          boxShadow: `0 4px 8px 0 ${borderColor}`,
          MozBoxShadow: `0 4px 8px 0 ${borderColor}`,
        }}
      >
        <div className="contents">
          <div className="inner-contents">
            <div className="column">
              <h5>{dt.format('MMM DD, YYYY')}</h5>
              <div className="title">{`${name}, ${state}`}</div>
              <div className="title">{`Total Confirmed: ${confirmed}`}</div>
              <Sparkline points={points} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
