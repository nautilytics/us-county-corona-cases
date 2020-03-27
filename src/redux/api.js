import { csv, json } from 'd3-fetch';
import moment from 'moment';

export const getTopology = () => {
  return new Promise((resolve, reject) => {
    json('./data/counties-albers-10m.json')
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const getData = () => {
  return new Promise((resolve, reject) => {
    csv('./data/cases/us-counties.csv')
      .then(response =>
        resolve(
          response.map(d => {
            return {
              ...d,
              dt: moment(d.date, 'YYYY-MM-DD'),
            };
          }),
        ),
      )
      .catch(err => reject(err));
  });
};
