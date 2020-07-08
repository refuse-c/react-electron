/*
 * @Author: REFUSE_C
 * @Date: 2020-07-08 10:43:20
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-08 17:15:59
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
    this.getUserDetail(1841631599)
    this.getmusicList(1841631599)
  }
  getUserDetail = (id) => {
    RAGet(userDetail.api_url, {
      params: {
        uid: id
      }
    }).then(res => {
      const userData = res;
      console.log(userData)
      this.setState({ userData })
    }).catch(err => {
      console.log(err)
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
      console.log(err)
    })
  }

  render() {
    const { userData, createList, collectList
    } = this.state;
    console.log(userData.profile)
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
                    userData.profile && userData.profile.gender === 1
                      ? <img src={require('../../common/images/man.png')} alt="" />
                      : userData.profile && userData.profile.gender === 2
                        ? <img src={require('../../common/images/woman.png')} alt="" />
                        : ''
                  }
                  <p className='user-level'> Lv{userData.level}</p>
                </div>
              </div>
            </div>
            <h2>歌单</h2>
            <List data={createList} type={true} />
            <h2>收藏</h2>
            <List data={collectList} type={true} />
          </div>
        </ScrollView>

      </div >
    );
  }
}

export default UserDetail;