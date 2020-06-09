/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-09 16:28:21
 * @Description:朋友
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { getMusicUrl } from '../../api/api';
import { isEmpty } from '../../common/utils/format';
const { ipcRenderer: ipc } = window.require('electron');

class Frind extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount = () => { }
  getMusicUrl = (id) => {
    RAGet(getMusicUrl.api_url, {
      params: {
        id: '1374329431',
        br: 128000, //码率, 默认设置了 999000 即最大码率, 如果要 320k 则可设置为 320000, 其他类推
      },
    }).then((res) => {
      const url = res.data[0].url;
      if (!isEmpty(url)) {
        ipc.send('down', url);
      }
    }).catch((err) => {
      console.log(err);
    });
  };
  render() {
    return (
      <div className="frind">
        page friend
      </div>
    );
  }
}

export default Frind;