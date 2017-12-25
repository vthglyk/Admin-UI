import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import Home from './components/home/home';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>
  , document.querySelector('.container'));
