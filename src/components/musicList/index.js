/*
 * @Author: RA
 * @Date: 2020-04-22 12:07:13
 * @LastEditTime: 2020-06-01 17:44:38
 * @LastEditors: refuse_c
 * @Description:
 */
import React, { Component } from 'react';

import './index.scss';
import {
  formatNum,
  formatPlayTime,
  isEmpty,
  isArrays,
  getLocal,
} from '../../common/utils/format';
import Empty from '../../components/empty';
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
      indexs: NaN
    };
  }
  addMusic = (item) => {
    let flag = null;
    const array = getLocal('playList');
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
      array.unshift(item);
      // this.props.setIndex(0);
      this.props.gainPlayList(array);
    }
    this.props.setIsPlay(true);
    this.props.gainMusicId(item.id);
  };

  handelContextMenu = (item, index, e) => {
    this.setState({ showTools: false })
    const a = e.screenX;
    const b = e.screenY;
    const c = window.screenX;
    const d = window.screenY;
    const f = window.innerWidth;
    const g = window.innerHeight

    let sty = {};
    const obj = document.getElementsByClassName('aaaa')[index].getBoundingClientRect()
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
    this.setState({ showTools: true, sty, item, index })
  }


  render() {
    const { pageNum, muscicList, musicId } = this.props;
    const { sty, showTools, item, index } = this.state;
    return (
      <div className="music_list" >
        {
          showTools
            ? <Tools sty={sty} item={item} num={index} />
            : null
        }
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
                  ref={musicList => this.musicList = musicList}
                  key={index}
                  className={`aaaa ${sty + dis}`}
                  onDoubleClick={this.addMusic.bind(this, item, index)}
                  onContextMenu={this.handelContextMenu.bind(this, item, index)}
                >
                  <div>{formatNum((num - 1) * 50 + index)}</div>
                  <div>{item.name}</div>
                  <div>{item.ar.map((item) => item.name + '').join(' - ')}</div>
                  <div>{item.al.name}</div>
                  <div>{formatPlayTime(item.dt / 1000)}</div>
                </li>
              );
            })
          ) : (
              <Empty />
            )}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
    gainPlayList: bindActionCreators(gainPlayList, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
