/*
 * @Author: RA
 * @Date: 2020-04-01 15:56:06
 * @LastEditTime: 2020-04-18 11:42:44
 * @LastEditors: RA
 * @Description: 
 */
import React from 'react';
import 'reset.css';
import './App.scss';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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
        <Redirect to="/home/find" />
      </Router>
    </div >

  );
}

export default App;
