/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-14 16:00:12
 * @Description:朋友
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { event } from '../../api/api';
import ScrollView from 'react-custom-scrollbars';
import Event from '../../components/event';
// import { isEmpty } from '../../common/utils/format';

class Frind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
    };
  }
  componentDidMount = () => {
    this.getEvent();
  };
  getEvent = (id) => {
    this.setState({ eventList: [] });
    RAGet(event.api_url, {
      params: {
        uid: id,
      },
    }).then((res) => {
      const eventList = res.event;
      this.setState({ eventList });
    }).catch((err) => {
      // console.log(err)
    });
  };

  render() {
    const { eventList } = this.state;
    return (
      <div className="frind">
        <ScrollView onScroll={this.onScroll}>
          <div className="frind-top">
            <div className="headline">
              <p className="headline_title">动态</p>
              <p className="headline_more">写动态</p>
            </div>
          </div>
          {<Event data={eventList} history={this.props.history} />}
        </ScrollView>
      </div>
    );
  }
}
export default Frind;
