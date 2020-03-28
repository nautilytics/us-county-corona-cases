import { initialState } from '../state/global';
import { getData, getTopology } from '../api';
import { IS_CLICKED } from '../../constant';
import { getMaxDate, getMinDate, xAccessor } from '../../utils';
import { nest } from 'd3-collection';
import { scaleThreshold } from 'd3-scale';
import { schemeRdYlGn } from 'd3-scale-chromatic';
import { max } from 'd3-array';

// Actions
const TOGGLE_LOADING_ICON = 'TOGGLE_LOADING_ICON';
export const UPDATE_TOOLTIP = 'UPDATE_TOOLTIP';
export const TIMER_TICK = 'TIMER_TICK';
const UPDATE_DATA = 'UPDATE_DATA';
const UPDATE_TOPOLOGY = 'UPDATE_TOPOLOGY';
const SHOW_ERROR = 'SHOW_ERROR';

const handleTooltip = (state, item) => {
  if (state.tooltip && state.tooltip[IS_CLICKED]) {
    if (item && item[IS_CLICKED]) {
      if (item.id === state.tooltip.id) {
        return null;
      } else {
        return item;
      }
    } else {
      return state.tooltip;
    }
  } else {
    return item;
  }
};

const handleCountyLevelData = (state, data) => {
  const minDate = getMinDate(data);
  const maxDate = getMaxDate(data);
  const numberOfPeriods = maxDate.diff(minDate, 'days');
  return {
    ...state,
    data,
    nestedData: nest()
      .key(d => d.dt.format())
      .entries(data),
    numberOfPeriods,
    colorScale: scaleThreshold()
      .range(schemeRdYlGn[8].reverse())
      .domain([1, 10, 20, 50, 100, 200, 500, max(data, xAccessor)]),
    currentIndex: numberOfPeriods,
  };
};

const handleCurrentIndex = state => {
  if (state.currentIndex < state.numberOfPeriods) {
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
    };
  } else {
    return {
      ...state,
      currentIndex: 0,
    };
  }
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return handleCountyLevelData(state, action.data);
    case UPDATE_TOPOLOGY:
      return {
        ...state,
        topology: action.topology,
      };
    case UPDATE_TOOLTIP:
      return {
        ...state,
        tooltip: handleTooltip(state, action.item),
      };
    case TIMER_TICK:
      return handleCurrentIndex(state);
    case SHOW_ERROR:
      return {
        ...state,
        showError: true,
      };
    case TOGGLE_LOADING_ICON:
      return {
        ...state,
        showError: false,
        isLoading: action.x,
      };
    default:
      return state;
  }
}

function toggleLoadingIcon(x) {
  return {
    type: TOGGLE_LOADING_ICON,
    x,
  };
}

export function retrieveData() {
  return dispatch => {
    dispatch(toggleLoadingIcon(true));

    Promise.all([getTopology(), getData()])
      .then(results => {
        const [topology, data] = results;
        dispatch({
          type: UPDATE_TOPOLOGY,
          topology,
        });
        dispatch({
          type: UPDATE_DATA,
          data,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: SHOW_ERROR });
      })
      .finally(() => dispatch(toggleLoadingIcon(false)));
  };
}
