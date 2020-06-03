/*
 * @Author: RA
 * @Date: 2020-04-02 11:14:28
 * @LastEditTime: 2020-06-03 22:57:26
 * @LastEditors: RA
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { getMusicDetail, getMusicUrl } from '../../api/api';
import {
  formatPlayTime,
  isEmpty,
  imgParam,
  setLocal,
  getLocal,
} from '../../common/utils/format';
// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setIsPlay,
  setIndex,
  gainMusicId,
  gainPlayList,
  setShowPopStatus,
  setCurrentTime,
} from '../../store/actions';
import { message } from 'antd';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playModel: getLocal('playModel') || '1', //1顺序播放 2随机播放 3单曲循环,
      currentTime: 0,
      musicId: '',
      duration: 0,
      progress: 0,
      isPlay: false,
      bufferTime: 0,
      url: '',
      volumeNum: getLocal('volumeNum') || 50,
    };
  }
  componentDidMount() {
    const audio = this.audio;
    const range = this.range;
    const buffer = this.buffer;
    const { playList, index } = this.props;
    playList.length > 0
      ? this.props.gainMusicId(playList[index].id)
      : this.props.gainMusicId(null);
    audio.addEventListener('canplay', () => {
      const duration = Math.floor(audio.duration);
      this.setState({ duration });
    });
    audio.addEventListener(
      'timeupdate',
      () => {
        audio.paused ? this.props.setIsPlay(false) : this.props.setIsPlay(true);
        const { duration } = this.state;
        const currentTime = audio.currentTime.toFixed(3);
        this.setState({ currentTime });
        this.props.setCurrentTime(currentTime);
        // if (isEmpty(duration)) return;
        const buffered = audio.buffered;
        let bufferTime = 0;
        if (buffered.length !== 0) {
          bufferTime = buffered.end(buffered.length - 1);
          const bw = (bufferTime / duration) * this.range.clientWidth;
          buffer.style.width = bw + 'px';
        }
        const time = currentTime / duration;
        let progress = time * range.max;
        if (isNaN(progress)) return;
        range.style.backgroundSize = time * 100 + `% 100%`;
        this.setState({ progress });
      },
      1
    );

    // 当前音乐播放完毕监听
    audio.addEventListener('ended', () => {
      this.handelNext();
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { musicId, isPlay } = nextProps;
    if (musicId !== prevState.musicId) {
      return {
        musicId,
        props: {
          musicId: musicId,
        },
      };
    }
    if (isPlay !== prevState.isPlay) {
      return {
        isPlay,
        props: {
          isPlay: isPlay,
        },
      };
    }
    return null;
  }
  componentDidUpdate(prevState) {
    if (prevState.musicId !== this.state.musicId) {
      const { musicId } = this.state;
      const { isPlay } = this.props;
      if (!isPlay) return;
      this.getMusicUrl(musicId);
      this.getMusicDetail(musicId);
      this.props.gainMusicId(musicId);
    }
    if (prevState.isPlay !== this.state.isPlay) {
      const { isPlay } = this.state;
      // const { musicId } = this.props;
      if (!isPlay) {
        this.audio.pause();
        // this.getMusicUrl(musicId);
        // this.getMusicDetail(musicId);
        // this.props.gainMusicId(musicId);
      }
    }
  }
  getMusicUrl = (id) => {
    RAGet(getMusicUrl.api_url, {
      params: {
        id: id,
        br: 128000, //码率, 默认设置了 999000 即最大码率, 如果要 320k 则可设置为 320000, 其他类推
      },
    })
      .then((res) => {
        const audio = this.audio;
        const url = res.data[0].url;
        if (isEmpty(url)) {
          message.destroy();
          message.error('当前音乐不可播放,2s后切换至下一首');
          audio.src = '';
          setTimeout(() => {
            this.handelNext();
          }, 2000);
          return;
        }
        audio.src = url;
        audio.play();
      })
      .catch((err) => {
        console.log(err);
        this.props.setIsPlay(false);
      });
  };
  getMusicDetail = (id) => {
    RAGet(getMusicDetail.api_url, {
      params: {
        ids: id,
      },
    })
      .then((res) => {
        const { index, playList } = this.props;
        playList[index].picUrl = res.songs[0].al.picUrl;
        this.props.gainPlayList(playList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  gotoPlayer = () => {
    const path = this.props.history.location.pathname;
    if (path === '/player') {
      this.props.history.goBack();
    } else {
      this.props.history.push({ pathname: '/player' });
    }
  };
  onPlay = () => {
    const { musicId } = this.props;
    this.props.setIsPlay(true);
    this.getMusicUrl(musicId);
  };
  onPause = () => {
    const audio = this.audio;
    this.props.setIsPlay(false);
    audio.pause();
  };
  handelPrev = () => {
    const { playList, index, isPlay } = this.props;
    const maxLength = playList.length - 1;
    let num = 0;
    if (index === 0) {
      num = maxLength;
    } else {
      let i = index;
      num = --i;
      if (playList[num].st === -200) {
        num = --num;
      }
    }
    if (isEmpty(!isPlay)) {
      this.getMusicUrl(playList[num].id);
    }
    this.props.setIndex(num);
    this.props.gainMusicId(playList[num].id);
  };
  handelNext = () => {
    const { playModel } = this.state;
    const { playList, index, isPlay } = this.props;
    const maxLength = playList.length - 1;
    let num = 0;
    if (playModel === '3') {
      num = Math.floor(Math.random() * maxLength);
    } else {
      if (index === maxLength) {
        num = 0;
      } else {
        let i = index;
        num = ++i;
      }
      if (playList[num].st === -200) {
        num = ++num;
      }
    }
    if (isEmpty(!isPlay)) {
      this.getMusicUrl(playList[num].id);
    }
    this.props.setIndex(num);
    this.props.gainMusicId(playList[num].id);
  };
  changeInput = () => {
    const { audio, range } = this;
    const { playList, index } = this.props;
    if (!playList) return;
    const duration = this.state.duration || playList[index].dt / 1000;

    const max = range.max;
    const val = range.value;
    const currentTime = (val / max) * duration;
    audio.currentTime = currentTime;
    this.setState({ currentTime, progress: val });
    const time = currentTime / duration;
    range.style.backgroundSize = time * 100 + `% 100%`;
  };
  changeVolume = () => {
    const audio = this.audio;
    const volume = this.volume;
    const volumeNum = volume.value;
    this.setState({ volumeNum });
    setLocal('volumeNum', volumeNum);
    audio.volume = volumeNum / 100;
  };
  playModel = () => {
    const { playModel } = this.state;
    switch (playModel) {
      case '1':
        setLocal('playModel', '2');
        this.setState({ playModel: '2' });
        break;
      case '2':
        setLocal('playModel', '3');
        this.setState({ playModel: '3' });
        break;
      default:
        setLocal('playModel', '1');
        this.setState({ playModel: '1' });
        break;
    }
  };
  showPlop = () => {
    const { showPlop } = this.props;
    showPlop === 'play_list'
      ? this.props.setShowPopStatus('')
      : this.props.setShowPopStatus('play_list');
  };
  render() {
    const {
      playModel,
      currentTime,
      duration,
      progress,
      // url,
      volumeNum,
    } = this.state;
    const { playList, index, isPlay } = this.props; //musicId
    return (
      <div className="footer">
        <div className="control">
          {playList.length > 0 && !isEmpty(playList[index].picUrl) ? (
            <img
              onClick={this.gotoPlayer}
              src={imgParam(playList[index].picUrl, 100, 100)}
              alt=""
            />
          ) : (
            <img
              onClick={this.gotoPlayer}
              src={require('../../common/images/logo.png')}
              alt=""
            />
          )}

          <i onClick={this.handelPrev} className="icon_prev"></i>
          {isPlay ? (
            <i onClick={this.onPause} className="icon_pause"></i>
          ) : (
            <i onClick={this.onPlay} className="icon_play"></i>
          )}
          <i onClick={this.handelNext.bind(this)} className="icon_next"></i>
        </div>
        <div className="progress">
          <div className="progress_time">
            <p>{formatPlayTime(currentTime)}</p>
            {playList.length > 0 ? (
              <p>{formatPlayTime(duration || playList[index].dt / 1000)}</p>
            ) : (
              <p>{`00:00`}</p>
            )}
          </div>
          <input
            onChange={this.changeInput}
            ref={(range) => (this.range = range)}
            type="range"
            min="0"
            max="1000"
            value={progress}
          />
          <div
            className="buffer-progress"
            ref={(buffer) => (this.buffer = buffer)}
          ></div>
        </div>
        <div className="tool">
          <i className="icon_volume"></i>
          <div className="volume_progress">
            <input
              onChange={this.changeVolume}
              ref={(volume) => (this.volume = volume)}
              type="range"
              min="0"
              max="100"
              value={volumeNum}
              style={{ backgroundSize: `${volumeNum}% 100%` }}
            />
          </div>
          <i className="icon_unlike icon_like"></i>
          {playModel === '1' ? (
            <i onClick={this.playModel} className="icon_order"></i>
          ) : playModel === '2' ? (
            <i onClick={this.playModel} className="icon_cycle"></i>
          ) : (
            <i onClick={this.playModel} className="icon_random"></i>
          )}
          <i onClick={this.showPlop} className="icon_list"></i>
        </div>
        {playList.length !== 0 ? (
          <audio
            preload={`auto`}
            loop={playModel === '2' ? true : false}
            ref={(ref) => (this.audio = ref)}
            // src={url}
          ></audio>
        ) : (
          <audio ref={(ref) => (this.audio = ref)}></audio>
        )}
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    musicId: state.musicId,
    playList: state.playList,
    index: state.index,
    isPlay: state.isPlay,
    showPlop: state.showPlop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    gainPlayList: bindActionCreators(gainPlayList, dispatch),
    setShowPopStatus: bindActionCreators(setShowPopStatus, dispatch),
    setCurrentTime: bindActionCreators(setCurrentTime, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
