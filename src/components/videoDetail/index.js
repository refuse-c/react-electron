/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-05-24 14:32:56
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';

import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
//store
import { connect } from 'react-redux';
import { RAGet } from '../../api/netWork';
import { videoDetail, videoUrl, relatedAllvideo } from '../../api/api';
import {
  formatDate,
  formatPlaycount,
  formatPlayTime,
  imgParam,
  isEmpty,
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
    this.getVideoDetail(id);
    this.getVideoUrl(id);
    this.getRelatedAllvideo(id);

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
    this.getVideoDetail(id);
    this.getVideoUrl(id);
    this.getRelatedAllvideo(id);
  };
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
                {videoDetail.title}
              </div>
              <video
                src={videoUrl}
                autoPlay
                controls
                poster={imgParam(videoDetail && videoDetail.coverUrl, 700, 400)}
                ref={(video) => (this.video = video)}
              ></video>
            </div>
            <div className="video-right">
              <h3>视频介绍</h3>
              <div className="video-time">
                <p>发布时间：{formatDate(videoDetail.publishTime)}</p>
                <p>播放次数：{formatPlaycount(videoDetail.playTime)}</p>
              </div>
              <div>
                <p className="description">简介：{videoDetail.description}</p>
                <div className="videoGroup">
                  标签：
                  {videoDetail.videoGroup &&
                    videoDetail.videoGroup.map((item, index) => {
                      return <span key={index}>{item.name}</span>;
                    })}
                </div>
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
                          onClick={this.nextViode.bind(this, item.vid)}
                        >
                          <img src={imgParam(item.coverUrl, 120, 70)} alt="" />
                          <div>
                            <p className="overflow">{item.title}</p>
                            <p>{formatPlayTime(item.durationms / 1000)}</p>
                            <p>by {item.creator[0].userName}</p>
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
