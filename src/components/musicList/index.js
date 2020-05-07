/*
 * @Author: RA
 * @Date: 2020-04-22 12:07:13
 * @LastEditTime: 2020-05-07 20:48:32
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';

import './index.scss';
import { formatNum, formatPlayTime, isEmpty } from '../../common/utils/format';

// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainMusicList, setIndex, gainPlayLIst, setIsPlay } from '../../store/actions';
import { RAGet } from '../../api/netWork';
import { getMusicUrl } from '../../api/api';
class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicIds: [],
      // musicList: [],
      playList: []
    }
  }
  addMusic = (item) => {
    const { playList } = this.props;
    const array = JSON.parse(JSON.stringify(playList));
    array.forEach((element, index) => {
      if (element.id === item.id) {
        // if (index === 0) return;
        array.splice(index, 1)
      }
    });
    array.unshift(item);
    this.props.setIndex(0);
    this.props.gainPlayLIst(array);
    this.props.setIsPlay(true);
  }
  getMusicUrl = (id) => {
    RAGet(getMusicUrl.api_url, {
      params: {
        id: id
      }
    }).then(res => {
      console.log(res.data[0].url)
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const { currentPage, musicIds, musicId } = this.props;
    return (
      <div className="music_list">
        <ul>
          {
            musicIds && musicIds.map((item, index) => {
              // console.log(item)
              const num = isEmpty(currentPage) || currentPage === 0 ? 1 : currentPage
              const indexs = musicId === item.id ? index : ''

              const sty = index === indexs ? 'ra_active' : ''
              return (
                <li
                  key={index}
                  className={sty}
                  onClick={this.addMusic.bind(this, item, index)}
                >
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
      </div >
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  console.log(state)
  return {
    musicList: state.musicList,
    playList: state.playList,
    musicId: state.musicId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
    gainPlayLIst: bindActionCreators(gainPlayLIst, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);