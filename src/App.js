/*
 * @Author: RA
 * @Date: 2020-04-01 15:56:06
 * @LastEditTime: 2020-07-09 19:56:21
 * @LastEditors: RA
 * @Description:
 */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import 'react-scrollbar/dist/css/scrollArea.css';
import 'reset.css';
import './App.scss';
import debounce from './common/utils/debounce';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import routes from './router';

global.debounce = debounce; // 防抖
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }




  render() {
    return (
      <div className="App">
        <Router>
          {routes.map((route, key) => {
            if (route.exact) {
              return (
                <Route
                  key={key}
                  exact
                  path={route.path}
                  render={(props) => (
                    <route.component {...props} routes={route.routes} />
                  )}
                />
              );
            } else {
              return (
                <Route
                  key={key}
                  path={route.path}
                  render={(props) => (
                    <route.component {...props} routes={route.routes} />
                  )}
                />
              );
            }
          })}
          {/* <Redirect to="/videoDetail3A04EA2BAB69AEA8B9EB9A58F682F076" /> */}
          <Redirect to="/home/singerdetail30285885/" />
          {/* <Redirect to="/home/find/rankingList" /> */}
          {/* <Redirect to="/home/albumList4546" /> */}
          {/* <Redirect to="/videoDetail5331966" /> */}
        </Router>
      </div >
    );
  }
}

export default App;

