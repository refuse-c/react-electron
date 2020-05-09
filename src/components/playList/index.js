/*
 * @Author: RA
 * @Date: 2020-05-08 19:19:33
 * @LastEditTime: 2020-05-09 16:36:56
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';

import './index.scss';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
// store 
import { connect } from 'react-redux';
import { formatNum, formatPlayTime } from '../../common/utils/format';
import { bindActionCreators } from 'redux';
import { setIndex, setIsPlay, gainMusicId } from '../../store/actions';
class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlayList: false,
      index: 0
    }
  }
  componentDidMount = () => {
    const { index } = this.props;
    setTimeout(() => {
      this.content.scrollArea.scrollYTo(index * 24);
    }, 10);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { index } = nextProps;
    if (index !== prevState.index) {
      return {
        index,
        props: {
          index: index
        }
      }
    }
    return null;
  }
  componentDidUpdate(prevState) {
    if (prevState.index !== this.state.index) {
      const { index } = this.state;
      this.content.scrollArea.scrollYTo(index * 24);
    }
  }
  two = (e) => {
    e.stopPropagation();
  }
  top = () => {
    this.content.scrollArea.scrollTop()
  }
  playMusic = (index) => {
    const { playList } = this.props;
    const musicId = playList[index].id;
    this.props.setIndex(index);
    this.props.setIsPlay(true);
    this.props.gainMusicId(musicId);
  }
  render() {
    const { playList, musicId, index } = this.props;
    // console.log(playList)
    const length = playList.length;
    return (
      <div className="play-list" onClick={this.two}>
        <div
          onClick={this.top}
          className="play-lis-title">播放列表<p>{'（' + (index + 1) + ' / ' + length + '）'}</p></div>
        <div className="scroll">
          <ScrollArea
            speed={1}
            className="area"
            ref={ref => (this.content = ref)}
          >
            <ul>
              {
                playList.length > 0 && playList.map((item, index) => {
                  const indexs = musicId === item.id ? index : ''
                  const sty = index === indexs ? 'rc_active' : ''
                  const dis = item.st === -200 ? 'rc_disabled' : ''
                  return (
                    <li
                      key={index}
                      className={sty + dis}
                      onClick={this.playMusic.bind(this, index)}
                    >
                      <div>{formatNum(index)}</div>
                      <div>{item.name}</div>
                      <div>{formatPlayTime(item.dt / 1000)}</div>
                    </li>
                  )
                })
              }
            </ul>
          </ScrollArea>
        </div>
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    playList: state.playList,
    musicId: state.musicId,
    index: state.index,
    showPlayList: state.showPlayList,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIndex: bindActionCreators(setIndex, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayList);