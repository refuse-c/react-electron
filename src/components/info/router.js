/*
 * @Author: RA
 * @Date: 2020-04-02 16:57:12
 * @LastEditTime: 2020-04-02 16:59:55
 * @LastEditors: RA
 * @Description: 
 */
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Search from '../search';
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home/search" component={Search} />
        <Redirect to="/home/search" />
      </Switch>
    </Router>
  );
};
export default Routes;
