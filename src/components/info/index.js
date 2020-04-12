/*
 * @Author: RA
 * @Date: 2020-04-01 17:07:55
 * @LastEditTime: 2020-04-12 16:46:32
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { Route, Redirect } from 'react-router-dom';
// import 'react-scrollbar/dist/css/scrollArea.css';
// import ScrollArea from 'react-scrollbar';
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="info">
        {
          this.props.routes.map((item, key) => {
            return <Route true key={key} path={item.path} component={item.component} />
          })
        }
        <Redirect to="/home/search" />
      </div>
    );
  }
}

export default Info;