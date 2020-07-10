/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-10 17:58:34
 * @Description:朋友
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { event } from '../../api/api';
import ScrollView from 'react-custom-scrollbars';
import Event from '../../components/event';
import { isEmpty } from '../../common/utils/format';


// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  gainMusicList,
  setIndex,
  gainPlayList,
  setIsPlay,
  gainMusicId,
  setToolsStatus,
} from '../../store/actions';
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

  //播放
  handlePlay = (item, e) => {
    console.log(e, item)
    const { playList } = this.props;
    const array = JSON.parse(JSON.stringify(playList));
    let flag = null;
    array.forEach((element, index) => {
      if (element.id === item.id) {
        flag = index;
        return false;
      }
    });
    if (!isEmpty(flag)) {
      this.props.setIndex(flag);
      flag = null;
    } else {
      array.unshift(item);
      this.props.gainPlayList(array);
    }
    this.props.setIsPlay(true);
    this.props.gainMusicId(item.id);
    this.props.setToolsStatus(false);
    e.stopPropagation();
  };



  render() {
    const { eventList } = this.state;
    return (
      <div className="frind">
        <ScrollView onScroll={this.onScroll}>
          <div className="headline">
            <p className="headline_title">动态</p>
            <p className="headline_more" >写动态</p>
          </div>
          {
            <Event data={eventList} />
          }
        </ScrollView>
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    musicList: state.musicList,
    playList: state.playList,
    musicId: state.musicId,
    index: state.index,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
    gainPlayList: bindActionCreators(gainPlayList, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    setToolsStatus: bindActionCreators(setToolsStatus, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Frind);