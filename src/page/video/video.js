/*
 * @Author: REFUSE_C
 * @Date: 2020-05-29 16:21:35
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-05-29 18:01:43
 * @Description:
 */
import React, { Component } from 'react';
import { RAGet } from '../../api/netWork';
import { videoGroupList, videoGroup } from '../../api/api';
class ComponentVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoText: '全部视频',
      videoGroupList: {},
    }
  }
  componentDidMount = () => {
    this.getVideoGroupList();
    this.getVideoGroup(12144);
    this.getVideoGroup(12144);
  }
  getVideoGroupList = () => {
    RAGet(videoGroupList.api_url)
      .then(res => {
        console.log(res)
        const videoGroupList = res.data
        this.setState({ videoGroupList })
        console.log(videoGroupList)
      }).catch(err => {
        console.log(err)
      })
  }
  getVideoGroup = (id) => {
    RAGet(videoGroup.api_url, {
      params: {
        id: id
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const { videoText } = this.state;
    return (
      <div className="components_video" onClick={e => this.getVideoGroup(12144)}>
        <h3 className="song_list_text" onClick={this.showPlop}>
          {videoText}
        </h3>
      </div >
    );
  }
}

export default ComponentVideo;