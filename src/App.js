/*
 * @Author: RA
 * @Date: 2020-04-01 15:56:06
 * @LastEditTime: 2020-04-03 16:49:03
 * @LastEditors: refuse_c
 * @Description: 
 */
import React from 'react';
import 'reset.css';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './router';
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
      </Router>
    </div >

  );
}

export default App;
