/*
 * @Author: RA
 * @Date: 2020-04-02 11:14:28
 * @LastEditTime: 2020-05-07 00:02:43
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { formatPlayTime } from '../../common/utils/format';
// store 
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { gainMusicList, gainMusicId, gainPlayLIst } from '../../store/actions';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0
    }
  }
  componentDidMount = () => {
    // this.setState({ currentTime: this.input.value })
  }
  gotoPlayer = () => {
    this.props.history.push({ pathname: '/player' })
  }
  changeInput = () => {
    this.setState({ currentTime: this.input.value })
  }
  render() {
    const { currentTime } = this.state;
    const { musicId } = this.props;
    console.log(musicId)
    return (
      <div className="footer">
        <div className="control">
          <img onClick={this.gotoPlayer} src="https://p1.music.126.net/cm7rMj_I2qHwKyB2gRsauA==/109951163667867598.jpg?param=300y300" alt="" />
          <i className="icon_prev"></i>
          <i className="icon_play"></i>
          <i className="icon_next"></i>
        </div>
        <div className="progress">
          <div className="progress_time">
            <p>{formatPlayTime(currentTime)}</p>
            <p>05:36</p>
          </div>
          <input onInput={this.changeInput} ref={input => this.input = input} type="range" min="0" max="1000" />
        </div>
        <div className="tools">
          <i className="icon_unlike icon_like"></i>
          <i className="icon_order"></i>
          <i className="icon_volume icon_mute"></i>
          <i className="icon_list"></i>
        </div>
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  console.log(state)
  return {
    musicId: state.musicId,
    playList: state.playList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);