/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-05-07 00:37:09
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { playList } from '../../api/api';
import { RAGet } from '../../api/netWork';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import MusicList from '../musicList';
import { imgParam, fomatDate, dataScreening, isEmpty } from '../../common/utils/format';

// store 
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { gainMusicList, gainMusicId, gainPlayLIst } from '../../store/actions';
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
      console.log(res)
      const playList = res.playlist;
      const nickname = this.props.userInfo.profile.nickname || '1';
      const musicIds = dataScreening(res.playlist.tracks);
      playList.name = playList.name.replace(nickname, '我');
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

//注册store
const mapStateToProps = (state) => {
  console.log(state)
  return {
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(List);