/*
 * @Author: RA
 * @Date: 2020-04-02 20:05:10
 * @LastEditTime: 2020-07-08 14:16:12
 * @LastEditors: refuse_c
 * @Description: 发现音乐
 */
import React, { Component } from 'react';
import './index.scss';

import { Route, NavLink } from 'react-router-dom';
import ScrollView from 'react-custom-scrollbars';
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
        // {
        //   name: '主播电台',
        //   path: '/home/find/hostRadio'
        // },
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
  componentDidMount = () => { }
  /*监听滚动*/
  onScroll = e => {
    if (e.target.scrollTop + e.target.clientHeight - 100 === e.target.scrollHeight - 100) {
      // 滚动到底部需要做的事情
      this.setState({ loadMore: true })
      this.setState({ loadMore: false })
    }
  }
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };
  render() {
    const { findNav, loadMore } = this.state;
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
        <div className="find-area">
          <ScrollView onScroll={this.onScroll}>
            <div className="find-content">
              {
                routes.map((route, key) => {
                  return <Route exact key={key} path={route.path}
                    render={props => (
                      <route.component {...props} routes={route.routes} loadMore={loadMore} />
                    )}
                  />
                })
              }
            </div>
          </ScrollView>
        </div>
      </div>
    );
  }
}

export default Find;