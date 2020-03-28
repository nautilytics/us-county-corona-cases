import { max, min } from 'd3-array';

export const xAccessor = d => +d.cases;
export const getMaxDate = data => max(data, d => d.dt);
export const getMinDate = data => min(data, d => d.dt);
