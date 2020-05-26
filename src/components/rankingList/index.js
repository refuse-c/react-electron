/* eslint-disable no-dupe-keys */
/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-05-26 12:45:08
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { topList, allTopList, toplistDetail, toplistArtist } from '../../api/api';
class RankingList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount = () => {
    this.getTopList(0);
    this.getTopList(1);
    this.getTopList(2);
    this.getTopList(3);
    this.getAllTopList();
    this.getToplistArtist();
    // this.getToplistDetail();
  }
  getTopList = () => {
    RAGet(topList.api_url, {
      params: {
        idx: 6
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  // 排行榜
  getTopList = (id) => {
    RAGet(topList.api_url, {
      params: {
        idx: id
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  //所有榜单
  getAllTopList = () => {
    RAGet(allTopList.api_url)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }
  //所有榜单摘要详情
  getToplistDetail = () => {
    RAGet(toplistDetail.api_url)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }
  getToplistArtist = () => {
    RAGet(toplistArtist.api_url)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <div className="ranking-ist">

      </div>
    );
  }
}

export default RankingList;