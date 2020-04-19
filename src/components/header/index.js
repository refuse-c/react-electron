/*
 * @Author: RA
 * @Date: 2020-04-02 14:46:55
 * @LastEditTime: 2020-04-19 12:25:48
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
const { ipcRenderer: ipc } = window.require('electron');

// const { ipcRenderer } = require('electron');
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  buttonClick = type => {
    ipc.send(type);

  };
  render() {

    return (
      <div className="header">
        <div className="left">EMusic</div>
        <div className="center"></div>
        <div className="right">
          <div className="icons min" title="最小化" onClick={e => this.buttonClick('min', e)}></div>
          <div className="icons max" title="最大化" onClick={e => this.buttonClick('max', e)}></div>
          <div className="icons close" title="关闭" onClick={e => this.buttonClick('close', e)}></div>
        </div>
      </div>
    );
  }
}

export default Header;