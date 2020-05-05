/*
 * @Author: RA
 * @Date: 2020-04-27 11:11:28
 * @LastEditTime: 2020-05-01 19:22:11
 * @LastEditors: RA
 * @Description: 
 */
import * as ACTIONSTYPES from './actionTypes';
// 音乐列表
export const gainMusicList = (data) => {
  return {
    type: ACTIONSTYPES.MUSIC_LIST,
    data
  }
}
//播放列表
export const gainPlayLIst = (data) => {
  return {
    type: ACTIONSTYPES.PLAY_LIST,
    data
  }
}
//用户详情
export const gainUserInfo = (data) => {
  return {
    type: ACTIONSTYPES.USER_INFO,
    data
  }
}