/*
 * @Author: RA
 * @Date: 2020-04-01 15:56:06
 * @LastEditTime: 2020-05-25 13:40:17
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
        <Redirect to="/home/find/findList" />
        {/* <Redirect to="/videoDetailC6B041BC93D37665B75499051067896F" /> */}
      </Router>
    </div>

  );
}

export default App;
