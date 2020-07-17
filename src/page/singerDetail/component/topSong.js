/*
 * @Author: REFUSE_C
 * @Date: 2020-06-09 09:40:56
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-17 15:53:24
 * @Description: 歌手详情->top50
 */
import React, { Component } from 'react';
import { RAGet } from '../../../api/netWork';
import { artistTopSong } from '../../../api/api';
import { obtainId } from '../../../common/utils/format';
import MusicList from '../../../components/musicList';
class TopSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: {}
    }
  }
  componentDidMount = () => {
    const id = obtainId(window.location.href, 'singerdetail');
    this.getTopFifty(id);
  };
  componentWillReceiveProps = (nextProps) => {
    const id = obtainId(window.location.href, 'singerdetail');
    if (this.props.id !== nextProps.id) {
      if (id) {
        this.getTopFifty(id);
      }
    }
  }

  componentWillUnmount() {
    // 卸载异步操作设置状态
    this.setState = (state, callback) => {
      return;
    };
  }
  getTopFifty = (id) => {
    RAGet(artistTopSong.api_url, {
      params: { id: id }
    }).then(res => {
      const songList = res.songs;
      this.setState({ songList })
      this.props.toFatherValue(songList);
    }).catch(err => {
      // console.log(err)
    })
  }
  render() {
    const { songList } = this.state;
    return (
      <div className="singer_top_song">
        <MusicList history={this.props.history} muscicList={songList} />
      </div>
    );
  }
}

export default TopSong;