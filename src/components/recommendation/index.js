/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-05-20 16:33:44
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';
import { recommendList, privatecontent, getBanner } from '../../api/api';
import { RAGet } from '../../api/netWork';
import { imgParam, getDate } from '../../common/utils/format';
class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannersData: {},
      recommendListData: {},
      privatecontentData: {},
      bannerActive: 1
    }
  }
  componentDidMount = () => {
    this.getBanner();
    this.getRecommendList();
    this.getPrivatecontentList();
  }
  getBanner = () => {
    RAGet(getBanner.api_url, {
      params: { type: 0 }
    }).then(res => {
      const bannersData = res.banners;
      this.setState({ bannersData })
    }).catch(err => {
      console.log(err)
    })
  }
  getRecommendList = () => {
    const recommended = {
      name: '每日推荐音乐',
      day: getDate('day'),
      week: getDate('week'),
      picUrl: require('../../common/images/transparent.jpg'),
      copywriter: '根据您的音乐口味生成每日推荐',
      custom: 1
    }
    RAGet(recommendList.api_url, {
      params: {
        limit: 9
      }
    })
      .then(res => {
        const recommendListData = res.result;
        recommendListData.unshift(recommended);
        if (recommendListData.length >= 10) {
          recommendListData.length = 10;
        }
        this.setState({ recommendListData })
      }).catch(err => {
        console.log(err)
      })
  }
  getPrivatecontentList = () => {
    RAGet(privatecontent.api_url, {})
      .then(res => {
        const privatecontentData = res.result;
        this.setState({ privatecontentData })
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    const { bannersData, recommendListData, privatecontentData } = this.state;
    console.log(bannersData)
    return (
      <div className="recommendation">
        <div className="recommend-banner">
          <ul>
            {
              bannersData.length > 0 && bannersData.map((item, index) => {
                return (
                  <li key={index}>
                    <img src={imgParam(item.imageUrl, 700, 200)} alt="" />
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="recommend-title">
          <p>推荐歌单</p>
          <p>更多></p>
        </div>
        <div className="recommend-list">
          <ul>
            {
              recommendListData.length > 0 && recommendListData.map((item, index) => {
                const path = '/home/single';
                const dailySpecial = '/home/dailySpecial';
                return (
                  item.custom === 1 ?
                    <NavLink to={dailySpecial} key={index} >
                      <li >
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
                    :
                    <NavLink to={path + item.id} key={index} >
                      <li >
                        <img src={imgParam(item.picUrl, 160, 160)} alt="" />
                        <p>{item.name}</p>
                      </li>
                    </NavLink>
                )
              })
            }
          </ul>
        </div>
        <div className="recommend-title">
          <p>独家放送</p>
          <p>更多></p>
        </div>
        <div className="privatecontent-list">
          <ul>
            {
              privatecontentData.length > 0 && privatecontentData.map((item, index) => {
                const path = '/home/single';
                return (
                  <NavLink to={path + item.id} key={index} >
                    <li >
                      <img src={imgParam(item.picUrl, 330, 190)} alt="" />
                      <p>{item.name}</p>
                    </li>
                  </NavLink>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Recommendation;