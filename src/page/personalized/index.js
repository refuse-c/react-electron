/*
 * @Author: REFUSE_C
 * @Date: 2020-06-03 16:36:17
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-03 16:43:49
 * @Description:独家放送
 */
import React, { Component } from 'react';
import { RAGet } from '../../api/netWork';
import { privatecontent } from '../../api/api';
class Personalized extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount = () => {
    this.getPersonalized();
  }
  getPersonalized = () => {
    RAGet(privatecontent.api_url)
      .then(res => {
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <div className="personalized">独家放送</div>
    );
  }
}

export default Personalized;