/*
 * @Author: RA
 * @Date: 2020-04-01 17:10:30
 * @LastEditTime: 2020-05-08 19:01:28
 * @LastEditors: RA
 * @Description: 
 */
import Index from '../page/index/';
import Player from '../page/player';
import Home from '../page/home';
import Search from '../page/search';
import Find from '../page/find';
import Video from '../components/video';
import Frind from '../components/frind';
import Local from '../components/local';
import Down from '../components/down';
import Lately from '../components/lately';
import List from '../components/list';
import IM from '../components/im';
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
            path: '/home/find',
            component: Find,
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
            path: '/home/list:id',
            component: List
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
