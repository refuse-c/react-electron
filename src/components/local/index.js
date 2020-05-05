/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-04-27 11:54:11
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
    console.log(list)
    return (
      <ScrollArea
        speed={0.8}
        className="area"
        contentClassName="content"
        vertical={true}
        horizontal={true}
        minScrollSize={5}
      >
        {/* <audio src="file:///F:/CloudMusic/%E6%A2%85%E8%89%B3%E8%8A%B3%20-%20%E4%B8%80%E7%94%9F%E7%88%B1%E4%BD%A0%E5%8D%83%E7%99%BE%E5%9B%9E.mp3" controls></audio> */}
        <div className="local">
          {
            list.map((item, index) => {
              return (
                <div key={index}>{item.title}</div>
              )
            })
          }
        </div>
      </ScrollArea>
    );
  }
}

export default Local;