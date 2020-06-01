/*
 * @Author: RA
 * @Date: 2020-04-01 15:56:06
 * @LastEditTime: 2020-06-01 10:38:31
 * @LastEditors: refuse_c
 * @Description: 
 */
import React from 'react';
import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
// import './common/utils/rem';
import App from './App';
render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);