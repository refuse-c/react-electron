/*
 * @Author: RA
 * @Date: 2020-04-01 17:07:55
 * @LastEditTime: 2020-04-02 21:33:35
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
// import Find from '../find'
import { Route } from 'react-router-dom';
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
            console.log(item.path, item.component.name)
            return <Route true key={key} path={item.path} component={item.component} />
          })
        }
      </div>
    );
  }
}

export default Info;