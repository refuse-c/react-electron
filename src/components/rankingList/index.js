/* eslint-disable no-dupe-keys */
/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-06-03 21:30:46
 * @LastEditors: RA
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import PlayAll from '../playAll';
import { NavLink } from 'react-router-dom';
import {
  imgParam,
  formatPlaycount,
  aa,
  setLocal,
  getLocal,
  isEmpty,
  formatDate,
} from '../../common/utils/format';
import {
  topList,
  allTopList,
  toplistDetail,
  toplistArtist,
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
class RankingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialList: getLocal('officialList') || {},
      globalList: {},
      singerList: {},
      filterArr: [
        '云音乐飙升榜',
        '云音乐新歌榜',
        '网易原创歌曲榜',
        '云音乐热歌榜',
      ],
      allData: [],
    };
  }

  componentDidMount = () => {
    this.getAllTopList();
    this.testResult();
  };
  testResult = async () => {
    let a = await this.getTopList(3);
    let b = await this.getTopList(0);
    let c = await this.getTopList(2);
    let d = await this.getTopList(1);
    let e = await this.getToplistDetail();
    let f = await this.getToplistArtist();
    e.list = f;
    e.path = '/home/find/findSinger';
    e.type = 'singer';
    const officialList = [a, b, c, d, e];
    setLocal('officialList', officialList);
    this.setState({ officialList });
  };
  // 排行榜
  getTopList = async (id) => {
    let data = {};
    await RAGet(topList.api_url, {
      params: {
        idx: id,
      },
    })
      .then((res) => {
        const tracks = res.playlist.tracks;
        const privileges = res.privileges;
        data.name = res.playlist.name;
        data.updateTime = res.playlist.updateTime;
        data.list = aa(tracks, privileges);
        data.id = res.playlist.id;
        data.path = '/home/single' + res.playlist.id;
        data.coverImgUrl = res.playlist.coverImgUrl;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  };

  //所有榜单
  getAllTopList = () => {
    const { filterArr } = this.state;
    RAGet(allTopList.api_url)
      .then((res) => {
        const list = res.list;
        let globalList = list.filter((e) => !filterArr.includes(e.name));
        // 传入两个数组a，b，将数组a中包含b的值全部去掉，重复的也去掉，返回去掉之后新数组
        this.setState({ globalList });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //所有榜单摘要详情
  getToplistDetail = async () => {
    let data = {};
    await RAGet(toplistDetail.api_url)
      .then((res) => {
        data.name = res.artistToplist.name;
        data.coverImgUrl = res.artistToplist.coverUrl;
        data.updateFrequency = res.artistToplist.updateFrequency;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  };
  //歌手榜
  getToplistArtist = async () => {
    let data;
    await RAGet(toplistArtist.api_url)
      .then((res) => {
        data = res.list.artists;
      })
      .catch((err) => {
        console.log(err);
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
  render() {
    const { officialList, globalList } = this.state;
    const path = '/home/single';
    return (
      <div className="ranking_ist">
        <div className="headline">
          <p>官方榜</p>
        </div>
        <div className="official_List">
          {officialList.length > 0 &&
            officialList.map((item, index) => {
              return (
                <div
                  className="official_List_box"
                  key={index}
                  style={{
                    backgroundImage:
                      'url(' + require(`./img/${index}.png`) + ')',
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
                    {item.list.map((item, index) => {
                      let num = index < 9 ? '0' + (index + 1) : index + 1;
                      if (index > 9) return false;
                      return (
                        <li
                          key={index}
                          onClick={
                            item.ar ? this.addMusic.bind(this, item) : null
                          }
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
                  <div>
                    <NavLink to={item.path}>查看全部</NavLink>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="headline">
          <p>全球榜</p>
        </div>
        <div className="global_list">
          <ul>
            {globalList.length > 0 &&
              globalList.map((item, index) => {
                return (
                  <NavLink key={index} to={path + item.id}>
                    <li>
                      <div>
                        <img
                          src={imgParam(item.coverImgUrl, 300, 300)}
                          alt=""
                        />
                        <p className="play_count">
                          {formatPlaycount(item.playCount)}
                        </p>
                      </div>
                      <p className="play_name">{item.name}</p>
                    </li>
                  </NavLink>
                );
              })}
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
