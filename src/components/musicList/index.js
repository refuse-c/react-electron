/*
 * @Author: RA
 * @Date: 2020-04-22 12:07:13
 * @LastEditTime: 2020-05-15 11:52:26
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';

import './index.scss';
import { formatNum, formatPlayTime, isEmpty, isArrays } from '../../common/utils/format';
import Empty from '../../components/empty';
// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainMusicList, setIndex, gainPlayLIst, setIsPlay, gainMusicId } from '../../store/actions';
class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muscicList: [],
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
    this.props.gainMusicId(item.id);
  }
  render() {
    const { pageNum, muscicList, musicId } = this.props;
    return (
      <div className="music_list">
        <ul>
          {
            isArrays(muscicList) ?
              muscicList && muscicList.map((item, index) => {
                const num = isEmpty(pageNum) || pageNum === 0 ? 1 : pageNum
                const indexs = musicId === item.id ? index : ''
                const sty = index === indexs ? 'ra_active' : ''
                const dis = item.st === -200 ? 'ra_disabled' : ''
                return (
                  <li
                    key={index}
                    className={sty + dis}
                    onDoubleClick={this.addMusic.bind(this, item, index)}
                  >
                    <div>{formatNum((num - 1) * 50 + index)}</div>
                    <div>{item.name}</div>
                    <div>{item.ar.map(item => item.name + '').join(' - ')}</div>
                    <div>{item.al.name}</div>
                    <div>{formatPlayTime(item.dt / 1000)}</div>
                  </li>
                )
              })
              :
              <Empty />
          }
        </ul>
      </div >
    );
  }
}

//注册store
const mapStateToProps = (state) => {
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
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);