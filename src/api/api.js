/*
 * @Author: RA
 * @Date: 2020-04-02 09:29:43
 * @LastEditTime: 2020-05-07 11:14:28
 * @LastEditors: RA
 * @Description: 
 */
//获取歌单
export const musicList = {
  api_url: "/user/playlist"
}
//获取歌单列表
export const playList = {
  api_url: "/playlist/detail"
}
//搜索
export const search = {
  api_url: "/search"
}
//热搜
export const searchHot = {
  api_url: "/search/hot/detail"
}
// placeholder
export const searchDefaule = {
  api_url: "search/default"
}
// 搜索建议
export const searchSuggest = {
  api_url: "search/suggest"
}
//获取音乐详情
export const getMusicDetail = {
  api_url: "/song/detail"
}
//手机号登录
export const loginTel = {
  api_url: "/login/cellphone"
}
// 获取音乐url
export const getMusicUrl = {
  api_url: '/song/url'
}