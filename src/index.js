/*
 * @Author: RA
 * @Date: 2020-04-01 15:56:06
 * @LastEditTime: 2020-05-07 11:10:56
 * @LastEditors: RA
 * @Description: 
 */
import React from 'react';
import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
// import './common/utils/rem';
import App from './App';
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);