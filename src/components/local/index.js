/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-04-08 17:53:08
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
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
      <ScrollArea
        speed={0.8}
        className="area"
        contentClassName="content"
        vertical={true}
        horizontal={true}
        minScrollSize={5}
      >
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
      </ScrollArea>
    );
  }
}

export default Local;