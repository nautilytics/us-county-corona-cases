import { max } from 'd3-array';

export const xAccessor = d => +d.cases;
export const getMaxDate = data => max(data, d => d.dt);
