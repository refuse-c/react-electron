/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-17 17:34:56
 * @Description:专辑详情页
 */
import React, { Component } from 'react';
import './index.scss';
import { albumList } from '../../api/api';
import { RAGet } from '../../api/netWork';
import ScrollArea from 'react-scrollbar';
import MusicList from '../../components/musicList';
import {
  imgParam,
  formatDate,
  isEmpty,
  dataScreening,
} from '../../common/utils/format';
import PlayAll from '../../components/playAll';
class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muscicList: '',
      albumDetail: {},
      status: 0
    };
  }
  componentDidMount = () => {
    const id = window.location.href.split('albumdetail')[1];
    this.getAlbumList(id);
  };
  componentWillReceiveProps = () => {
    this.setState({ playList: [], muscicList: '' }); //清空数据
    const id = window.location.href.split('albumdetail')[1];
    this.getAlbumList(id);
  };
  //获取歌单音乐列表
  getAlbumList = (id) => {
    RAGet(albumList.api_url, {
      params: {
        id: id,
      },
    }).then((res) => {
      const data = res.songs;
      const albumDetail = res.album;
      const status = albumDetail.status;
      const muscicList = dataScreening(data);

      this.setState({ albumDetail, muscicList, status });
    }).catch((err) => {
      // console.log(err);
    });
  };
  render() {
    const { albumDetail, muscicList, status } = this.state;
    const { name, artists, publishTime, info } = albumDetail;
    return (
      <div className="album_list">
        <ScrollArea
          speed={0.8}
          className="area"
          contentClassName="content"
          vertical={true}
          horizontal={true}
          minScrollSize={5}
        >
          <div className="album_list_info">
            <img src={imgParam(albumDetail.blurPicUrl, 150, 150)} alt="" />
            <div className="album_list_box">
              <div className="album_list_user">
                <p>专辑</p>
                <h2>{name}</h2>
              </div>
              <div className="album_list_btn">
                <PlayAll list={muscicList} text={`播放全部`} type={status} />
                <button>收藏{info && info.commentCount}</button>
                <button>分享{info && info.shareCount}</button>
                <button>下载全部</button>
              </div>
              <div className="album_list_tag">
                歌手：
                {artists && artists.map((item) => item.name + '').join(' / ')}
              </div>
              <div className="album_list_des">
                时间：{formatDate(publishTime && publishTime)}
              </div>
            </div>
          </div>
          <div className="album_list_info_list">
            {!isEmpty(muscicList) ? (
              <MusicList history={this.props.history} muscicList={muscicList} />
            ) : null}
          </div>
        </ScrollArea>
      </div>
    );
  }
}

export default AlbumDetail;
