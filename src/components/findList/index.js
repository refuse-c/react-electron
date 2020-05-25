/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-05-25 17:31:31
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { playlistCatlist, playlistHot, topPlaylist } from '../../api/api';

import List from './list';
import { formatArr } from '../../common/utils/format';
class FindList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allListData: {},
      hotListData: {},
      current: '全部歌单',
      showAllList: true
    }
  }

  componentDidMount = () => {
    this.getPlaylistCatlist();
    this.getPlaylistHot();
  }
  getPlaylistCatlist = () => {
    RAGet(playlistCatlist.api_url)
      .then(res => {
        const a = res.sub;
        const b = res.categories;
        const allListData = formatArr(a, b)
        this.setState({ allListData });
      }).catch(err => {
        console.log(err)
      })
  }
  getPlaylistHot = () => {
    RAGet(playlistHot.api_url)
      .then(res => {
        const hotListData = res.tags;
        this.setState({ hotListData });
      }).catch(err => {
        console.log(err)
      })
  }
  gettopPlaylist = () => {
    RAGet(topPlaylist.api_url, {
      params: {
        order: '',//可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
        limit: '',//取出评论数量, 默认为 50
        offset: '',// 偏移数量, 用于分页, 如: (评论页数 - 1) * 50, 其中 50 为 limit 的值
        cat: ''
      }
    })
  }
  render() {
    const { current, hotListData, allListData, showAllList } = this.state;
    // console.log(hotListData)
    // console.log(allListData)
    return (
      <div className="findList">
        <h3 className="current_name" onClick={() => this.setState({ showAllList: true })}>{current}</h3>
        <div className="hot_tags">热门标签：
        <ul>
            {
              hotListData.length > 0 && hotListData.map((item, index) => {
                return (
                  <li key={index}>{item.playlistTag.name}</li>
                )
              })
            }
          </ul>
        </div>
        {
          showAllList && allListData ?
            <List data={allListData} />
            : null
        }
      </div>
    );
  }
}

export default FindList;