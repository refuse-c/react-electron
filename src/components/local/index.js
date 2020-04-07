/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-04-04 11:07:00
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
// const fs = window.require('fs');
const { ipcRenderer: ipc } = window.require('electron');
class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }
  componentDidMount = () => {
    this.setState({ list: ipc.sendSync('files') })
  }
  render() {
    const { list } = this.state;
    // console.log(list)
    return (
      <div className="local">
        {/* <input id="inputBox" type="file" /> */}
        {
          list.map((item, index) => {
            return (
              <div key={index}>{item}</div>
            )
          })
        }
       }
      </div>
    );
  }
}

export default Local;