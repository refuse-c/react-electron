/*
 * @Author: REFUSE_C
 * @Date: 2020-07-10 17:54:31
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-13 17:46:12
 * @Description: 动态组件
 */
import React, { Component } from "react";
import "./index.scss";
import {
  imgParam,
  formatDynamicType,
  formatDate,
  isEmpty,
  IsNum,
  formatPlayTime,
  formatPlaycount,
} from "../../common/utils/format";

// store
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMarkdown from "react-markdown";
import {
  gainMusicList,
  setIndex,
  gainPlayList,
  setIsPlay,
  gainMusicId,
  setToolsStatus,
} from "../../store/actions";
import { RAGet } from "../../api/netWork";
import { videoUrl, mvUrl } from "../../api/api";
class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: "",
      videoId: "",
    };
  }
  componentDidMount = () => {};
  // 获取视频url
  getMediaUrl = (id) => {
    console.log(id);
    if (IsNum(id)) {
      this.getMvUrl(id);
    } else {
      this.getVideoUrl(id);
    }
  };
  //视频url
  getVideoUrl = (id) => {
    this.setState({ videoId: "" });
    RAGet(videoUrl.api_url, {
      params: {
        id: id,
      },
    }).then((res) => {
      const videoUrl = res.urls[0].url;
      this.setState({ videoId: id, videoUrl });
    });
  };
  //mv
  getMvUrl = (id) => {
    this.setState({ videoId: "" });
    RAGet(mvUrl.api_url, {
      params: {
        id: id,
      },
    }).then((res) => {
      const videoUrl = res.data.url;
      this.setState({ videoId: id, videoUrl });
    });
  };
  //播放
  handlePlay = (item, e) => {
    console.log(e, item);
    const { playList } = this.props;
    const array = JSON.parse(JSON.stringify(playList));
    let flag = null;
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
      this.props.gainPlayList(array);
    }
    this.props.setIsPlay(true);
    this.props.gainMusicId(item.id);
    this.props.setToolsStatus(false);
    e.stopPropagation();
  };
  gotouserDetail = (item) => {
    console.log(item);
    this.props.history.push({ pathname: `/home/userdetail${item.userId}` });
  };
  render() {
    const { data } = this.props;
    const { videoUrl, videoId } = this.state;
    return (
      <div className="event">
        <ul className="dynamic-list">
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
              const jsonData = JSON.parse(item.json);
              console.log(item);
              console.log(jsonData);
              return (
                <li key={index} className="dynamic-item">
                  <div className="dynamic-top">
                    <img
                      src={imgParam(item.user && item.user.avatarUrl, 40, 40)}
                      alt=""
                    />
                    <div>
                      <p>
                        <span
                          className="commenter-name"
                          onClick={this.gotouserDetail.bind(this, item.user)}
                        >
                          {item.user && item.user.nickname}
                        </span>
                        {formatDynamicType(item.type)}{" "}
                      </p>
                      <p>{formatDate(item.eventTime)}</p>
                    </div>
                  </div>
                  {jsonData && jsonData.msg ? (
                    <ReactMarkdown
                      className="dynamic-msg"
                      source={jsonData.msg}
                      escapeHtml={false} //不进行HTML标签的转化
                    />
                  ) : (
                    ""
                  )}
                  {
                    //歌单
                    jsonData && jsonData.playlist ? (
                      <div
                        className="media"
                        onClick={(e) =>
                          this.props.history.push({
                            pathname: `/home/single${jsonData.playlist.id}`,
                          })
                        }
                      >
                        <img
                          src={imgParam(jsonData.playlist.coverImgUrl, 40, 40)}
                          alt=""
                        />
                        <div>
                          <p>{jsonData.playlist.name}</p>
                          <p>by {jsonData.playlist.creator.nickname}</p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  }
                  {
                    //电台
                    jsonData && jsonData.program ? (
                      <div className="media">
                        <img
                          src={imgParam(jsonData.program.radio.picUrl, 40, 40)}
                          alt=""
                        />
                        <div>
                          <p>{jsonData.program.name}</p>
                          <p>
                            <span>{jsonData.program.radio.category}</span>{" "}
                            <span>{jsonData.program.radio.name}</span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  }
                  {
                    //视频
                    jsonData && jsonData.video ? (
                      <div className="media-video">
                        {videoId === jsonData.video.videoId &&
                        !isEmpty(videoUrl) ? (
                          <div className="media-info">
                            <p>
                              <span
                                onClick={(e) => this.setState({ videoId: "" })}
                              >
                                收起
                              </span>
                              <span
                                onClick={(e) =>
                                  this.props.history.push({
                                    pathname: `/videoDetail${jsonData.video.videoId}`,
                                  })
                                }
                              >
                                {jsonData.video.title}
                              </span>
                            </p>
                            <video
                              src={videoUrl}
                              controls
                              autoPlay
                              poster={imgParam(
                                jsonData.video.coverUrl,
                                340,
                                190
                              )}
                            ></video>
                          </div>
                        ) : (
                          <div
                            className="media-box"
                            onClick={this.getMediaUrl.bind(
                              this,
                              jsonData.video.videoId
                            )}
                          >
                            <img
                              src={imgParam(jsonData.video.coverUrl, 340, 190)}
                              alt=""
                            />
                            <div className="media-player"></div>
                            <p>
                              <span>
                                {formatPlaycount(jsonData.video.playTime)}
                              </span>
                              <span>
                                {formatPlayTime(
                                  jsonData.video.durationms / 1000
                                )}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )
                  }
                  {
                    //mv
                    jsonData && jsonData.mv ? (
                      <div className="media-video">
                        {videoId === jsonData.mv.id && !isEmpty(videoUrl) ? (
                          <div className="media-info">
                            <p>
                              <span
                                onClick={(e) => this.setState({ videoId: "" })}
                              >
                                收起
                              </span>
                              <span
                                onClick={(e) =>
                                  this.props.history.push({
                                    pathname: `/videoDetail${jsonData.video.id}`,
                                  })
                                }
                              >
                                {jsonData.video.title}
                              </span>
                            </p>
                            <video
                              src={videoUrl}
                              controls
                              autoPlay
                              poster={imgParam(jsonData.mv.imgurl, 340, 190)}
                            ></video>
                          </div>
                        ) : (
                          <div
                            className="media-box"
                            onClick={this.getMediaUrl.bind(
                              this,
                              jsonData.mv.id
                            )}
                          >
                            <img
                              src={imgParam(jsonData.mv.imgurl, 340, 190)}
                              alt=""
                            />
                            <div className="media-player"></div>
                            <p>
                              <span>
                                {formatPlaycount(jsonData.mv.playCount)}
                              </span>
                              <span>
                                {formatPlayTime(jsonData.mv.duration / 1000)}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )
                  }

                  {
                    //单曲
                    jsonData && jsonData.song ? (
                      <div
                        onClick={this.handlePlay.bind(this, jsonData.song)}
                        className="media"
                      >
                        <img
                          src={imgParam(jsonData.song.album.blurPicUrl, 40, 40)}
                          alt=""
                        />
                        <div>
                          <p>{jsonData.song.name}</p>
                          <p>
                            {jsonData.song.artists.map((item) => item.name)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  }
                  {
                    //图片
                    item.pics && item.pics.length > 0 ? (
                      <div
                        style={{
                          width:
                            item.pics.length === 3
                              ? "400px"
                              : item.pics.length < 5
                              ? "270px"
                              : "400px",
                        }}
                        className="pics"
                      >
                        {item.pics.map((item, index) => (
                          <img
                            key={index}
                            src={imgParam(item.originUrl, 200, 200)}
                            alt=""
                          />
                        ))}
                      </div>
                    ) : (
                      ""
                    )
                  }
                  {
                    //转发 / 图片
                    jsonData && jsonData.event ? (
                      <div className="dsadas">
                        <div>
                          <span
                            className="commenter-name"
                            onClick={this.gotouserDetail.bind(
                              this,
                              jsonData.event.user
                            )}
                          >
                            @{jsonData.event.user.nickname}：
                          </span>
                          <span>{formatDynamicType(jsonData.event.type)}</span>
                          <span style={{ whiteSpace: "preWrap" }}>
                            {JSON.parse(jsonData.event.json).msg}
                          </span>
                        </div>
                        <div
                          style={{
                            width:
                              jsonData.event.pics.length === 3
                                ? "400px"
                                : jsonData.event.pics.length < 5
                                ? "270px"
                                : "400px",
                          }}
                          className="pics"
                        >
                          {jsonData.event.pics.map((item, index) => (
                            <img
                              key={index}
                              src={imgParam(item.originUrl, 200, 200)}
                              alt=""
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  }
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  return {
    musicList: state.musicList,
    playList: state.playList,
    musicId: state.musicId,
    index: state.index,
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
export default connect(mapStateToProps, mapDispatchToProps)(Event);
