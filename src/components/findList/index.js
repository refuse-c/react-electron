/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-05-29 16:50:35
 * @LastEditors: refuse_c
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';

import { NavLink } from 'react-router-dom';
import { RAGet } from '../../api/netWork';
import { playlistCatlist, playlistHot, topPlaylist } from '../../api/api';
import Pagination from '../pagination';
import List from './list';
// import SongList from '../songList';
import { formatArr, imgParam, isEmpty, formatTotal } from '../../common/utils/format';

// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setShowPopStatus, setSonglstText } from '../../store/actions';
class FindList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allListData: {},
      hotListData: {},
      songListdata: {},
      total: 0,
      songListText: '全部歌单',
    };
  }

  componentDidMount = () => {
    const { songListText } = this.state;
    this.getPlaylistCatlist();
    this.getPlaylistHot();
    this.getTopPlaylist(songListText);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { songListText } = nextProps;
    if (songListText !== prevState.songListText) {
      return {
        songListText,
        props: {
          songListText: songListText,
        },
      };
    }
    return null;
  }
  componentDidUpdate(prevState) {
    // 当前音乐更新了
    if (prevState.songListText !== this.state.songListText) {
      const { songListText } = this.state;
      this.getTopPlaylist(songListText);
    }
  }
  getPlaylistCatlist = () => {
    RAGet(playlistCatlist.api_url)
      .then((res) => {
        const a = res.sub;
        const b = res.categories;
        const allListData = formatArr(a, b);
        this.setState({ allListData });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getPlaylistHot = () => {
    RAGet(playlistHot.api_url)
      .then((res) => {
        const hotListData = res.tags;
        this.setState({ hotListData });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getTopPlaylist = (songListText) => {
    RAGet(topPlaylist.api_url, {
      params: {
        order: '', //可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
        limit: 100, //取出评论数量, 默认为 50
        offset: '', // 偏移数量, 用于分页, 如: (评论页数 - 1) * 50, 其中 50 为 limit 的值
        cat: songListText,
      },
    })
      .then((res) => {
        const { total } = res;
        this.setState({ total })
        const songListdata = res.playlists;
        this.setState({ songListdata });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  showPlop = () => {
    const { showPlop } = this.props;
    showPlop === 'song_list'
      ? this.props.setShowPopStatus('')
      : this.props.setShowPopStatus('song_list');
  };
  chooseItem = (text) => {
    this.props.setShowPopStatus('');
    this.props.setSonglstText(text);
  };
  render() {
    const { showPlop } = this.props;
    const { songListText, hotListData, allListData, songListdata, total } = this.state;
    return (
      <div className="findList">
        {
          // <SongList data={songListdata} />
        }
        <h3 className="song_list_text" onClick={this.showPlop}>
          {songListText}
        </h3>
        <div className="hot_tags">
          热门标签：
          <ul>
            {hotListData.length > 0 &&
              hotListData.map((item, index) => {
                return (
                  <li
                    onClick={this.chooseItem.bind(this, item.playlistTag.name)}
                    key={index}
                  >
                    {item.playlistTag.name}
                  </li>
                );
              })}
          </ul>
        </div>
        {showPlop === 'song_list' && allListData ? (
          <List data={allListData} />
        ) : null}

        <div className="recommend-list">
          <ul>
            {
              songListdata.length > 0 &&
              songListdata.map((item, index) => {
                const path = '/home/single';
                const dailySpecial = '/home/dailySpecial';
                return item.custom === 1 ? (
                  <NavLink to={dailySpecial} key={index}>
                    <li>
                      <div className="recommend-bg">
                        <img src={item.picUrl} alt="" />
                        <div>
                          <h4>{item.week}</h4>
                          <h3>{item.day}</h3>
                        </div>
                      </div>

                      <p>{item.name}</p>
                    </li>
                  </NavLink>
                ) : (
                    <NavLink to={path + item.id} key={index}>
                      <li>
                        <img src={imgParam(item.coverImgUrl, 160, 160)} alt="" />
                        <p>{item.name}</p>
                      </li>
                    </NavLink>
                  );
              })
            }
          </ul>
        </div>
        {
          !isEmpty(total) && total > 0
            ? <Pagination totalPage={formatTotal(total, 100)} pageNum={1} />
            : null
        }
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    showPlop: state.showPlop,
    songListText: state.songListText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowPopStatus: bindActionCreators(setShowPopStatus, dispatch),
    setSonglstText: bindActionCreators(setSonglstText, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FindList);
