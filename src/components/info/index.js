/*
 * @Author: RA
 * @Date: 2020-04-01 17:07:55
 * @LastEditTime: 2020-05-15 18:17:04
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { Route } from 'react-router-dom';
// import 'react-scrollbar/dist/css/scrollArea.css';
// import ScrollArea from 'react-scrollbar';
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { routes } = this.props;
    return (
      <div className="info">
        {
          routes.map((route, key) => {
            return <Route key={key} path={route.path}
              render={props => (
                <route.component {...props} routes={route.routes} />
              )}
            />
          })
        }
      </div>
    );
  }
}

export default Info;