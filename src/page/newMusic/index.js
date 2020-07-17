/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-07-03 10:58:44
 * @LastEditors: refuse_c
 * @Description:  最新音乐
 */
import React, { Component } from 'react';
import { RAGet } from '../../api/netWork';
import { topSong } from '../../api/api';
import MusicList from '../../components/musicList';
import { dataScreening } from '../../common/utils/format';
import PlayAll from '../../components/playAll';
class NewMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: {},
      songType: '0',
      songNav: [
        {
          ti: '全部',
          ty: '0'
        },
        {
          ti: '华语',
          ty: '7'
        },
        {
          ti: '欧美',
          ty: '96'
        }, {
          ti: '日本',
          ty: '8'
        }
        , {
          ti: '韩国',
          ty: '16'
        }
      ]
    }
  }
  componentDidMount = () => {
    const { songType } = this.state;
    this.getTopSong(songType)
  }
  getTopSong = (type) => {
    RAGet(topSong.api_url, {
      params: { type: type }
    }).then(res => {
      const songList = dataScreening(res.data);
      this.setState({ songList });
    }).catch(err => {
      // console.log(err)
    })
  }
  handleMenu = (item) => {
    this.setState({ songList: {} });
    this.setState({ songType: item.ty })
    this.getTopSong(item.ty)
  }
  componentWillUnmount() {
    // 卸载异步操作设置状态
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { songNav, songType, songList } = this.state;
    return (
      <div className="new-music">
        <div className="headline">
          <p className="headline_title">新歌速递</p>
          <ul>
            {
              songNav.map((item, index) => {
                const mvActive = songType === item.ty ? 'areaActive' : ''
                return (
                  <li className={mvActive} onClick={this.handleMenu.bind(this, item)} key={index}>{item.ti}</li>
                )
              })
            }
          </ul>
          <PlayAll
            cls={`btn1`}
            text={`播放全部`}
            list={songList}
          />
        </div>
        {
          songList.length > 0
            ? <MusicList history={this.props.history} muscicList={songList} />
            : null
        }
      </div>
    );
  }
}

export default NewMusic;