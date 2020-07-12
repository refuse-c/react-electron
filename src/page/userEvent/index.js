/*
 * @Author: REFUSE_C
 * @Date: 2020-07-10 17:43:17
 * @LastEditors: RA
 * @LastEditTime: 2020-07-10 19:34:52
 * @Description:用户动态
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { userEvent } from '../../api/api';
import Event from '../../components/event';
import ScrollView from 'react-custom-scrollbars';

class UserEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
    };
  }
  componentDidMount = () => {
    const id = window.location.href.split('userevent')[1];
    this.getUserEvent(id);
  };
  getUserEvent = (id) => {
    RAGet(userEvent.api_url, {
      params: {
        uid: id,
      },
    }).then((res) => {
      const eventList = res.events;
      this.setState({ eventList });
    });
  };
  render() {
    const { eventList } = this.state;
    return (
      <div className="user-event">
        <ScrollView onScroll={this.onScroll}>
          {<Event data={eventList} history={this.props.history} />}
        </ScrollView>
      </div>
    );
  }
}

export default UserEvent;
