/*
 * @Author: RA
 * @Date: 2020-04-02 20:05:10
 * @LastEditTime: 2020-05-29 17:37:04
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';

import { Route, NavLink } from 'react-router-dom';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
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
      ]
    }
  }
  componentDidMount = () => {
    // console.log(this.props)
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
        {/* <div className="find-area"> */}
        <ScrollArea
          speed={1}
          className="area"
          ref={ref => (this.content = ref)}
        >
          <div className="videos-area">
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
    );
  }
}

export default Videos;