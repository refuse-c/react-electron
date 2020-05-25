/*
 * @Author: RA
 * @Date: 2020-05-17 15:20:33
 * @LastEditTime: 2020-05-25 20:25:14
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';

// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainPlayLIst, gainMusicId, setIsPlay, setIndex } from '../../store/actions';
import { isEmpty } from '../../common/utils/format';
class PlayAll extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  playAll = () => {
    const { list } = this.props;
    if (isEmpty(list)) return;
    this.props.setIndex(0);
    this.props.setIsPlay(true);
    this.props.gainPlayLIst(list);
    this.props.gainMusicId(list[0].id);
  }
  render() {
    const { cls, text } = this.props;
    return (
      <div
        className={cls}
        onClick={this.playAll}
      >
        {text || ''}

      </div>
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
    gainPlayLIst: bindActionCreators(gainPlayLIst, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayAll);