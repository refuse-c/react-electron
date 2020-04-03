/*
 * @Author: RA
 * @Date: 2020-04-01 17:10:30
 * @LastEditTime: 2020-04-03 17:58:34
 * @LastEditors: refuse_c
 * @Description: 
 */
import Index from '../page/index/';
import Player from '../page/player';
import Home from '../page/home';
import Search from '../components/search';
import Find from '../components/find';
import Video from '../components/video';
import Frind from '../components/frind';
import Local from '../components/local';
import Down from '../components/down';
import Lately from '../components/lately';
import List from '../components/list';
let routes = [
  {
    path: '/',
    component: Index,
    routes: [
      {
        path: '/',
        component: Home,
        routes: [
          {
            path: '/search',
            component: Search,
          },
          {
            path: '/home/find',
            component: Find
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
      }]
  }
]
export default routes;
