/*
 * @Author: RA
 * @Date: 2020-04-01 17:10:30
 * @LastEditTime: 2020-07-01 23:13:36
 * @LastEditors: RA
 * @Description:
 */
import Index from '../page/index/';
import Player from '../page/player';
import Home from '../page/home';
import Search from '../page/search';
import Find from '../page/find';
import Videos from '../page/video';
import Mv from '../page/video/mv';
import Video from '../page/video/video';
import Friend from '../page/friend';
import Personalized from '../page/personalized';
import SingleDetail from '../page/singleDetail';
import AlbumList from '../page/albumDetail';
import VideoDetail from '../page/videoDetail';
import Recommendation from '../page/recommendation';
import ArtistTop from '../page/artistTop';
import RankingList from '../page/rankingList';
import FindSinger from '../page/findSinger';
import NewMusic from '../page/newMusic';
import IM from '../page/im';
import Local from '../page/local';
import AllMv from '../page/allMv';
import TopMv from '../page/topMv';

import Down from '../page/down';
import Lately from '../page/lately';
import FindList from '../page/findList';
import HostRadio from '../page/hostRadio';
import DailySpecial from '../page/dailySpecial';
import singerDetail from '../page/singerDetail';
import singerTopSong from '../page/singerDetail/component/topSong';
import singerAlbum from '../page/singerDetail/component/album';
import singerMv from '../page/singerDetail/component/mv';
import singerDesc from '../page/singerDetail/component/desc';
import singerSimi from '../page/singerDetail/component/simi';
let routes = [
  {
    path: '/',
    component: Index,
    routes: [
      {
        path: '/home',
        component: Home,
        routes: [
          {
            path: '/home/search',
            component: Search,
          },
          {
            path: '/home/find/',
            component: Find,
            routes: [
              {
                path: '/home/find',
                component: Recommendation,
              },
              {
                path: '/home/find/findList',
                component: FindList,
              },
              {
                path: '/home/find/hostRadio',
                component: HostRadio,
              },
              {
                path: '/home/find/rankingList',
                component: RankingList,
              },
              {
                path: '/home/find/findSinger',
                component: FindSinger,
              },
              {
                path: '/home/find/newMusic',
                component: NewMusic,
              },
              {
                path: '/home/find/artistTop',
                component: ArtistTop,
              }
            ],
          },
          {
            path: '/home/video/',
            component: Videos,
            routes: [
              {
                path: '/home/video/',
                component: Video,
              },
              {
                path: '/home/video/mv/',
                component: Mv,
              },
            ],
          },
          {
            path: '/home/allMv:id',
            component: AllMv
          },
          {
            path: '/home/topMv',
            component: TopMv
          },
          {
            path: '/home/friend',
            component: Friend,
          },
          {
            path: '/home/local',
            component: Local,
          },
          {
            path: '/home/down',
            component: Down,
          },
          {
            path: '/home/lately',
            component: Lately,
          },
          {
            path: '/home/single:id',
            component: SingleDetail,
          },
          {
            path: '/home/dailySpecial',
            component: DailySpecial,
          },
          {
            path: '/home/albumList:id',
            component: AlbumList,
          },
          {

            path: '/home/singerdetail:id/',
            component: singerDetail,
            routes: [
              {
                path: '/home/singerdetail:id/',
                component: singerTopSong,
              },
              {
                path: '/home/singerdetail:id/album',
                component: singerAlbum,
              },
              {
                path: '/home/singerdetail:id/mv',
                component: singerMv,
              },
              {
                path: '/home/singerdetail:id/desc',
                component: singerDesc,
              },
              {
                path: '/home/singerdetail:id/simi',
                component: singerSimi,
              }
            ]
          },
          {
            path: '/home/personalized',
            component: Personalized,
          },
        ],
      },
      {
        path: '/player',
        component: Player,
      },
      {
        path: '/im',
        component: IM,
      },
      {
        path: '/videoDetail:id',
        component: VideoDetail,
      },
    ],
  },
];
export default routes;
