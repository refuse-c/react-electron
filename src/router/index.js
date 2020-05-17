/*
 * @Author: RA
 * @Date: 2020-04-01 17:10:30
 * @LastEditTime: 2020-05-16 22:37:32
 * @LastEditors: RA
 * @Description: 
 */
import Index from '../page/index/';
import Player from '../page/player';
import Home from '../page/home';
import Search from '../page/search';
import Find from '../page/find';
import Video from '../components/video';
import Frind from '../page/frind';
import Local from '../components/local';
import Down from '../components/down';
import Lately from '../components/lately';
import Single from '../components/single';
import IM from '../components/im';


import Recommendation from '../components/recommendation';
import FindList from '../components/findList';
import HostRadio from '../components/hostRadio';
import RankingList from '../components/rankingList';
import FindSinger from '../components/findSinger';
import NewMusic from '../components/newMusic';
import DailySpecial from '../components/dailySpecial';
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
              }
            ]
          },
          {
            path: '/home/video',
            component: Video
          },
          {
            path: '/home/frind',
            component: Frind
          },
          {
            path: '/home/local',
            component: Local
          },
          {
            path: '/home/down',
            component: Down
          },
          {
            path: '/home/lately',
            component: Lately
          },
          {
            path: '/home/single:id',
            component: Single
          },
          {
            path: '/home/dailySpecial',
            component: DailySpecial
          }
        ]
      },
      {
        path: '/player',
        component: Player,
      },
      {
        path: '/im',
        component: IM,
      }
    ]
  }
]
export default routes;
