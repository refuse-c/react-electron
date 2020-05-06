/*
 * @Author: RA
 * @Date: 2020-04-27 11:11:28
 * @LastEditTime: 2020-05-06 23:22:19
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
//是否显示登录页
export const isSHowLogin = (data) => {
  return {
    type: ACTIONSTYPES.SHOW_LOGIN,
    data
  }
}
//是否显示已经登录
export const isLogin = (data) => {
  return {
    type: ACTIONSTYPES.IS_LOGIN,
    data
  }
}
//是否显示已经登录
export const gainMenuList = (data) => {
  return {
    type: ACTIONSTYPES.MENU_LIST,
    data
  }
}
// 获取音乐id
//是否显示已经登录
export const gainMusicId = (data) => {
  return {
    type: ACTIONSTYPES.MUSIC_ID,
    data
  }
}