/*
 * @Author: REFUSE_C
 * @Date: 2020-07-10 17:43:17
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-10 17:47:22
 * @Description:用户动态
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { userEvent } from '../../api/api';
class UserEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount = () => {
    const id = window.location.href.split('userevent')[1];
    this.getUserEvent(id)
  }
  getUserEvent = id => {
    RAGet(userEvent.api_url, {
      params: {
        uid: id
      }
    }).then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <div className="user-event">userEvent</div>
    );
  }
}

export default UserEvent;
