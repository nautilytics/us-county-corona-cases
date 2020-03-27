import { initialState } from '../state/global';
import { getData, getTopology } from '../api';
import { IS_CLICKED } from '../../constant';

// Actions
const TOGGLE_LOADING_ICON = 'TOGGLE_LOADING_ICON';
export const UPDATE_TOOLTIP = 'UPDATE_TOOLTIP';
export const UPDATE_CURRENT_INDEX = 'UPDATE_CURRENT_INDEX';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
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

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        data: action.data,
      };
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
    case TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case UPDATE_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
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
