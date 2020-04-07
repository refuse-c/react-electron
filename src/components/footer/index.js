/*
 * @Author: RA
 * @Date: 2020-04-02 11:14:28
 * @LastEditTime: 2020-04-04 00:48:58
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  gotoPlayer = () => {
    this.props.history.push({ pathname: '/player' })
  }
  render() {
    return (
      <div className="footer">
        <img onClick={this.gotoPlayer} src="https://p1.music.126.net/cm7rMj_I2qHwKyB2gRsauA==/109951163667867598.jpg?param=300y300" alt="" />
      </div>
    );
  }
}

export default Footer;