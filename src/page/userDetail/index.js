/*
 * @Author: REFUSE_C
 * @Date: 2020-07-08 10:43:20
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-09 17:17:28
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import ScrollView from 'react-custom-scrollbars';
import { RAGet } from '../../api/netWork';
import { userDetail, musicList } from '../../api/api';
import List from '../../components/list';
import { imgParam } from '../../common/utils/format';
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      createList: [],
      collectList: []
    }
  }
  componentDidMount = () => {
    const id = window.location.href.split('userdetail')[1];
    // 287070050    1841631599
    this.getUserDetail(id)
    this.getmusicList(id)
  }
  getUserDetail = (id) => {
    RAGet(userDetail.api_url, {
      params: {
        uid: id
      }
    }).then(res => {
      const userData = res;
      this.setState({ userData })
    }).catch(err => {
      // console.log(err)
    })
  }
  getmusicList = (id) => {
    RAGet(musicList.api_url, {
      params: {
        uid: id
      }
    }).then(res => {
      let createList = [];
      let collectList = [];
      res.playlist.map((item, index) => {
        item.path = '/home/single';
        item.icon = 'default';
        if (item.privacy !== 10) {
          if (item.userId === Number(id)) {
            createList.push(item)
          } else {
            collectList.push(item)
          }
        }
        return index.id;
      });
      this.setState({
        createList,
        collectList
      })
    }).catch(err => {
      // console.log(err)
    })
  }

  render() {
    const { userData, createList, collectList } = this.state;
    return (
      <div className="user-detail">
        <ScrollView onScroll={this.onScroll}>
          <div className="user-content">
            <div className="user-header">
              <img src={imgParam(userData.profile && userData.profile.avatarUrl, 200, 200)} alt="" />
              <div className="user-info">
                <div className="user-info-top">
                  <p className="user-nickname">{userData.profile && userData.profile.nickname}</p>
                  {
                    userData.profile && userData.profile.vipType !== 0
                      ? <img className="vip-img" src={require('../../common/images/bcv.png')} alt="" />
                      : ''
                  }
                  {
                    userData.profile && userData.profile.gender === 1
                      ? <img className="gender-img" src={require('../../common/images/man.png')} alt="" />
                      : userData.profile && userData.profile.gender === 2
                        ? <img className="gender-img" src={require('../../common/images/woman.png')} alt="" />
                        : ''
                  }
                  <p className='user-level'> Lv{userData.level}</p>
                </div>
                <ul className="user-info-list">
                  <li>
                    <p>{userData.profile && userData.profile.eventCount}</p>
                    <p>动态</p>
                  </li>
                  <li>
                    <p>{userData.profile && userData.profile.newFollows}</p>
                    <p>关注</p>
                  </li>
                  <li>
                    <p>{userData.profile && userData.profile.followeds}</p>
                    <p>粉丝</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="user-list">
              {
                createList && createList.length > 0
                  ? <h2>歌单({createList.length})</h2>
                  : ''
              }
              <List data={createList} type={true} />
              {
                collectList && collectList.length > 0
                  ? <h2>收藏({collectList.length})</h2>
                  : ''
              }
              <List data={collectList} type={true} />
            </div>
          </div>
        </ScrollView>

      </div >
    );
  }
}

export default UserDetail;