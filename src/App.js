/*
 * @Author: RA
 * @Date: 2020-04-01 15:56:06
 * @LastEditTime: 2020-05-19 21:22:18
 * @LastEditors: RA
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
        <Redirect to="/home/find" />
      </Router>
    </div>

  );
}

export default App;
