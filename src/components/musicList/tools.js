/*
 * @Author: REFUSE_C
 * @Date: 2020-06-01 11:13:01
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-02 16:10:54
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import copy from 'copy-to-clipboard';
import { message } from 'antd';
// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  gainMusicList,
  setIndex,
  gainPlayList,
  setIsPlay,
  gainMusicId,
  setToolsStatus,
} from '../../store/actions';
import { isEmpty, getLocal } from '../../common/utils/format';
import { RAGet } from '../../api/netWork';
import { getMusicUrl } from '../../api/api';
const { ipcRenderer: ipc } = window.require('electron');

class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    //接收消息并展示到页面上
    ipc.on('reply', (event, arg) => {
      message.destroy();
      arg.indexOf('.成功') !== -1 ? message.error(arg) : message.info(arg)
    })
  };
  //评论
  handleComment = (e) => {
    const { item } = this.props;
    console.log(item);
    this.props.setToolsStatus(false);
    e.stopPropagation();
  };
  //播放
  handlePlay = (e) => {
    const { item, playList } = this.props;
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
  //下一首播放
  handleNextPlay = (e) => {
    const { item, playList, index } = this.props;
    const array = JSON.parse(JSON.stringify(playList));
    if (array.length === 0) {
      array.push(item);
      this.props.gainPlayList(array);
      this.props.gainMusicId(item.id);
      this.props.setIsPlay(true);
      return false;
    }
    let num;
    array.forEach((element, index) => {
      if (element.id === item.id) {
        num = index;
        array.splice(index, 1);
      }
    });
    if (index === num) return;
    index > num
      ? array.splice(index, 0, item)
      : array.splice(index + 1, 0, item);
    this.props.gainPlayList(array);
    this.props.setToolsStatus(false);
    message.info(`歌曲  ${item.name}  已添加到播放列表`)
    e.stopPropagation();
  };
  //收藏
  handleCollect = (e) => {
    const { item } = this.props;
    console.log(item);
    this.props.setToolsStatus(false);
    e.stopPropagation();
  };
  //分享
  handleShare = (e) => {
    const { item } = this.props;
    console.log(item);
    this.props.setToolsStatus(false);
    e.stopPropagation();
  };
  // 复制链接
  handleCopyUrl = (e) => {
    const { item } = this.props;
    const userInfo = getLocal('userInfo');
    const userId = userInfo.profile.userId;
    if (userId) {
      const url = `http://music.163.com/song?id=${item.id}&userid=${userId}`;
      copy(url) ? message.success('复制成功') : message.error('复制失败');
    } else {
      message.error('复制失败');
    }
    this.props.setToolsStatus(false);
    e.stopPropagation();
  };
  //下载
  handleDownload = (e) => {
    const { item } = this.props;
    this.getMusicUrl(item.id, item);
    this.props.setToolsStatus(false);
    e.stopPropagation();
  };
  //获取url地址
  getMusicUrl = (id, item) => {
    RAGet(getMusicUrl.api_url, {
      params: {
        id: id,
        br: 128000, //码率, 默认设置了 999000 即最大码率, 如果要 320k 则可设置为 320000, 其他类推
      },
    })
      .then((res) => {
        const url = res.data[0].url;
        if (!isEmpty(url)) {
          ipc.send('down', url, item.name + '.mp3');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { sty } = this.props;
    return (
      <div style={sty} className="tools">
        <div>
          <ul>
            <li onClick={this.handleComment}>查看评论</li>
            <li onClick={this.handlePlay}>播放</li>
            <li onClick={this.handleNextPlay}>下一首播放</li>
            <li onClick={this.handleCollect}>收藏到歌单</li>
            <li onClick={this.handleShare}>分享</li>
            <li onClick={this.handleCopyUrl}>复制链接</li>
            <li onClick={this.handleDownload}>下载</li>
          </ul>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Tools);
