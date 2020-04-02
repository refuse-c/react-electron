/*
 * @Author: RA
 * @Date: 2020-04-01 17:10:30
 * @LastEditTime: 2020-04-02 21:26:10
 * @LastEditors: RA
 * @Description: 
 */
import Home from '../page/home';
import Search from '../components/search';
import Find from '../components/find'

let routes = [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/search',
        component: Search,
        exact: true,
      },
      {
        path: '/find',
        component: Find,
      }
    ]
  }
]
export default routes;
