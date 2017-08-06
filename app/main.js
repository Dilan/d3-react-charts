// https://caspg.github.io/simple-data-table-map/
require("./main.scss");
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './containers/App';
import statesData from './data/states-data';

const initialState = {
  regionData: statesData,
  emptyRegions: [],
  sortState: { key: 'regionName', direction: 'ASC' }
};

const store = createStore(rootReducer, initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
