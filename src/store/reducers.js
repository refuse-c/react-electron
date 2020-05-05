/*
 * @Author: RA
 * @Date: 2020-04-27 11:11:08
 * @LastEditTime: 2020-05-01 19:22:49
 * @LastEditors: RA
 * @Description: 
 */
import { combineReducers } from 'redux';
import * as ACTIONTYPES from './actionTypes';

const defaultState = {
  index: 1,
  currentTime: 0,
  duration: 0,
  playModel: 1,//1顺序播放 2随机播放 3单曲循环
  playStatus: false,
  userInfo: {},
  playList: [{ name: 'refuse' }, { name: 'zhangsan' }, { name: 'lisi' }],//播放列表
  musicList: [],//音乐列表
}

//获取音乐列表
const musicList = (state = defaultState.musicList, action) => {
  switch (action.type) {
    case ACTIONTYPES.MUSIC_LIST:
      return action.data;
    default:
      return state;
  }
}
//获取播放列表
const playList = (state = defaultState.playList, action) => {
  switch (action.type) {
    case ACTIONTYPES.PLAY_LIST:
      return action.data;
    default:
      return state;
  }
}
//获取用户详情
const userInfo = (state = defaultState.userInfo, action) => {
  switch (action.type) {
    case ACTIONTYPES.USER_INFO:
      return action.data;
    default:
      return state;
  }
}

export default combineReducers({
  musicList,
  playList,
  userInfo
})