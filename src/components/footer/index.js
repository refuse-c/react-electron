/*
 * @Author: RA
 * @Date: 2020-04-02 11:14:28
 * @LastEditTime: 2020-04-12 16:31:21
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { formatPlayTime } from '../../common/utils/format';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0
    }
  }
  componentDidMount = () => {
    // this.setState({ currentTime: this.input.value })
  }
  gotoPlayer = () => {
    this.props.history.push({ pathname: '/player' })
  }
  changeInput = () => {
    this.setState({ currentTime: this.input.value })
    // this.input.value
  }
  render() {
    const { currentTime } = this.state;
    return (
      <div className="footer">
        <div className="control">
          <img onClick={this.gotoPlayer} src="https://p1.music.126.net/cm7rMj_I2qHwKyB2gRsauA==/109951163667867598.jpg?param=300y300" alt="" />
          <i className="icon_prev"></i>
          <i className="icon_play"></i>
          <i className="icon_next"></i>
        </div>
        <div className="progress">
          <div className="progress_time">
            <p>{formatPlayTime(currentTime)}</p>
            <p>05:36</p>
          </div>
          <input onInput={this.changeInput} ref={input => this.input = input} type="range" min="0" max="1000" />
        </div>
        <div className="tools">
          <i className="icon_unlike icon_like"></i>
          <i className="icon_volume icon_mute"></i>
          <i className="icon_list"></i>
        </div>
      </div>
    );
  }
}

export default Footer;