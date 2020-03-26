import { createSelector } from 'reselect';

const dataSelector = state => state.global.data;

const countyDataSelector = idx =>
  createSelector([dataSelector], data => {
    return data[idx].values.filter(d => d.level === 'county');
  });

export default countyDataSelector;
