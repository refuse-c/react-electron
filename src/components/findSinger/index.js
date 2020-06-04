/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-06-04 18:11:08
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { artistList } from '../../api/api';
import { imgParam } from '../../common/utils/format';
class FindSinger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singerCat: ['全部', '华语', '欧美', '日本', '韩国', '其他'],
      singerType: ['全部', '男歌手', '女歌手', '乐队组合'],
      singerArea: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      singerCatText: '全部',
      singerTypeText: '全部',
      singerAreaText: '热门',
      artistsList: {}
    }
  }
  componentDidMount = () => {
    this.getArtistList('-1', '-1', '-1', 100, 0)
  }
  hangleClick = (text, type) => {
    let cat = '-1', types = '-1', area = '-1';
    switch (type) {
      case '1':
        switch (text) {
          case '全部': cat = '-1'; break;
          case '华语': cat = '7'; break;
          case '欧美': cat = '96'; break;
          case '日本': cat = '8'; break;
          case '韩国': cat = '16'; break;
          default: cat = '0'; break;
        }
        this.setState({ singerCatText: text })
        break;
      case '2':
        switch (text) {
          case '全部': types = '-1'; break;
          case '男歌手': types = '1'; break;
          case '女歌手': types = '2'; break;
          default: types = '3'; break;
        }
        this.setState({ singerTypeText: text })
        break;
      default:
        switch (text) {
          case '热门': area = '-1'; break;
          case '#': area = '0'; break;
          default: area = text.toLowerCase(); break;
        }
        this.setState({ singerAreaText: text })
        break;
    }
    this.getArtistList(cat, types, area, 100, 0)
  }
  getArtistList = (cat, type, area, limit, offset) => {
    console.log(cat, type, area)
    this.setState({ artistsList: {} })
    RAGet(artistList.api_url, {
      params: {
        cat: cat,
        type: type,
        initial: area,
        limit: limit,
        offset: offset,
      }
    }).then(res => {
      console.log(res)
      const artistsList = res.artists;
      this.setState({ artistsList })
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const { singerCat, singerType, singerArea, singerCatText: cat, singerTypeText: type, singerAreaText: area, artistsList: list } = this.state;
    return (
      <div className="find_singer">
        <div className="menu_list">
          <ul>
            <p>语种：</p>
            {
              singerCat.map((item, index) => {
                const active = cat === item ? 'active' : ''
                return (
                  <li className={active} onClick={this.hangleClick.bind(this, item, '1')} key={index}>{item}</li>
                )
              })
            }
          </ul>
          <ul>
            <p>分类：</p>
            {
              singerType.map((item, index) => {
                const active = type === item ? 'active' : ''
                return (
                  <li className={active} onClick={this.hangleClick.bind(this, item, '2')} key={index}>{item}</li>
                )
              })
            }
          </ul>
          <ul>
            <p>筛选：</p>
            {
              singerArea.map((item, index) => {
                const active = area === item ? 'active' : ''
                return (
                  <li className={active} onClick={this.hangleClick.bind(this, item, '3')} key={index}>{item}</li>
                )
              })
            }
          </ul>
        </div>

        <div className="singer_list">
          <ul>
            {
              list.length > 0 && list.map((item, index) => {
                return (
                  <li key={index}>
                    <div>
                      <img src={imgParam(item.picUrl, 200, 200)} alt="" />
                    </div>
                    <p>{item.name}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
// picId: 109951164232057950
// albumSize: 24
// img1v1Url: "http://p4.music.126.net/Xl0WENt4F6wsgjjjQWuQsw==/109951164232034479.jpg"
// picUrl: "http://p3.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg"
// trans: ""
// followed: false
// briefDesc: ""
// musicSize: 108
// name: "隔壁老樊"
// id: 12429072
// accountId: 277313426
export default FindSinger;