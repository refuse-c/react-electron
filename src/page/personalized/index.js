/*
 * @Author: REFUSE_C
 * @Date: 2020-06-03 16:36:17
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-05 16:23:59
 * @Description:独家放送
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { privatecontentList } from '../../api/api';
import Exclusive from '../../components/exclusive';
import ScrollArea from 'react-scrollbar';
class Personalized extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 60,
      offset: 0,
      area: '全部',
      exclusiveList: {}
    }
  }
  componentDidMount = () => {
    const { limit, offset, area } = this.state;
    this.getPersonalized(limit, offset, area);
  }
  getPersonalized = (limit, offset, area) => {
    RAGet(privatecontentList.api_url, {
      params: {
        limit: limit,
        offset: offset,
        area: area
      }
    }).then(res => {
      let obj = {};
      const { exclusiveList } = this.state;
      if (exclusiveList.list) {
        obj.list = exclusiveList.list.concat(res.result);
      } else {
        obj.list = res.result;
      }
      obj.more = res.more;
      this.setState({ exclusiveList: obj });
    }).catch(err => {
      console.log(err)
    })
  }
  handleMore = () => {
    const {
      limit,
      offset,
    } = this.state;
    let offsets = offset + limit;
    this.setState({ offset: offsets });
    this.getPersonalized(limit, offsets);
  };
  render() {
    const { exclusiveList: list } = this.state;
    return (
      <div className="personalized">
        <ScrollArea
          speed={1}
          className="area"
          ref={ref => (this.content = ref)}
        >
          <div className="headline">
            <p className="headline_title">独家放送</p>
            <ul>目前独家放送只支持视频播放,其他均不支持</ul>
          </div>
          {
            list && list.list
              ? <Exclusive history={this.props.history} data={list.list} />
              : null
          }
          {list.more === true ? (
            <span className="load_more" onClick={this.handleMore}>
              点我加载更多喔,不信你试试 ꒰⑅•ᴗ•⑅꒱
            </span>
          ) : list.more === false ? (
            <span className="load_more" onClick={this.handleMore}>没有更多的啦,不要划了(＞﹏＜)</span>
          ) : null}
        </ScrollArea>
      </div>
    );
  }
}

export default Personalized;