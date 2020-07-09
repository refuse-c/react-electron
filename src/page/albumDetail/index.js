/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-09 16:27:42
 * @Description:专辑详情页
 */
import React, { Component } from 'react';
import './index.scss';
import { albumList } from '../../api/api';
import { RAGet } from '../../api/netWork';
// import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import MusicList from '../../components/musicList';
import {
  imgParam,
  formatDate,
  isEmpty,
  dataScreening,
} from '../../common/utils/format';

// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  gainPlayList,
  gainMusicId,
  setIsPlay,
  setIndex,
} from '../../store/actions';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muscicList: '',
      albumDetail: {},
    };
  }
  playAll = () => {
    const { muscicList } = this.state;
    this.props.setIsPlay(true);
    this.props.gainPlayList(muscicList);
    this.props.gainMusicId(muscicList[0].id);
  };
  componentDidMount = () => {
    const id = window.location.href.split('albumList')[1];
    this.getAlbumList(id);
  };
  componentWillReceiveProps = () => {
    this.setState({ playList: [], muscicList: '' }); //清空数据
    const id = window.location.href.split('albumList')[1];
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
      const muscicList = dataScreening(data);

      this.setState({ albumDetail, muscicList });
    }).catch((err) => {
      // console.log(err);
    });
  };
  render() {
    const { albumDetail, muscicList } = this.state;
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
                <button onClick={this.playAll}>播放全部</button>
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
              <MusicList muscicList={muscicList} />
            ) : null}
          </div>
        </ScrollArea>
      </div>
    );
  }
}

//注册store
const mapStateToProps = (state) => { };

const mapDispatchToProps = (dispatch) => {
  return {
    gainPlayList: bindActionCreators(gainPlayList, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
