/*
 * @Author: RA
 * @Date: 2020-04-02 09:29:43
 * @LastEditTime: 2020-05-16 21:20:31
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
// 登录状态
export const loginStatus = {
  api_url: '/login/status'
}
//推荐歌单
export const recommendList = {
  api_url: '/recommend/resource'
}
//推荐歌曲
export const recommendSong = {
  api_url: '/recommend/songs'
}
//独家放送
export const privatecontent = {
  api_url: '/personalized/privatecontent'
}