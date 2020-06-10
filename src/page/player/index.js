/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 16:31:03
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-10 17:30:21
 * @Description:播放页
 */
import React, { Component } from 'react';
import './index.scss';
// import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
// store
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { gainMusicId } from '../../store/actions';
import { RAGet } from '../../api/netWork';
import { getMusicDetail, getLyric } from '../../api/api';
import {
  isEmpty,
  imgParam,
  foramtLrc,
  getTimeIndex,
} from '../../common/utils/format';
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicId: '',
      songsAlbum: '',
      lyric: {},
      wheelStatus: true,
    };
  }
  componentDidMount = () => {
    const { index, playList } = this.props;
    const id = playList.length > 0 ? playList[index].id : '';
    this.getLyric(id);
    this.getMusicDetail(id);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { musicId } = nextProps;
    if (musicId !== prevState.musicId) {
      return {
        musicId,
        props: {
          musicId: musicId,
        },
      };
    }
    return null;
  }
  componentDidUpdate(prevState) {
    // 当前音乐更新了
    if (prevState.musicId !== this.state.musicId) {
      console.log(11111111)
      const { musicId } = this.state;
      this.getLyric(musicId);
      this.getMusicDetail(musicId);
    }
  }

  // back = () => {
  //   this.props.history.goBack();
  // }
  //获取音乐图片
  getMusicDetail = (id) => {
    this.setState({ songsAlbum: '' });
    RAGet(getMusicDetail.api_url, {
      params: {
        ids: id,
      },
    })
      .then((res) => {
        const songsAlbum = res.songs[0];
        this.setState({ songsAlbum });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //获取歌词
  getLyric = (id) => {
    RAGet(getLyric.api_url, {
      params: {
        id: id,
      },
    }).then((res) => {
      let lyric = res.lrc.lyric ? res.lrc.lyric : res.tlyric.lyric ? res.tlyric.lyric : null
      lyric = foramtLrc(lyric)
      this.setState({ lyric });
    }).catch((err) => {
      console.log(err);
    });
  };

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };

  render() {
    const { lyric, songsAlbum } = this.state;
    const { currentTime, isPlay } = this.props;
    return (
      <div className="player">
        <div className="content">
          <div className="player-top">
            <div className="album-img">
              <div className={isPlay ? 'turn' : ''}>
                {!isEmpty(songsAlbum.al) ? (
                  <img src={imgParam(songsAlbum.al.picUrl, 200, 200)} alt="" />
                ) : (
                    <img src={require('../../common/images/apg.png')} alt="" />
                  )}
              </div>
            </div>
            <div className="player-info">
              <div className="name">{songsAlbum.name || ''}</div>
              <div className="singer">
                <p>
                  歌手：
                  {songsAlbum.ar &&
                    songsAlbum.ar.map((item, index) => {
                      return <span key={index}>{item.name}</span>;
                    })}
                </p>
                <p>
                  专辑：<span>{songsAlbum.al && songsAlbum.al.name}</span>
                </p>
              </div>
              <div
                className="song-lrc"
                ref={(ul) => (this.ul = ul)}
                onWheel={this.handleScroll}
              >
                <ScrollArea
                  speed={1}
                  className="area"
                  ref={(content) => (this.content = content)}
                >
                  <ul>
                    {!isEmpty(lyric) && lyric.length > 0 ? (
                      lyric.map((item, index, lyric) => {
                        const num = getTimeIndex(lyric, currentTime);
                        if (num > 4) {
                          this.content.scrollArea.scrollYTo((num - 4) * 30);
                        } else {
                          this.content.scrollArea.scrollYTo(0);
                        }
                        return (
                          <li
                            key={index}
                            className={index === num ? 'aa' : 'bb'}
                            ref={(item) => (this.item = item)}
                          >
                            {item.c}
                          </li>
                        );
                      })
                    ) : (
                        <li>歌词加载中···</li>
                      )}
                  </ul>
                </ScrollArea>
              </div>
            </div>
          </div>
          <div className="player-bottom"></div>
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
    currentTime: state.currentTime,
    index: state.index,
    isPlay: state.isPlay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // gainMusicId: bindActionCreators(gainMusicId, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Player);
