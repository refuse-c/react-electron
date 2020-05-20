/*
 * @Author: RA
 * @Date: 2020-04-02 11:14:28
 * @LastEditTime: 2020-05-20 22:05:14
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { getMusicDetail, getMusicUrl } from '../../api/api';
import { formatPlayTime, isEmpty, imgParam } from '../../common/utils/format';
// store 
import { connect } from
  'react-redux';
import { bindActionCreators } from 'redux';
import { setPlayModel, setIsPlay, setIndex, gainMusicId, gainPlayLIst, setPlayListStatus, setCurrentTime } from '../../store/actions';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      musicId: '',
      duration: 0,
      progress: 0,
      isPlay: false,
      bufferTime: 0,
      url: ''
    }
  }
  componentDidMount() {
    const audio = this.audio;
    const range = this.range;
    const buffer = this.buffer;
    const { playList, index } = this.props;
    playList.length > 0 ? this.props.gainMusicId(playList[index].id) : this.props.gainMusicId(null);
    audio.volume = 0.1;
    // canplay事件监听
    audio.addEventListener("canplay", () => {
      //获取总时间
      const duration = parseInt(audio.duration);
      this.setState({ duration });
    });
    //播放中监听时间变化
    audio.addEventListener("timeupdate", () => {
      const { duration } = this.state;
      const currentTime = (audio.currentTime).toFixed(3);
      this.setState({ currentTime });
      this.props.setCurrentTime(currentTime);
      // 缓存时间
      if (isEmpty(duration)) return;
      const buffered = audio.buffered;
      let bufferTime = 0;
      if (buffered.length !== 0) {
        bufferTime = buffered.end(buffered.length - 1);
        const bw = (bufferTime / duration) * this.range.clientWidth;
        buffer.style.width = bw + 'px';
      }
      //进度条
      const time = currentTime / duration;
      let progress = time * range.max;
      if (isNaN(progress)) return;
      range.style.backgroundSize = time * 100 + `% 100%`;
      this.setState({ progress });
    }, 1);

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
      this.getMusicUrl(musicId);
      this.getMusicDetail(musicId);
      this.props.gainMusicId(musicId);
    }
    if (prevState.isPlay !== this.state.isPlay) {
      const { isPlay } = this.state;
      const { musicId } = this.props;
      if (isPlay) {
        this.getMusicUrl(musicId);
        this.getMusicDetail(musicId);
        this.props.gainMusicId(musicId);
      };
    }
  }
  //获取音乐url
  getMusicUrl = (id) => {
    RAGet(getMusicUrl.api_url, {
      params: {
        id: id,
      }
    }).then(res => {
      const audio = this.audio;
      // console.log('音乐地址是' + res.data[0].url)
      const url = res.data[0].url;
      this.setState({ url });
      if (isEmpty(url)) {
        console.log('当前音乐不可播放,3s后切换至下一首,id是' + id);
        // audio.pause();
        audio.src = '';
        setTimeout(() => {
          this.handelNext();
        }, 2000);
        return;
      }
      audio.play();
    }).catch(err => {
      console.log(err);
      this.props.setIsPlay(false);
    })
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
    const { musicId } = this.props;
    this.props.setIsPlay(true);
    this.getMusicUrl(musicId)
  };

  // 暂停
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
        num = --num
      }
    }
    if (isEmpty(!isPlay)) {
      this.getMusicUrl(playList[num].id);
    }
    this.props.setIndex(num);
    this.props.gainMusicId(playList[num].id);
  }

  handelNext = () => {
    const { playModel, playList, index, isPlay } = this.props;
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
    const { currentTime, duration, progress, url } = this.state;
    const { playModel, playList, index, isPlay } = this.props; //musicId
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
            {
              playList.length > 0 ?
                <p>{formatPlayTime(duration || playList[index].dt / 1000)}</p>
                :
                <p>{`00:00`}</p>
            }

          </div>
          <input
            onChange={this.changeInput}
            ref={range => this.range = range}
            type="range"
            min="0"
            max="1000"
            value={progress}
          />
          <div
            className="buffer-progress"
            ref={buffer => this.buffer = buffer}
          >
          </div>
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
          <i className="icon_volume"></i>
          <i onClick={this.showPlayList} className="icon_list"></i>
        </div>
        {
          playList.length !== 0 ?
            <audio
              preload={`auto`}
              loop={playModel === '2' ? true : false}
              ref={ref => (this.audio = ref)}
              // src={`https://music.163.com/song/media/outer/url?id=${musicId}`}
              src={url}
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
    setCurrentTime: bindActionCreators(setCurrentTime, dispatch),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);