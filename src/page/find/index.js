/*
 * @Author: RA
 * @Date: 2020-04-02 20:05:10
 * @LastEditTime: 2020-06-03 16:43:28
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';

import { Route, NavLink } from 'react-router-dom';
// import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findNav: [
        {
          name: '个性推荐',
          path: '/home/find'
        },
        {
          name: '歌单',
          path: '/home/find/findList'
        },
        {
          name: '主播电台',
          path: '/home/find/hostRadio'
        },
        {
          name: '排行榜',
          path: '/home/find/rankingList'
        },
        {
          name: '歌手',
          path: '/home/find/findSinger'
        },
        {
          name: '最新音乐',
          path: '/home/find/newMusic'
        }
      ]
    }
  }
  componentDidMount = () => {
    // console.log(this.props)
  }
  render() {
    const { findNav } = this.state;
    const { routes } = this.props;
    return (
      <div className="find">
        <div className="find_nav">
          <ul>
            {
              findNav.map((item, index) => {
                return (
                  <NavLink exact activeClassName="active" key={index} to={item.path}>
                    <li> {item.name}</li>
                  </NavLink>
                )
              })
            }
          </ul>
        </div>
        {/* <div className="find-area"> */}
        <ScrollArea
          speed={1}
          className="area"
          ref={ref => (this.content = ref)}
        >
          <div className="find-area">
            {
              routes.map((route, key) => {
                return <Route exact key={key} path={route.path}
                  render={props => (
                    <route.component {...props} routes={route.routes} />
                  )}
                />
              })
            }
          </div>
        </ScrollArea>
      </div>
      // </div>
    );
  }
}

export default Find;