/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-09 17:56:39
 * @Description:朋友
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { event } from '../../api/api';
import { imgParam, formatDate, isEmpty } from '../../common/utils/format';
class Frind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: []
    }
  }
  componentDidMount = () => {
    this.getEvent();
  }
  getEvent = (id) => {
    RAGet(event.api_url, {
      params: {
        uid: id
      }
    }).then(res => {
      const eventList = res.event;
      this.setState({ eventList })
      console.log(res.event)
    }).catch(err => {
      // console.log(err)
    })
  }
  // accountStatus: 0
  // authStatus: 0
  // authority: 0
  // avatarImgId: 109951164344922300
  // avatarImgIdStr: "109951164344922304"
  // avatarImgId_str: "109951164344922304"
  // avatarUrl: "http://p1.music.126.net/PMUlB_oPaBTSohet77NdQQ==/109951164344922304.jpg"
  // backgroundImgId: 109951165030663170
  // backgroundImgIdStr: "109951165030663174"
  // backgroundUrl: "http://p1.music.126.net/NM7lmyqtR1WvnmDY2f93rw==/109951165030663174.jpg"
  // birthday: 813859200000
  // city: 500101
  // defaultAvatar: false
  // description: ""
  // detailDescription: ""
  // djStatus: 0
  // expertTags: null
  // experts: null
  // followed: false
  // followeds: 4
  // gender: 1
  // mutual: false
  // nickname: "REFUSE_C"
  // province: 500000
  // remarkName: null
  // signature: "一枚前端单身汪..."
  // urlAnalyze: false
  // userId: 287070050
  // userType: 0
  render() {
    const { eventList } = this.state;
    return (
      <div className="frind">
        <div className="headline">
          <p className="headline_title">动态</p>
          <p className="headline_more" >写动态</p>
        </div>
        <div className="friend-event">
          <ul>
            {
              eventList && eventList.length > 0 && eventList.map((item, index) => {
                const jsonData = JSON.parse(item.json)
                console.log(jsonData)
                return (
                  <li key={index}>
                    <div>
                      <img src={imgParam(item.user && item.user.avatarUrl, 40, 40)} alt="" />
                      <div>
                        <p>{item.user && item.user.nickname}</p>
                        <p>{formatDate(item.eventTime)}</p>
                      </div>
                    </div>
                    {
                      !isEmpty(jsonData && jsonData.msg)
                        ? <div>{jsonData.msg}</div>
                        : ''
                    }
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

export default Frind;