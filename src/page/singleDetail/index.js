/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-09 16:29:44
 * @Description:歌单详情
 */
import React, { Component } from 'react';
import './index.scss';
import { playList } from '../../api/api';
import { RAGet } from '../../api/netWork';
// import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import MusicList from '../../components/musicList';
import {
  imgParam,
  formatDate,
  dataScreening,
  isEmpty,
  aa,
} from '../../common/utils/format';
import PlayAll from '../../components/playAll';
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
      playList: [],
      muscicList: '', //音乐id
    };
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.showPlop !== nextProps.showPlop) {
      return false;
    }
    if (this.props.toolStatus !== nextProps.toolStatus) {
      return false;
    }
    return true;
  };
  playAll = () => {
    const { muscicList } = this.state;
    this.props.setIndex(0);
    this.props.setIsPlay(true);
    this.props.gainPlayList(muscicList);
    this.props.gainMusicId(muscicList[0].id);
  };
  componentDidMount = () => {
    const id = window.location.href.split('single')[1];
    this.getPlayList(id);
  };
  componentWillReceiveProps = () => {
    this.setState({ playList: [], muscicList: '' }); //清空数据
    const id = window.location.href.split('single')[1];
    this.getPlayList(id);
  };
  //获取歌单音乐列表
  getPlayList = (id) => {
    RAGet(playList.api_url, {
      params: {
        id: id,
      },
    }).then((res) => {
      const playList = res.playlist;
      const tracks = res.playlist.tracks;
      const privileges = res.privileges;
      const data = aa(tracks, privileges);
      const nickname =
        (this.props.userInfo.profile &&
          this.props.userInfo.profile.nickname) ||
        '';
      const muscicList = dataScreening(data);
      playList.name = playList.name.replace(nickname, '我');
      this.setState({ playList, muscicList });
    }).catch((err) => {
      // console.log(err);
    });
  };
  render() {
    const { playList, muscicList } = this.state;
    const {
      name,
      creator,
      tags,
      createTime,
      description,
    } = this.state.playList;
    return (
      <div className="single">
        <ScrollArea
          speed={0.8}
          className="area"
          contentClassName="content"
          vertical={true}
          horizontal={true}
          minScrollSize={5}
        >
          <div className="single_info">
            <img src={imgParam(playList.coverImgUrl, 200, 200)} alt="" />
            <div className="single_box">
              <div className="single_user">
                <p>歌单</p>
                <h2>{name}</h2>
              </div>
              <div className="single_author">
                <img
                  src={imgParam(creator && creator.avatarUrl, 50, 50)}
                  alt=""
                />
                <p>{creator && creator.nickname}</p>
                <p>{playList && formatDate(createTime)}</p>
              </div>
              <div className="single_btn">
                <PlayAll list={muscicList} text={`播放全部`} />
                <button>收藏</button>
                <button>分享</button>
                <button>下载全部</button>
              </div>
              {
                tags && tags.length > 0
                  ? <div className="single_tag">标签：{tags.map((item) => item + '').join(' / ')}</div>
                  : null
              }
              {
                description
                  ? <div className="single_des">简介：{description}</div>
                  : null
              }

            </div>
          </div>
          <div className="single_info_list">
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
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    showPlop: state.showPlop,
    toolStatus: state.toolStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gainPlayList: bindActionCreators(gainPlayList, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
