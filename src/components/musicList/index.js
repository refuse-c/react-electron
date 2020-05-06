/*
 * @Author: RA
 * @Date: 2020-04-22 12:07:13
 * @LastEditTime: 2020-05-06 23:59:12
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';

import './index.scss';
import { formatNum, formatPlayTime, isEmpty } from '../../common/utils/format';

// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainMusicList, gainMusicId, gainPlayLIst } from '../../store/actions';
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
    this.props.gainMusicId(item.id);
    this.props.gainPlayLIst(array);
  }
  render() {
    const { currentPage, musicIds } = this.props;
    return (
      <div className="music_list">
        <ul>
          {
            musicIds && musicIds.map((item, index) => {
              const num = isEmpty(currentPage) || currentPage === 0 ? 1 : currentPage
              return (
                <li
                  key={index}
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
    playList: state.playList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    gainPlayLIst: bindActionCreators(gainPlayLIst, dispatch),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);