/*
 * @Author: RA
 * @Date: 2020-04-27 11:10:58
 * @LastEditTime: 2020-05-01 13:27:39
 * @LastEditors: RA
 * @Description: 
 */
import { createStore } from 'redux';
import reducer from './reducers';
let store = createStore(reducer);
export default store;