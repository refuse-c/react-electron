/*
 * @Author: RA
 * @Date: 2020-04-02 11:14:28
 * @LastEditTime: 2020-05-07 20:52:11
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { formatPlayTime, isEmpty } from '../../common/utils/format';
// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPlayModel, setIsPlay } from '../../store/actions';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      musicId: props.musicId,
      duration: 0,
      progress: 0,
      isPause: false,
      bufferTime: 0
    }
  }
  componentDidMount() {
    const audio = this.audio;
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
      let progress = (currentTime / duration) * range.max;
      if (isNaN(progress)) return;
      this.setState({ progress });
      // 当前缓存缓存宽度计算 500是进度条宽度
      // const bufferWidth = 500 * (bufferTime / audio.duration);
      // 当前播放宽度计算 500是进度条宽度
      // const playWidth = 500 * (audio.currentTime / audio.duration);
      // 如果正在拖动进度条的时候，不监听播放进度
      // if (!processItemMove) {
      // this.processPlayed.style.width = `${playWidth}px`;
      // this.processItem.style.left = `${playWidth - 4}px`;
      // 未拖动时根据时间变化设置当前时间
      // this.setState({
      //   currentTime: this.getTime(currentTime)
      // });
      // }
      // this.processBuffered.style.width = `${bufferWidth}px`;
    });

    // 当前音乐播放完毕监听
    audio.addEventListener("ended", () => {
      // this.endedPlayMusic();
    });
    // 初始化音量
    // this.initVolumeProcess();
  }
  gotoPlayer = () => {
    this.props.history.push({ pathname: '/player' })
  }
  // 暂停
  onPlay = () => {
    const audio = this.audio;
    if (isEmpty(audio.src.split('?id=')[1])) return;
    // this.setState({ isPause: true });
    this.props.setIsPlay(true);
    audio.play();
  };

  // 暂停
  onPause = () => {
    const audio = this.audio;
    if (isEmpty(audio.src.split('?id=')[1])) return;
    // this.setState({ isPause: false });
    this.props.setIsPlay(false);
    audio.pause();
  };
  changeInput = () => {
    const { duration } = this.state;
    const range = this.range;
    const max = range.max;
    const val = range.value;
    const currentTime = val / max * duration;
    // console.log(currentTime)
    // this.setState({ currentTime: })
  }
  playModel = () => {
    const { playModel } = this.props;
    switch (playModel) {
      case '1': this.props.setPlayModel('2'); break;
      case '2': this.props.setPlayModel('3'); break;
      default: this.props.setPlayModel('1'); break;
    }
  }
  render() {
    const { currentTime, duration, progress, isPause } = this.state;
    const { playModel, playList, index, isPlay } = this.props;
    return (
      <div className="footer">
        <div className="control">
          <img
            onClick={this.gotoPlayer}
            src="https://p1.music.126.net/cm7rMj_I2qHwKyB2gRsauA==/109951163667867598.jpg?param=300y300"
            alt=""
          />
          <i className="icon_prev"></i>
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
          <i className="icon_next"></i>
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
          <i className="icon_list"></i>
        </div>
        {
          playList.length !== 0 ?
            <audio
              autoPlay
              ref={ref => (this.audio = ref)}
              src={`https://music.163.com/song/media/outer/url?id=${playList[index].id}`}
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
    isPlay: state.index


  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayModel: bindActionCreators(setPlayModel, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);