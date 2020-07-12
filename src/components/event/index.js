/*
 * @Author: REFUSE_C
 * @Date: 2020-07-10 17:54:31
 * @LastEditors: RA
 * @LastEditTime: 2020-07-10 19:35:42
 * @Description: 动态组件
 */
import React, { Component } from 'react';
import './index.scss';
import {
  imgParam,
  formatDynamicType,
  formatDate,
  isEmpty,
} from '../../common/utils/format';

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
class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //播放
  handlePlay = (item, e) => {
    console.log(e, item);
    const { playList } = this.props;
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
  gotouserDetail = (item) => {
    this.props.history.push({ pathname: `/home/userdetail${item.userId}` });
  };
  render() {
    const { data } = this.props;
    return (
      <div className="event">
        <ul className="dynamic-list">
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
              const jsonData = JSON.parse(item.json);
              console.log(jsonData);

              return (
                <li key={index} className="dynamic-item">
                  <div className="dynamic-top">
                    <img
                      src={imgParam(item.user && item.user.avatarUrl, 40, 40)}
                      alt=""
                    />
                    <div>
                      <p>
                        <span
                          className="user-name"
                          onClick={this.gotouserDetail.bind(this, item.user)}
                        >
                          {item.user && item.user.nickname}
                        </span>
                        {formatDynamicType(item.type)}{' '}
                      </p>
                      <p>{formatDate(item.eventTime)}</p>
                    </div>
                  </div>
                  {jsonData && jsonData.msg ? (
                    <div className="dynamic-msg">{jsonData.msg}</div>
                  ) : (
                    ''
                  )}
                  {
                    //歌单
                    jsonData && jsonData.playlist ? (
                      <div className="media">
                        <img
                          src={imgParam(jsonData.playlist.coverImgUrl, 40, 40)}
                          alt=""
                        />
                        <div>
                          <p>{jsonData.playlist.name}</p>
                          <p>by {jsonData.playlist.creator.nickname}</p>
                        </div>
                      </div>
                    ) : (
                      ''
                    )
                  }
                  {
                    //电台
                    jsonData && jsonData.program ? (
                      <div className="media">
                        <img
                          src={imgParam(jsonData.program.radio.picUrl, 40, 40)}
                          alt=""
                        />
                        <div>
                          <p>{jsonData.program.name}</p>
                          <p>
                            <span>{jsonData.program.radio.category}</span>{' '}
                            <span>{jsonData.program.radio.name}</span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      ''
                    )
                  }
                  {
                    //单曲
                    jsonData && jsonData.song ? (
                      <div
                        onClick={this.handlePlay.bind(this, jsonData.song)}
                        className="media"
                      >
                        <img
                          src={imgParam(jsonData.song.album.blurPicUrl, 40, 40)}
                          alt=""
                        />
                        <div>
                          <p>{jsonData.song.name}</p>
                          <p>
                            {jsonData.song.artists.map((item) => item.name)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      ''
                    )
                  }
                  {
                    //图片
                    item.pics && item.pics.length > 0 ? (
                      <div className="pics">
                        {item.pics.map((item, index) => (
                          <img
                            key={index}
                            src={imgParam(
                              item.originUrl,
                              item.width,
                              item.height
                            )}
                            alt=""
                          />
                        ))}
                      </div>
                    ) : (
                      ''
                    )
                  }
                </li>
              );
            })}
        </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(Event);
