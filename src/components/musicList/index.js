/*
 * @Author: RA
 * @Date: 2020-04-22 12:07:13
 * @LastEditTime: 2020-07-17 16:36:46
 * @LastEditors: refuse_c
 * @Description:音乐列表展示组件
 */
import React, { Component } from 'react';

import './index.scss';
import {
  formatNum,
  formatPlayTime,
  isEmpty,
  isArrays,
  getLocal,
  jumpDetails,
} from '../../common/utils/format';
import Empty from '../empty';
import Tools from './tools';
// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  gainMusicList,
  setIndex,
  gainPlayList,
  setIsPlay,
  gainMusicId,
  setToolsStatus,
} from '../../store/actions';
class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muscicList: [],
      playList: [],
      showTools: false,
      sty: {},
      items: {},
      indexs: NaN,
    };
  }
  addMusic = (item) => {
    let flag = null;
    const array = getLocal('playList') || [];

    array.forEach((element, index) => {
      if (element.id === item.id) {
        flag = index;
        return false;
      }
    });
    if (!isEmpty(flag)) {
      this.props.setIndex(flag);
      flag = null;
    } else {
      const { index } = this.props;
      const length = array.length;
      length === index
        ? array.push(item) && this.props.setIndex(index)
        : array.splice(index + 1, 0, item) && this.props.setIndex(index + 1)
      this.props.gainPlayList(array);

    }
    this.props.setIsPlay(true);
    this.props.gainMusicId(item.id);
  };

  handelContextMenu = (item, index, e) => {
    this.setState({ showTools: false });
    const a = e.screenX;
    const b = e.screenY;
    const c = window.screenX;
    const d = window.screenY;
    const f = window.innerWidth;
    const g = window.innerHeight;

    let sty = {};
    const obj = document
      .getElementsByClassName('aaaa')
    [index].getBoundingClientRect();
    if (b - d > g - 210) {
      sty.top = b - d - 210;
    } else {
      sty.top = obj.y + 20;
    }
    if (a - c > f - 200) {
      sty.left = a - c - 220;
    } else {
      sty.left = a - c + 20;
    }
    this.setState({ showTools: true, sty, item, index });
    this.props.setToolsStatus(true);
  };
  gotoAlbum = id => {
    jumpDetails(this, 'album', id)
  }
  gotoSinger = id => {
    jumpDetails(this, 'singer', id)
  }
  render() {
    const { pageNum, muscicList, musicId, toolStatus } = this.props;
    const { sty, item, index } = this.state;
    return (
      <div className="music_list">
        {toolStatus ? <Tools sty={sty} item={item} num={index} /> : null}
        <ul className="c">
          {isArrays(muscicList) ? (
            muscicList &&
            muscicList.map((item, index) => {
              const num = isEmpty(pageNum) || pageNum === 0 ? 1 : pageNum;
              const indexs = musicId === item.id ? index : '';
              const sty = index === indexs ? 'ra_active' : '';
              const dis = item.st === -200 ? 'ra_disabled' : '';
              return (
                <li
                  ref={(musicList) => (this.musicList = musicList)}
                  key={index}
                  className={`aaaa ${sty + dis}`}
                  onDoubleClick={this.addMusic.bind(this, item, index)}
                  onContextMenu={this.handelContextMenu.bind(this, item, index)}
                >
                  <div>{formatNum((num - 1) * 50 + index)}</div>
                  <div>{item.name}</div>
                  <div>{item.ar.map((item, index) => <span onClick={this.gotoSinger.bind(this, item.id)} key={index}>{item.name}</span>)}</div>
                  <div onClick={this.gotoAlbum.bind(this, item.al.id)}>{item.al.name}</div>
                  <div>{formatPlayTime(item.dt / 1000)}</div>
                </li>
              );
            })
          ) : (
              <Empty />
            )}
        </ul>
      </div>
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  return {
    musicList: state.musicList,
    index: state.index,
    playList: state.playList,
    musicId: state.musicId,
    toolStatus: state.toolStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
    gainPlayList: bindActionCreators(gainPlayList, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    setToolsStatus: bindActionCreators(setToolsStatus, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
