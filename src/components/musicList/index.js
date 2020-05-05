/*
 * @Author: RA
 * @Date: 2020-04-22 12:07:13
 * @LastEditTime: 2020-05-01 14:30:58
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';

import './index.scss';

import { formatNum, formatPlayTime, isEmpty } from '../../common/utils/format';
import { RAGet } from '../../api/netWork';
import { getMusicDetail } from '../../api/api';

// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainMusicList } from '../../store/actions';
class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicIds: '',
      // musicList: [],
      playList: []
    }
  }
  componentDidMount = () => {
    const { musicIds } = this.props;
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
  getMusicDetail = (ids) => {
    if (isEmpty(ids)) return;
    this.props.gainMusicList([])
    RAGet(getMusicDetail.api_url, {
      params: { ids: ids }
    }).then(res => {
      const musicList = res.songs;
      this.props.gainMusicList(musicList)
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const { currentPage, playList, musicList } = this.props;
    console.log(musicList, playList)

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

//注册store
const mapStateToProps = (state) => {
  console.log(state)
  return {
    musicList: state.musicList,
    playList: state.playList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);