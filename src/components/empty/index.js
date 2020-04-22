/*
 * @Author: RA
 * @Date: 2020-04-20 12:19:27
 * @LastEditTime: 2020-04-20 12:54:27
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
class empty extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="empty">
        <img src={require('../../common/images/empty.png')} alt="" />
        <p>哎呀,您检索的内容被外星人拦截了···</p>
      </div>
    );
  }
}

export default empty;