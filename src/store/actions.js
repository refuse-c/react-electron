/*
 * @Author: RA
 * @Date: 2020-04-27 11:11:28
 * @LastEditTime: 2020-05-15 11:04:53
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
export const gainMusicId = (data) => {
  return {
    type: ACTIONSTYPES.MUSIC_ID,
    data
  }
}
//播放顺序
export const setPlayModel = (data) => {
  return {
    type: ACTIONSTYPES.PLAY_MODEL,
    data
  }
}
//播放状态
export const setIsPlay = (data) => {
  return {
    type: ACTIONSTYPES.IS_PLAY,
    data
  }
}
//音乐index
export const setIndex = (data) => {
  return {
    type: ACTIONSTYPES.SET_INDEX,
    data
  }
}
//显示播放列表
export const setPlayListStatus = (data) => {
  return {
    type: ACTIONSTYPES.SHOW_PLAYLIST,
    data
  }
}
//搜索信息
export const gainSearchInfo = (data) => {
  return {
    type: ACTIONSTYPES.SEARCH_INFO,
    data
  }
}
//搜索展示tab
export const setMenuIndex = (data) => {
  return {
    type: ACTIONSTYPES.MENU_INDEX,
    data
  }
}
//分页数字
export const setPageNum = (data) => {
  return {
    type: ACTIONSTYPES.PAGE_NUM,
    data
  }
}
//总数
export const setTotal = (data) => {
  console.log(data)
  return {
    type: ACTIONSTYPES.Page_TOTAL,
    data
  }
}