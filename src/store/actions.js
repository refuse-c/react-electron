/*
 * @Author: RA
 * @Date: 2020-04-27 11:11:28
 * @LastEditTime: 2020-06-01 20:05:25
 * @LastEditors: RA
 * @Description:
 */
import * as ACTIONSTYPES from './actionTypes';
// 音乐列表
export const gainMusicList = (data) => {
  return {
    type: ACTIONSTYPES.MUSIC_LIST,
    data,
  };
};
//播放列表
export const gainPlayList = (data) => {
  return {
    type: ACTIONSTYPES.PLAY_LIST,
    data,
  };
};
//用户详情
export const gainUserInfo = (data) => {
  return {
    type: ACTIONSTYPES.USER_INFO,
    data,
  };
};
//是否显示登录页
export const isSHowLogin = (data) => {
  return {
    type: ACTIONSTYPES.SHOW_LOGIN,
    data,
  };
};
//是否显示已经登录
export const isLogin = (data) => {
  return {
    type: ACTIONSTYPES.IS_LOGIN,
    data,
  };
};
//是否显示已经登录
export const gainMenuList = (data) => {
  return {
    type: ACTIONSTYPES.MENU_LIST,
    data,
  };
};
// 获取音乐id
export const gainMusicId = (data) => {
  return {
    type: ACTIONSTYPES.MUSIC_ID,
    data,
  };
};
//播放状态
export const setIsPlay = (data) => {
  return {
    type: ACTIONSTYPES.IS_PLAY,
    data,
  };
};
//音乐index
export const setIndex = (data) => {
  return {
    type: ACTIONSTYPES.SET_INDEX,
    data,
  };
};
//显示播放列表
export const setShowPopStatus = (data) => {
  return {
    type: ACTIONSTYPES.SHOW_POP,
    data,
  };
};
//搜索信息
export const gainSearchInfo = (data) => {
  return {
    type: ACTIONSTYPES.SEARCH_INFO,
    data,
  };
};
//搜索展示tab
export const setMenuIndex = (data) => {
  return {
    type: ACTIONSTYPES.MENU_INDEX,
    data,
  };
};
//分页数字
export const setPageNum = (data) => {
  return {
    type: ACTIONSTYPES.PAGE_NUM,
    data,
  };
};
//总数
export const setTotal = (data) => {
  return {
    type: ACTIONSTYPES.Page_TOTAL,
    data,
  };
};
//搜索分页总数
export const setCurrentTime = (data) => {
  return {
    type: ACTIONSTYPES.CURRENT_TIME,
    data,
  };
};
//歌单字段
export const setSonglstText = (data) => {
  return {
    type: ACTIONSTYPES.SONG_LIST_TEXT,
    data,
  };
};
//设置tools状态
export const setToolsStatus = (data) => {
  return {
    type: ACTIONSTYPES.TOOLS,
    data,
  };
};
