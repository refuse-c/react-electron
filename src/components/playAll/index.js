/*
 * @Author: RA
 * @Date: 2020-05-17 15:20:33
 * @LastEditTime: 2020-06-04 10:22:40
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';

// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainPlayList, gainMusicId, setIsPlay, setIndex } from '../../store/actions';
import { isEmpty } from '../../common/utils/format';
import { message } from 'antd';
class PlayAll extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  playAll = () => {
    const { list } = this.props;
    if (isEmpty(list)) {
      message.destroy();
      message.error('当前列表还未就绪,请稍后再试!')
      return;
    };
    this.props.setIndex(0);
    this.props.setIsPlay(true);
    this.props.gainPlayList(list);
    this.props.gainMusicId(list[0].id);
  }
  render() {
    const { cls, text } = this.props;
    return (
      <button
        className={cls}
        onClick={this.playAll}
      >
        {text || ''}

      </button>
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gainPlayList: bindActionCreators(gainPlayList, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayAll);