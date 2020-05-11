/*
 * @Author: RA
 * @Date: 2020-04-02 11:14:28
 * @LastEditTime: 2020-05-10 19:14:13
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { getMusicDetail } from '../../api/api';
import { formatPlayTime, isEmpty, imgParam } from '../../common/utils/format';
// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPlayModel, setIsPlay, setIndex, gainMusicId, gainPlayLIst, setPlayListStatus } from '../../store/actions';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      musicId: '',
      duration: 0,
      progress: 0,
      isPlay: false,
      bufferTime: 0
    }
  }
  componentDidMount() {
    const { playList, index } = this.props;
    playList.length > 0 ? this.props.gainMusicId(playList[index].id) : this.props.gainMusicId();
    const audio = this.audio;
    audio.volume = 0.1;
    // 这里需要设置audio的canplay事件监听
    audio.addEventListener("canplay", () => {
      //获取总时间
      const duration = parseInt(audio.duration);
      this.setState({ duration });
    });
    // 播放中添加时间变化监听
    audio.addEventListener("timeupdate", () => {
      const currentTime = parseInt(audio.currentTime);
      this.setState({ currentTime });
      // 缓存时间
      const buffered = audio.buffered;
      let bufferTime = 0;
      if (buffered.length !== 0) {
        bufferTime = buffered.end(buffered.length - 1);
        this.setState({ bufferTime })
      }
      //进度条
      const range = this.range;
      const { duration } = this.state;
      if (isEmpty(duration)) return;
      const time = currentTime / duration;
      let progress = time * range.max;
      if (isNaN(progress)) return;
      range.style.backgroundSize = time * 100 + `% 100%`;
      this.setState({ progress });
    });

    // 当前音乐播放完毕监听
    audio.addEventListener("ended", () => {
      this.handelNext();
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { musicId, isPlay } = nextProps;
    if (musicId !== prevState.musicId) {
      return {
        musicId,
        props: {
          musicId: musicId
        }
      }
    }
    if (isPlay !== prevState.isPlay) {
      return {
        isPlay,
        props: {
          isPlay: isPlay
        }
      }
    }
    return null;
  }
  componentDidUpdate(prevState) {
    // 当前音乐更新了
    if (prevState.musicId !== this.state.musicId) {
      const { musicId } = this.state;
      const { isPlay } = this.props;
      if (!isPlay) return;
      this.getMusicDetail(musicId);
      this.props.gainMusicId(musicId);
      this.props.setIsPlay(true);
      const audio = this.audio;
      audio.play();
    }
    if (prevState.isPlay !== this.state.isPlay) {
      const { isPlay, musicId } = this.props;
      if (isPlay) {
        const audio = this.audio;
        audio.play();
        this.props.setIsPlay(true);
        this.getMusicDetail(musicId);
      }

    }
  }
  //获取音乐图片
  getMusicDetail = (id) => {
    RAGet(getMusicDetail.api_url, {
      params: {
        ids: id
      }
    }).then(res => {
      const { index, playList } = this.props;
      playList[index].picUrl = res.songs[0].al.picUrl;
      this.props.gainPlayLIst(playList);
    }).catch(err => {
      console.log(err)
    })
  }
  gotoPlayer = () => {
    const path = this.props.history.location.pathname;
    if (path === '/player') {
      this.props.history.goBack();
    } else {
      this.props.history.push({ pathname: '/player' })
    }

  }
  // 播放
  onPlay = () => {
    const audio = this.audio;
    if (isEmpty(audio.src.split('?id=')[1])) return;
    this.props.setIsPlay(true);
    audio.play();
  };

  // 暂停
  onPause = () => {
    const audio = this.audio;
    if (isEmpty(audio.src.split('?id=')[1])) return;
    this.props.setIsPlay(false);
    audio.pause();
  };
  handelPrev = () => {
    const { playList, isPlay, index } = this.props;
    const maxLength = playList.length - 1;
    let num = 0;
    if (index === 0) {
      num = maxLength;
    } else {
      let i = index;
      num = --i;
      if (playList[num].st === -200) {
        num = --num
      }
    }
    if (!isPlay) {
      this.props.setIsPlay(true);
    }
    this.props.setIndex(num);
    this.props.gainMusicId(playList[num].id);
  }

  handelNext = () => {
    const { playModel, playList, isPlay, index } = this.props;
    const maxLength = playList.length - 1;
    let num = 0;
    if (playModel === '1') {
      if (index === maxLength) {
        num = 0;
      } else {
        let i = index;
        num = ++i;
      }
      if (playList[num].st === -200) {
        num = ++num;
      }
    } else if (playModel === '2') {
      num = index;
    } else {
      num = Math.floor(Math.random() * maxLength);
    }
    if (!isPlay) {
      this.props.setIsPlay(true);
    }
    this.props.setIndex(num);
    this.props.gainMusicId(playList[num].id);
  }
  changeInput = () => {
    const audio = this.audio;
    const range = this.range;
    const { duration } = this.state;
    const max = range.max;
    const val = range.value;
    const currentTime = val / max * duration;
    audio.currentTime = currentTime;
    this.setState({ currentTime })
  }
  playModel = () => {
    const { playModel } = this.props;
    switch (playModel) {
      case '1': this.props.setPlayModel('2'); break;
      case '2': this.props.setPlayModel('3'); break;
      default: this.props.setPlayModel('1'); break;
    }
  }
  showPlayList = () => {
    const { showPlayList } = this.props;
    showPlayList ? this.props.setPlayListStatus(false) : this.props.setPlayListStatus(true)
  }
  render() {
    const { currentTime, duration, progress } = this.state;
    const { playModel, playList, index, isPlay, musicId } = this.props;
    return (
      <div className="footer">
        <div className="control">
          {
            playList.length !== 0 && !isEmpty(playList[index].picUrl) ?
              <img
                onClick={this.gotoPlayer}
                src={imgParam(playList[index].picUrl, 100, 100)}
                alt=""
              /> :
              <img
                onClick={this.gotoPlayer}
                src={require('../../common/images/logo.png')}
                alt=""
              />
          }

          <i onClick={this.handelPrev} className="icon_prev"></i>
          {
            isPlay ?
              <i
                onClick={this.onPause}
                className="icon_pause"
              >
              </i>
              :
              <i
                onClick={this.onPlay}
                className="icon_play"
              >
              </i>
          }
          <i onClick={this.handelNext.bind(this)} className="icon_next"></i>
        </div>
        <div className="progress">
          <div className="progress_time">
            <p>{formatPlayTime(currentTime)}</p>
            <p>{formatPlayTime(duration)}</p>
          </div>
          <input
            onChange={this.changeInput}
            ref={range => this.range = range}
            type="range"
            min="0"
            max="1000"
            value={progress}
          />
          <div className="range"></div>
        </div>
        <div className="tools">
          <i className="icon_unlike icon_like"></i>
          {
            playModel === '1' ?
              <i
                onClick={this.playModel}
                className="icon_order"
              >
              </i>
              :
              playModel === '2' ?
                <i
                  onClick={this.playModel}
                  className="icon_cycle"
                >
                </i>
                :
                <i
                  onClick={this.playModel}
                  className="icon_random"
                >
                </i>

          }
          <i className="icon_volume icon_mute"></i>
          <i onClick={this.showPlayList} className="icon_list"></i>
        </div>
        {
          playList.length !== 0 ?
            <audio
              loop={playModel === '1' ? false : playModel === '2' ? true : false}
              ref={ref => (this.audio = ref)}
              src={`https://music.163.com/song/media/outer/url?id=${musicId}`}
            ></audio>
            : <audio ref={ref => (this.audio = ref)}></audio>
        }


      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    musicId: state.musicId,
    playList: state.playList,
    playModel: state.playModel,
    index: state.index,
    isPlay: state.isPlay,
    showPlayList: state.showPlayList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayModel: bindActionCreators(setPlayModel, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    gainPlayLIst: bindActionCreators(gainPlayLIst, dispatch),
    setPlayListStatus: bindActionCreators(setPlayListStatus, dispatch),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);