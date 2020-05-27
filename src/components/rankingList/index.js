/* eslint-disable no-dupe-keys */
/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-05-27 20:39:02
 * @LastEditors: RA
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { imgParam, formatPlaycount, aa } from '../../common/utils/format';
import {
  topList,
  allTopList,
  toplistDetail,
  toplistArtist,
} from '../../api/api';
class RankingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialList: {},
      globalList: {},
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
    this.getTopList(3);
    this.getTopList(0);
    this.getTopList(2);
    this.getTopList(1);

    this.getAllTopList();
    // this.getToplistArtist();
    this.getToplistDetail();
    // this.testResult();
  };
  // async testResult() {
  //   this.getTopList(0);
  //   this.getTopList(1);
  //   this.getTopList(2);
  //   this.getTopList(3);
  // }
  // 排行榜
  getTopList = (id) => {
    RAGet(topList.api_url, {
      params: {
        idx: id,
      },
    })
      .then((res) => {
        // console.log(res)
        const obj = {};
        const tracks = res.playlist.tracks;
        const privileges = res.privileges;
        const data = aa(tracks, privileges);
        console.log(data)
        const { allData } = this.state;
        obj.list = data;
        obj.name = res.playlist.name;
        obj.coverImgUrl = res.playlist.coverImgUrl;
        allData.push(obj);
        this.setState({ officialList: allData });
      })
      .catch((err) => {
        console.log(err);
      });
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
  getToplistDetail = () => {
    RAGet(toplistDetail.api_url)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getToplistArtist = () => {
    RAGet(toplistArtist.api_url)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { officialList, globalList } = this.state;
    return (
      <div className="ranking_ist">
        <div className="headline">
          <p>官方榜</p>
        </div>
        <div className="official_List">
          {officialList.length === 4 &&
            officialList.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item.coverImgUrl} alt="" />
                  <ul>
                    {item.list.map((item, index) => {
                      let num = index < 9 ? '0' + (index + 1) : index + 1;
                      if (index > 9) return false;
                      return (
                        <li key={index}>
                          <p>{num}</p>
                          <p>{item.name}</p>
                          <p>
                            {item.ar.map((item) => item.name + '').join(' - ')}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
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
                  <li key={index}>
                    <div>
                      <img src={imgParam(item.coverImgUrl, 300, 300)} alt="" />
                      <p className="play_count">
                        {formatPlaycount(item.playCount)}
                      </p>
                    </div>
                    <p className="play_name">{item.name}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default RankingList;
