/*
 * @Author: RA
 * @Date: 2020-04-02 14:46:55
 * @LastEditTime: 2020-05-06 15:22:40
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isSHowLogin, gainUserInfo } from '../../store/actions';
const { ipcRenderer: ipc } = window.require('electron');
// const { ipcRenderer } = require('electron');
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  buttonClick = type => {
    ipc.send(type);
  };
  showLogin = () => {
    this.props.isSHowLogin(true);
  }
  render() {
    const { userInfo, isLogin } = this.props;
    return (
      <div className="header">
        <div className="left">EMusic</div>
        <div className="center">
          <ul>
            {isLogin ?
              <li >
                <img src={userInfo.account && userInfo.profile.avatarUrl} alt="" />
                {userInfo.account && userInfo.profile.nickname}
              </li>
              :
              <li onClick={this.showLogin}><img src="" alt="" />未登录</li>
            }
            <li>皮肤</li>
            <li>设置</li>
          </ul>

        </div>
        <div className="right">
          <div className="icons min" title="最小化" onClick={e => this.buttonClick('min', e)}></div>
          <div className="icons max" title="最大化" onClick={e => this.buttonClick('max', e)}></div>
          <div className="icons close" title="关闭" onClick={e => this.buttonClick('close', e)}></div>
        </div>
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    showLogin: state.showLogin,
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isSHowLogin: bindActionCreators(isSHowLogin, dispatch),
    gainUserInfo: bindActionCreators(gainUserInfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);