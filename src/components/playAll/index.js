/*
 * @Author: RA
 * @Date: 2020-05-17 15:20:33
 * @LastEditTime: 2020-09-19 13:45:01
 * @LastEditors: REFUSE_C
 * @Description: 播放全部组件
 */
import React, { Component } from 'react';
import './index.scss';

// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  gainPlayList,
  gainMusicId,
  setIsPlay,
  setIndex,
} from '../../store/actions';
import { message } from 'antd';
class PlayAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  playAll = () => {
    const { list } = this.props;
    if (list && list.length > 0) {
      this.props.setIndex(0);
      this.props.setIsPlay(true);
      this.props.gainPlayList(list);
      this.props.gainMusicId(list[0].id);
    } else {
      message.destroy();
      message.error('当前列表还未就绪,请稍后再试!');
    }
  };
  render() {
    const { cls, text, list, type } = this.props;
    return (
      <div>
        {list && list.length > 0 && type !== -1 ? (
          <button className={cls} onClick={this.playAll}>
            {text || ''}
          </button>
        ) : (
            <button className={`button-disabled `}>{text || ''}</button>
          )}
      </div>
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gainPlayList: bindActionCreators(gainPlayList, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayAll);
