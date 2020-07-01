/*
 * @Author: RA
 * @Date: 2020-04-02 20:05:10
 * @LastEditTime: 2020-07-01 17:06:54
 * @LastEditors: refuse_c
 * @Description: 视频页
 */
import React, { Component } from 'react';
import './index.scss';

import { Route, NavLink } from 'react-router-dom';
import ScrollView from 'react-custom-scrollbars';
class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoNav: [
        {
          name: '视频',
          path: '/home/video/'
        },
        {
          name: 'MV',
          path: '/home/video/mv'
        }
      ],
      loadMore: false
    }
  }
  componentDidMount = () => {
  }
  /*监听滚动*/
  onScroll = e => {
    if (e.target.scrollTop + e.target.clientHeight - 100 === e.target.scrollHeight - 100) {
      // 滚动到底部需要做的事情
      this.setState({ loadMore: true })
      this.setState({ loadMore: false })
    }
  }
  render() {
    const { videoNav } = this.state;
    const { routes } = this.props;
    return (
      <div className="videos">
        <div className="videos_nav">
          <ul>
            {
              videoNav.map((item, index) => {
                return (
                  <NavLink exact activeClassName="active" key={index} to={item.path}>
                    <li> {item.name}</li>
                  </NavLink>
                )
              })
            }
          </ul>
        </div>
        <div className="videos-area">
          <ScrollView onScroll={this.onScroll}>
            {
              routes.map((route, key) => {
                return <Route exact key={key} path={route.path}
                  render={props => (
                    <route.component {...props} routes={route.routes} loadMore={this.state.loadMore} />
                  )}
                />
              })
            }
          </ScrollView>
        </div>
      </div>
    );
  }
}

export default Videos;