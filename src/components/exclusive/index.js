/*
 * @Author: REFUSE_C
 * @Date: 2020-06-03 16:36:17
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-09 16:27:19
 * @Description:独家放送展示组件
 */
import React, { Component } from 'react';
import './index.scss';
import { imgParam } from '../../common/utils/format';
import { message } from 'antd';
class Exclusive extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  handleToVideo = (item) => {
    const { history } = this.props;
    const ids = item.type === 5 ? item.id : item.type === 62 ? item.videoId : item.id
    if (item.type === 5 || item.type === 62) {
      history.push({ pathname: `/videoDetail${ids}` });
    } else {
      message.destroy();
      message.warn('目前独家放送只支持视频播放,其他均不支持');
    }
  }
  render() {
    const { data } = this.props;
    return (
      <div className="exclusive-list">
        <ul>
          {
            data.length > 0 && data.map((item, index) => {
              const type = item.type;
              const active = type === 5 || type === 62 ? 'v' : type === 6 ? 't' : 'l'
              return (
                <li key={index} onClick={this.handleToVideo.bind(this, item, index)}>
                  <div>
                    <p className={active}></p>
                    <img src={imgParam(item.picUrl || item.cover, 336, 123)} alt="" />
                  </div>
                  <p>{item.name}</p>
                </li>

              )
            })
          }
        </ul>
      </div >
    );
  }
}

export default Exclusive;