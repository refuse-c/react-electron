/*
 * @Author: RA
 * @Date: 2020-05-01 14:34:45
 * @LastEditTime: 2020-05-07 00:19:59
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';

import { loginTel, musicList } from '../../api/api';
import { RAGet } from '../../api/netWork';
import './index.scss';
import { formatTel, isMobileNumber } from '../../common/utils/format';

// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainUserInfo, isSHowLogin, isLogin, gainMenuList } from '../../store/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '13272946536',
      pwd: 'Wangyi123'
    }
  }
  componentDidMount = () => {

  }
  inputKeyPress = e => {
    const name = e.target.name;
    let inputVal = e.target.value;
    switch (name) {
      case 'tel':
        const val = formatTel(inputVal);
        this.tel.value = val;
        this.setState({ tel: val })
        break;
      case 'pwd':
        this.pwd.value = inputVal;
        this.setState({ pwd: inputVal })
        break;
      default: break;
    }
  }
  loginSubmit = () => {
    const { tel, pwd } = this.state;
    const phone = tel.replace(/\s+/g, "");
    if (!isMobileNumber(phone)) {
      console.log('您输入的手机号有误,请修改!'); return;
    }
    if (pwd.length < 6) {
      console.log('密码不能低于6位!'); return;
    }
    this.getUserInfo(phone, pwd);
  }
  getUserInfo = (phone, pwd) => {
    RAGet(loginTel.api_url, {
      params: {
        phone: phone,
        password: pwd
      }
    }).then(res => {
      console.log(res)
      if (res.code !== 200) return;
      let userInfo = {};
      userInfo.account = res.account;
      userInfo.token = res.token;
      userInfo.profile = res.profile;
      userInfo.bindings = res.bindings;
      const userId = res.profile.userId;
      const nickname = res.profile.nickname;
      this.props.gainUserInfo(userInfo);
      this.props.isSHowLogin(false);
      this.props.isLogin(true);
      this.getMusicList(userId, nickname);
    }).catch(err => {
      console.log(err)
    })
  }
  getMusicList = (id, nickname) => {
    const { menuList } = this.props;
    RAGet(musicList.api_url, {
      params: {
        uid: id,
      }
    }).then(res => {
      if (res.code === 200) {
        res.playlist.map((item, index) => {
          item.path = '/home/list';
          item.icon = 'default';
          if (item.privacy !== 10) {
            if (item.userId === Number(id)) {
              let index = menuList.findIndex((item) => { return item.name === '收藏的歌单' })
              item.name = item.name.replace(nickname, '我');
              menuList.splice(index, 0, item);
            }
            if (item.userId !== Number(id)) {
              let index = menuList.findIndex((item) => { return item.name === '收藏的歌单' })
              menuList.splice(index + 2, 0, item);
            }
          }
          return index.id
        })
        this.props.gainMenuList(menuList);
      }

    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    return (
      <div className="login">
        <div className="login-title">欢迎使用EMusic</div>
        <ul className="login-form">
          <li>
            <input
              className="icon-tel"
              type="text"
              name="tel"
              placeholder="请输入手机号"
              maxLength="13"
              onInput={this.inputKeyPress}
              ref={tel => this.tel = tel}
            />
          </li>
          <li>
            <input
              className="icon-pwd"
              type="password"
              name="pwd"
              placeholder="请输入密码"
              maxLength="16"
              onInput={this.inputKeyPress}
              ref={pwd => this.pwd = pwd}
            />
          </li>
          <li>
            <button
              onClick={this.loginSubmit}
              type="submit">登录</button>
          </li>
        </ul>
      </div>
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    userInfo: state.userInfo,
    menuList: state.menuList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isSHowLogin: bindActionCreators(isSHowLogin, dispatch),
    isLogin: bindActionCreators(isLogin, dispatch),
    gainUserInfo: bindActionCreators(gainUserInfo, dispatch),
    gainMenuList: bindActionCreators(gainMenuList, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);