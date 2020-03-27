import React, { useEffect, useCallback } from 'react';
import Spinner from './Spinner';
import Tooltip from './Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import Maps from './Maps';
import { retrieveData, TOGGLE_PLAY } from '../../redux/modules/global';

const App = () => {
  const dispatch = useDispatch();
  const topology = useSelector(state => state.global.topology);
  const data = useSelector(state => state.global.data);
  const isPlaying = useSelector(state => state.global.isPlaying);
  const getData = useCallback(() => dispatch(retrieveData()), [dispatch]);
  const updateIsPlaying = useCallback(() => dispatch({ type: TOGGLE_PLAY }), [dispatch]);

  useEffect(() => {
    getData();
  }, []);

  const icon = isPlaying ? faPause : faPlay;
  console.log(isPlaying, icon);
  const onClick = () => updateIsPlaying();

  return (
    <div className="main">
      <Tooltip />
      <FontAwesomeIcon size="lg" className={`${isPlaying} ? 'pause' : 'play'} button`} icon={icon} onClick={onClick} />
      {topology && data.length ? <Maps /> : <Spinner />}
    </div>
  );
};

export default App;
