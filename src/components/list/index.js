/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-05-01 13:07:45
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { playList } from '../../api/api';
import { RAGet } from '../../api/netWork';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import MusicList from '../musicList';
import { imgParam, fomatDate, AssembleIds, isEmpty } from '../../common/utils/format';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playList: [],
      musicIds: '' //音乐id
    }
  }
  componentDidMount = () => {
    const id = window.location.href.split('list')[1];
    this.getPlayList(id)
  }
  componentWillReceiveProps = () => {
    this.setState({ playList: [], musicIds: '' });//清空数据
    const id = window.location.href.split('list')[1];
    this.getPlayList(id)
  }
  //获取歌单音乐列表
  getPlayList = (id) => {
    RAGet(playList.api_url, {
      params: {
        id: id
      }
    }).then(res => {
      const playList = res.playlist;
      const musicIds = AssembleIds(res.privileges);
      this.setState({ playList, musicIds });
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const { playList, musicIds } = this.state;
    const { name, creator, tags, createTime, description } = this.state.playList;
    return (
      <div className="list">
        <ScrollArea
          speed={0.8}
          className="area"
          contentClassName="content"
          vertical={true}
          horizontal={true}
          minScrollSize={5}
        >
          <div className="list_info">
            <img src={imgParam(playList.coverImgUrl, 150, 150)} alt="" />
            <div className="list_box">
              <div className="list_user">
                <p>歌单</p>
                <h2>{name}</h2>
              </div>
              <div className="list_author">
                <img src={imgParam(creator && creator.avatarUrl, 50, 50)} alt="" />
                <p>{creator && creator.nickname}</p>
                <p>{playList && fomatDate(createTime)}</p>
              </div>
              <div className="list_btn">
                <button>播放全部</button>
                <button>收藏</button>
                <button>分享</button>
                <button>下载全部</button>
              </div>
              <div className="list_tag">标签：{tags && tags.map(item => item + '').join(' / ')}</div>
              <div className="list_des">介绍：{description && description}</div>
            </div>
          </div>
          <div className="list_info_list">
            {
              !isEmpty(musicIds) ? <MusicList musicIds={musicIds} /> : null
            }
          </div>
        </ScrollArea >
      </div >
    );
  }
}

export default List;