/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-05-22 17:57:03
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';

import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
//store
import { connect } from 'react-redux';
import { RAGet } from '../../api/netWork';
import { videoDetail, videoUrl } from '../../api/api';
// import { bindActionCreators } from 'redux';
// import { setPageNum, gainSearchInfo, setMenuIndex } from '../../store/actions';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: '',
    }
  }

  componentDidMount = () => {
    const id = window.location.href.split('videoDetail')[1];
    console.log(id);
    this.getVideoDetail(id);
    this.getVideoUrl(id);
  }
  getVideoDetail = (id) => {
    RAGet(videoDetail.api_url, {
      params: {
        id: id
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  getVideoUrl = (id) => {
    RAGet(videoUrl.api_url, {
      params: {
        id: id
      }
    }).then(res => {
      console.log(res)
      const videoUrl = res.urls[0].url;
      this.setState({ videoUrl });
      console.log(videoUrl)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const { videoUrl } = this.state;
    return (
      <div className="video-detail">
        <ScrollArea
          speed={1}
          className="area"
          ref={ref => (this.content = ref)}
        >
          <div className="video-content">
            <div className="video-left">
              <div className="name">32132131</div>
              <video
                src={videoUrl}
                autoPlay={`true`}
              >
              </video>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // gainSearchInfo: bindActionCreators(gainSearchInfo, dispatch),
    // setPageNum: bindActionCreators(setPageNum, dispatch),
    // setMenuIndex: bindActionCreators(setMenuIndex, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Video);