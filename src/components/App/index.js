import React, { useEffect, useCallback } from 'react';
import Spinner from './Spinner';
import Tooltip from './Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import Maps from './Maps';
import { retrieveData } from '../../redux/modules/global';

const App = () => {
  const dispatch = useDispatch();
  const topology = useSelector(state => state.global.topology);
  const roads = useSelector(state => state.global.roads);
  const data = useSelector(state => state.global.data);
  const getData = useCallback(() => dispatch(retrieveData()), [dispatch]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      <Tooltip />
      {topology && data.length && roads ? <Maps /> : <Spinner />}
    </div>
  );
};

export default App;
