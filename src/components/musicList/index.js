/*
 * @Author: RA
 * @Date: 2020-04-22 12:07:13
 * @LastEditTime: 2020-04-22 13:43:38
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';

import './index.scss';

import { formatNum, formatPlayTime } from '../../common/utils/format';
import { RAGet } from '../../api/netWork';
import { getMusicDetail } from '../../api/api';

class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: []
    }
  }
  componentDidMount = () => {
    const { musicIds } = this.props;
    this.getMusicDetail(musicIds);
  }
  componentWillReceiveProps = (nextProps) => {
    const { musicIds } = nextProps;
    this.getMusicDetail(musicIds);
  }
  getMusicDetail = (ids) => {
    this.setState({ musicList: [] })
    RAGet(getMusicDetail.api_url, {
      params: {
        ids: ids
      }
    }).then(res => {
      const musicList = res.songs;
      this.setState({ musicList })
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const { musicList } = this.state;
    return (
      <div className="music_list">
        <ul>
          {
            musicList && musicList.map((item, index) => {
              return (
                <li key={index}>
                  <div>{formatNum(index)}</div>
                  <div>{item.name}</div>
                  <div>{item.ar.map(item => item.name + '').join(' - ')}</div>
                  <div>{item.al.name}</div>
                  <div>{formatPlayTime(item.dt / 1000)}</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default MusicList;