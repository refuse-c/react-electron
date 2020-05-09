/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-05-09 17:31:54
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { playList } from '../../api/api';
import { RAGet } from '../../api/netWork';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import MusicList from '../musicList';
import { imgParam, fomatDate, dataScreening, isEmpty, aa } from '../../common/utils/format';

// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainPlayLIst, gainMusicId, setIsPlay, setIndex } from '../../store/actions';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playList: [],
      muscicList: '' //音乐id
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.showPlayList !== nextProps.showPlayList) {
      return false
    }
    return true;
  }
  playAll = () => {
    const { muscicList } = this.state;
    this.props.setIndex(0);
    this.props.setIsPlay(true);
    this.props.gainPlayLIst(muscicList);
    this.props.gainMusicId(muscicList[0].id);
  }
  componentDidMount = () => {
    const id = window.location.href.split('list')[1];
    this.getPlayList(id)
  }
  componentWillReceiveProps = () => {
    this.setState({ playList: [], muscicList: '' });//清空数据
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
      // console.log(res)

      const playList = res.playlist;
      const tracks = res.playlist.tracks;
      const privileges = res.privileges;
      const data = aa(tracks, privileges)
      const nickname = (this.props.userInfo.profile && this.props.userInfo.profile.nickname) || '';
      const muscicList = dataScreening(data);
      playList.name = playList.name.replace(nickname, '我');
      this.setState({ playList, muscicList });
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const { playList, muscicList } = this.state;
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
                <button onClick={this.playAll}>播放全部</button>
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
              !isEmpty(muscicList) ? <MusicList muscicList={muscicList} /> : null
            }
          </div>
        </ScrollArea >
      </div >
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    showPlayList: state.showPlayList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gainPlayLIst: bindActionCreators(gainPlayLIst, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(List);