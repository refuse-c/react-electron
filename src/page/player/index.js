/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 16:31:03
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-04-03 17:17:51
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  back = () => {
    console.log(this.props)
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="player">
        <h4>this is player page</h4>
        <button onClick={this.back} className="back">back</button>
      </div >
    );
  }
}

export default Player;