/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 16:31:03
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-10 11:33:49
 * @Description:播放页
 */
import React, { Component } from 'react';
import './index.scss';
import Comment from '../../components/comment';
import ScrollArea from 'react-scrollbar';
import ScrollView from 'react-custom-scrollbars';
// store
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { gainMusicId } from '../../store/actions';
import { RAGet } from '../../api/netWork';
import { getMusicDetail, getLyric, musicComment, simiSong, simiPlaylist, simiUser } from '../../api/api';
import {
  isEmpty,
  imgParam,
  foramtLrc,
  getTimeIndex,
  dataScreening,
} from '../../common/utils/format';
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicId: '',
      songsAlbum: '',
      lyric: [],
      wheelStatus: true,
      commentList: [],
      simiSong: [],
      simiUser: [],
      simiPlaylist: []
    };
  }
  componentDidMount = () => {
    const { index, playList } = this.props;
    const id = playList.length > 0 ? playList[index].id : '';
    this.getLyric(id);
    this.getMusicDetail(id);
    this.getMusicComment(id)
    // this.getSimiSong(id);
    // this.getSimiPlaylist(id);
    // this.getSimiUser(id);
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
      const { musicId } = this.state;
      this.getLyric(musicId);
      this.getMusicDetail(musicId);
      this.getMusicComment(musicId)
      // this.getSimiSong(musicId);
      // this.getSimiPlaylist(musicId);
      // this.getSimiUser(musicId);
    }
  }
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
        // console.log(err);
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
      // console.log(err);
    });
  };
  //获取评论
  getMusicComment = id => {
    RAGet(musicComment.api_url, {
      params: { id: id }
    }).then(res => {
      const commentList = res;
      this.setState({ commentList })
      // console.log(res)
    })
  }
  //相似音乐
  getSimiSong = id => {
    RAGet(simiSong.api_url, {
      params: { id: id }
    }).then(res => {
      const simiSong = res.songs;
      console.log(dataScreening(simiSong))
      this.setState({ simiSong })
      // console.log(res)
    })
  }
  //包含歌曲的歌单
  getSimiPlaylist = id => {
    RAGet(simiPlaylist.api_url, {
      params: { id: id }
    }).then(res => {
      const simiPlaylist = res.simiPlaylist;
      this.setState({ simiPlaylist })
    })
  }
  //获取最近 5 个听了这首歌的用户
  getSimiUser = id => {
    RAGet(simiUser.api_url, {
      params: { id: id }
    }).then(res => {
      const simiUser = res.userprofiles;
      this.setState({ simiUser })
      // console.log(res)
    })
  }
  componentWillUnmount() {
    // 卸载异步操作设置状态
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { lyric, songsAlbum, commentList } = this.state;
    // console.log(simiSong)
    const { currentTime, isPlay } = this.props;
    return (
      <div className="player">
        <ScrollView onScroll={this.onScroll}>
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
                      {
                        lyric && lyric.map((item, index, lyric) => {
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
                      }
                    </ul>
                  </ScrollArea>
                </div>
              </div>
            </div>
            <div className="player-bottom">
              {
                <Comment data={commentList} history={this.props.history} />
              }
              <div className="similarity">
                <div className="headline">
                  <p className="headline_title">相似歌曲</p>
                </div>
                <div className="headline">
                  <p className="headline_title">包含这首歌的歌单</p>
                </div>
                <div className="headline">
                  <p className="headline_title">最近听了这首歌的用户</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollView>
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Player);
