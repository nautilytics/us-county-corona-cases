import { createSelector } from 'reselect';
import { getMaxDate } from '../../utils';

const dataSelector = state => state.global.data;

const mostRecentDataSelector = createSelector([dataSelector], data => {
  return data.filter(d => d.dt.isSame(getMaxDate(data)));
});

export default mostRecentDataSelector;
