/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 16:29:50
 * @LastEditors: RA
 * @LastEditTime: 2020-05-07 12:33:03
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
// store
import { connect } from 'react-redux';
// import { RAGet } from '../../api/netWork';
// import { getMusicUrl } from '../../api/api';
// import { bindActionCreators } from 'redux';
// import { gainUserInfo, isSHowLogin, isLogin, gainMenuList } from '../../store/actions';
class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { musicId } = this.props;
    console.log(musicId)
    return (
      <div className="Audio">
        <audio
          autoPlay
          ref={ref => (this.audio = ref)}
          src={`https://music.163.com/song/media/outer/url?id=${musicId}`}
        >
        </audio>
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    musicId: state.musicId,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {}
// }
export default connect(mapStateToProps)(Audio);