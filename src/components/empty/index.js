/*
 * @Author: RA
 * @Date: 2020-04-20 12:19:27
 * @LastEditTime: 2020-06-09 13:41:50
 * @LastEditors: refuse_c
 * @Description: 空数据组件
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
        <p>哎呀,你查看内容被外星人拦截了···</p>
      </div>
    );
  }
}

export default empty;