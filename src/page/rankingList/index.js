/* eslint-disable no-dupe-keys */
/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-07-21 19:37:53
 * @LastEditors: refuse_c
 * @Description:排行榜
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import PlayAll from '../../components/playAll';
import { NavLink } from 'react-router-dom';
import {
  imgParam,
  formatPlaycount,
  setLocal,
  getLocal,
  isEmpty,
  formatDate, dataScreening, aa, jumpDetails
} from '../../common/utils/format';
import {
  allTopList,
  toplistArtist, playList
} from '../../api/api';

// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  gainMusicList,
  setIndex,
  gainPlayList,
  setIsPlay,
  gainMusicId,
} from '../../store/actions';
import { message } from 'antd';
class RankingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialData: getLocal('officialData') || {},
      officialList: {},
      globalList: {},
      singerList: {},
      filterArr: [
        '云音乐飙升榜',
        '云音乐新歌榜',
        '网易原创歌曲榜',
        '云音乐热歌榜',
      ]
    };
  }
  componentDidMount = () => {
    this.getAllTopList();
  };
  // 歌单详情
  getPlayList = async (id, type) => {
    let data = {};
    let list;
    await RAGet(playList.api_url, {
      params: {
        id: id
      }
    }).then(res => {
      const tracks = res.playlist.tracks;
      const privileges = res.privileges;
      const playList = aa(tracks, privileges);
      const nickname = getLocal('userInfo').profile.nickname || '';
      list = dataScreening(playList);
      data.list = list;
      data.name = res.playlist.name.replace(nickname, '我');
      data.updateTime = res.playlist.updateTime;
      data.id = res.playlist.id;
      data.path = '/home/single' + res.playlist.id;
      data.coverImgUrl = res.playlist.coverImgUrl;
    }).catch(err => { console.log(err) })
    return type === 'only' ? list : data;
  }
  //所有榜单
  getAllTopList = () => {
    const { filterArr } = this.state;
    RAGet(allTopList.api_url)
      .then((res) => {
        const list = res.list;
        let globalList = list.filter((e) => !filterArr.includes(e.name));
        // 传入两个数组a，b，将数组a中包含b的值全部去掉，重复的也去掉，返回去掉之后新数组
        let officialList = list.filter((e) => filterArr.includes(e.name));
        officialList.push('singer')
        this.setState({ globalList })

        const promises = officialList.map(
          item => item === 'singer' ? this.getToplistArtist() : this.getPlayList(item.id));
        Promise.all(promises)
          .then(officialData => {
            this.setState({ officialData })
            setLocal('officialData', officialData)
          })

      })
      .catch((err) => {
        // console.log(err);
      });
  };
  //歌手榜
  getToplistArtist = async () => {
    let data = {};
    await RAGet(toplistArtist.api_url)
      .then((res) => {
        data.list = res.list.artists;
        data.path = '/home/find/artistTop';
        data.type = 'singer';
      })
      .catch((err) => {
        // console.log(err);
      });
    return data;
  };
  addMusic = (item) => {
    let flag = null;
    const array = getLocal('playList');
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
      this.props.setIndex(0);
      this.props.gainPlayList(array);
    }
    this.props.setIsPlay(true);
    this.props.gainMusicId(item.id);
  };
  gotoArtist = (item) => {
    this.props.history.push({ pathname: `/home/singerdetail${item.id}` })
  }
  handelAll = async (e, id) => {
    e.stopPropagation();
    const list = await this.getPlayList(id, 'only')
    if (!isEmpty(list) && list.length > 0) {
      this.props.setIndex(0);
      this.props.setIsPlay(true);
      this.props.gainPlayList(list);
      this.props.gainMusicId(list[0].id);
    } else {
      message.destroy();
      message.error('当前列表还未就绪,请稍后再试!');
    }
  }
  render() {
    const { officialData, globalList } = this.state;
    return (
      <div className="ranking_ist">
        <div className="headline">
          <p>官方榜</p>
        </div>
        <div className="official_List">
          {officialData.length > 0 &&
            officialData.map((item, index) => {
              return (
                <div
                  className="official_List_box"
                  key={index}
                  style={{
                    background: 'url(' + require(`./img/${index}.png`) + ')  center top / 100% 90px no-repeat',
                  }}
                >
                  {item.type === 'singer' ? null : (
                    <PlayAll cls={`play_all_img`} list={item.list} />
                  )}

                  <img src={require(`./img/text${index}.png`)} alt="" />
                  {item.updateTime ? (
                    <span>
                      {formatDate(item.updateTime, '0').substr(5) + '更新'}
                    </span>
                  ) : null}

                  <ul>
                    {!isEmpty(item.list) &&
                      item.list.map((item, index) => {
                        let num = index < 9 ? '0' + (index + 1) : index + 1;
                        if (index > 7) return false;
                        return (
                          <li
                            key={index}
                            onClick={item.ar ? this.addMusic.bind(this, item) : this.gotoArtist.bind(this, item)}
                          >
                            <p>{num}</p>
                            <p>{item.name}</p>
                            {item.ar ? (
                              <p>
                                {item.ar
                                  .map((item) => item.name + '')
                                  .join(' - ')}
                              </p>
                            ) : null}
                          </li>
                        );
                      })}
                  </ul>
                  <div className="viewAll">
                    {item.path ? (
                      <NavLink to={item.path}>查看全部</NavLink>
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="headline">
          <p className="headline_title">全球榜</p>
        </div>
        <div className="global_list">
          <ul>
            {globalList.length > 0 &&
              globalList.map((item, index) => {
                return (
                  // <NavLink key={index} to={path + item.id}>
                  <li key={index} onClick={e => { jumpDetails(this, 'single', item.id) }}>
                    <div>
                      <img
                        src={imgParam(item.coverImgUrl, 300, 300)}
                        alt=""
                      />
                      <p className="play_count">
                        {formatPlaycount(item.playCount)}
                      </p>
                      <p className={`play_all`} onClick={e => this.handelAll(e, item.id)}></p>
                    </div>
                    <p className="play_name" >{item.name}</p>

                  </li>
                  // </NavLink>
                );
              })}
          </ul>
        </div>
      </div >
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    musicList: state.musicList,
    playList: state.playList,
    musicId: state.musicId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
    gainPlayList: bindActionCreators(gainPlayList, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RankingList);
