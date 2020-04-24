/*
 * @Author: RA
 * @Date: 2020-04-22 12:07:13
 * @LastEditTime: 2020-04-24 16:04:24
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';

import './index.scss';

import { formatNum, formatPlayTime, isEmpty } from '../../common/utils/format';
import { RAGet } from '../../api/netWork';
import { getMusicDetail } from '../../api/api';

class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicIds: '',
      musicList: []
    }
  }
  componentDidMount = () => {
    const { musicIds } = this.props;
    // console.log(musicIds)
    this.getMusicDetail(musicIds);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { musicIds } = nextProps;
    if (musicIds !== prevState.musicIds) {
      return {
        musicIds,
        props: {
          musicIds
        }
      }
    }
    return null;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.musicIds !== this.props.musicIds) {
      this.getMusicDetail(this.props.musicIds);
    }
  }
  // componentWillReceiveProps = (nextProps) => {
  //   const { musicIds } = nextProps;
  //   console.log(musicIds)
  //   this.getMusicDetail(musicIds);
  // }
  getMusicDetail = (ids) => {
    this.setState({ musicList: [] })
    RAGet(getMusicDetail.api_url, {
      params: { ids: ids }
    }).then(res => {
      console.log(res)
      const musicList = res.songs;
      this.setState({ musicList })
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const { musicList } = this.state;
    const { currentPage } = this.props;
    return (
      <div className="music_list">
        <ul>
          {
            musicList && musicList.map((item, index) => {
              const num = isEmpty(currentPage) || currentPage === 0 ? 1 : currentPage
              return (
                <li key={index}>
                  <div>{formatNum((num - 1) * 50 + index)}</div>
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