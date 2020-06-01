/*
 * @Author: RA
 * @Date: 2020-04-01 15:56:06
 * @LastEditTime: 2020-06-01 16:53:50
 * @LastEditors: refuse_c
 * @Description: 
 */
import React from 'react';
import 'reset.css';
import './App.scss';
import debounce from './common/utils/debounce';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import routes from './router';

global.debounce = debounce;// 防抖
function App() {
  return (
    <div className="App">
      <Router>
        {
          routes.map((route, key) => {
            if (route.exact) {
              return <Route key={key} exact path={route.path}
                render={props => (
                  <route.component {...props} routes={route.routes} />
                )}
              />
            } else {
              return <Route key={key} path={route.path}
                render={props => (
                  <route.component {...props} routes={route.routes} />
                )}
              />
            }
          })
        }
        <Redirect to="/home/search" />
        <Redirect to="/home/single4883935921" />
        {/* <Redirect to="/home/find/rankingList" /> */}
        {/* <Redirect to="/home/albumList4546" /> */}
        {/* <Redirect to="/videoDetail5331966" /> */}
      </Router>
    </div>

  );
}

export default App;
