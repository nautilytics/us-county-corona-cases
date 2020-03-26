import { csv, json } from 'd3-fetch';
import { AVAILABLE_DATES, FILE_NAME, FILE_DATE_FORMAT } from '../constant';
import moment from 'moment';

export const getRoads = () => {
  return new Promise((resolve, reject) => {
    json('./data/us-interstate-roads.json')
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const getTopology = () => {
  return new Promise((resolve, reject) => {
    json('./data/counties-10m.json')
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const getData = () => {
  return new Promise((resolve, reject) => {
    Promise.all(AVAILABLE_DATES.map(dt => csv(`./data/cases/${FILE_NAME}-${dt}.csv`)))
      .then(response => {
        resolve(
          response.map((values, i) => {
            return {
              dt: moment(AVAILABLE_DATES[i], FILE_DATE_FORMAT),
              values,
            };
          }),
        );
      })
      .catch(err => reject(err));
  });
};
