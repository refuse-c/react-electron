/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-05-29 15:26:57
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';

import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
//store
import { connect } from 'react-redux';
import { RAGet } from '../../api/netWork';
import { videoDetail, videoUrl, relatedAllvideo, mvUrl, simiMv, mvDetail } from '../../api/api';
import {
  formatDate,
  formatPlaycount,
  formatPlayTime,
  imgParam,
  isEmpty,
  IsNum,
} from '../../common/utils/format';
import { bindActionCreators } from 'redux';
import { setIsPlay } from '../../store/actions';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: '',
      videoDetail: {},
      videoGroup: {},
    };
  }

  componentDidMount = () => {
    this.props.setIsPlay(false);
    const id = window.location.href.split('videoDetail')[1];

    if (IsNum(id)) {
      this.getMvUrl(id);
      this.getSimiMv(id);
      this.getMvDetail(id);
    } else {
      this.getVideoDetail(id);
      this.getVideoUrl(id);
      this.getRelatedAllvideo(id);
    }


    const video = this.video;
    // 当前音乐播放完毕监听
    video.addEventListener('ended', () => {
      const id = this.state.videoGroup[0].vid;
      if (isEmpty(id)) return;
      this.getVideoDetail(id);
      this.getVideoUrl(id);
      this.getRelatedAllvideo(id);
    });
  };
  nextViode = (id) => {
    if (IsNum(id)) {
      this.getMvUrl(id);
      this.getSimiMv(id);
      this.getMvDetail(id);
    } else {
      this.getVideoDetail(id);
      this.getVideoUrl(id);
      this.getRelatedAllvideo(id);
    }
  };


  //mv
  getMvUrl = (id) => {
    RAGet(mvUrl.api_url, {
      params: {
        id: id
      }
    }).then(res => {
      const videoUrl = res.data.url;
      this.setState({ videoUrl });
    }).catch(err => {
      console.log(err)
    })
  }
  //相似mv
  getSimiMv = (id) => {
    RAGet(simiMv.api_url, {
      params: {
        mvid: id
      }
    }).then(res => {
      console.log(res)
      const videoGroup = res.mvs;
      this.setState({ videoGroup });
    }).catch(err => {
      console.log(err)
    })
  }
  //mv详情
  getMvDetail = (id) => {
    RAGet(mvDetail.api_url, {
      params: {
        mvid: id
      }
    }).then(res => {
      const videoDetail = res.data;
      this.setState({ videoDetail });
    }).catch(err => {
      console.log(err)
    })
  }

  //video
  //视频详情
  getVideoDetail = (id) => {
    RAGet(videoDetail.api_url, {
      params: {
        id: id,
      },
    })
      .then((res) => {
        const videoDetail = res.data;
        this.setState({ videoDetail });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //视频url
  getVideoUrl = (id) => {
    RAGet(videoUrl.api_url, {
      params: {
        id: id,
      },
    })
      .then((res) => {
        const videoUrl = res.urls[0].url;
        this.setState({ videoUrl });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //相似视频
  getRelatedAllvideo = (id) => {
    RAGet(relatedAllvideo.api_url, {
      params: {
        id: id,
      },
    })
      .then((res) => {
        const videoGroup = res.data;
        this.setState({ videoGroup });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { videoUrl, videoDetail, videoGroup } = this.state;
    return (
      <div className="video-info">
        <ScrollArea
          speed={1}
          className="area"
          ref={(ref) => (this.content = ref)}
        >
          <div className="video-content">
            <div className="video-left">
              <div
                className="name"
                onClick={(e) => this.props.history.goBack()}
              >
                {videoDetail.title ? videoDetail.title : videoDetail.name}
              </div>
              <video
                src={videoUrl}
                autoPlay
                controls
                poster={videoDetail.coverUrl ? imgParam(videoDetail.coverUrl, 700, 400) : imgParam(videoDetail.cover, 700, 400)}
                ref={(video) => (this.video = video)}
              ></video>
            </div>
            <div className="video-right">
              <h3>视频介绍</h3>
              <div className="video-time">
                <p>发布时间：{formatDate(videoDetail.publishTime)}</p>
                <p>播放次数：{videoDetail.playTime ? formatPlaycount(videoDetail.playTime) : formatPlaycount(videoDetail.playCount)}</p>
              </div>
              <div>
                {
                  videoDetail.description
                    ? <p className="description">简介：{videoDetail.description}</p>
                    : null
                }

                {
                  videoDetail.videoGroup > 0
                    ? <div className="videoGroup">
                      标签：
                      {videoDetail.videoGroup &&
                        videoDetail.videoGroup.map((item, index) => {
                          return <span key={index}>{item.name}</span>;
                        })
                      }
                    </div>
                    : null
                }

              </div>
              <div className="video-detail"></div>
              <h3>相关推荐</h3>
              <div className="video-group">
                <ul>
                  {videoGroup.length > 0 &&
                    videoGroup.map((item, index) => {
                      return (
                        <li
                          key={index}
                          onClick={this.nextViode.bind(this, item.vid ? item.vid : item.id)}
                        >
                          <img src={item.coverUrl ? imgParam(item.coverUrl, 120, 70) : imgParam(item.cover, 120, 70)} alt="" />
                          <div>
                            <p className="overflow">{item.title ? item.title : item.name}</p>
                            <p>{formatPlayTime(item.durationms ? item.durationms / 1000 : item.duration / 1000)}</p >
                            <p>by {item.creator ? item.creator[0].userName : item.artists[0].name}</p>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    searchInfo: state.searchInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Video);
