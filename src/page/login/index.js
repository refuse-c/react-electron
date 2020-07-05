/*
 * @Author: RA
 * @Date: 2020-05-01 14:34:45
 * @LastEditTime: 2020-07-05 11:33:54
 * @LastEditors: RA
 * @Description: 登录页
 */
import React, { Component } from 'react';

import { loginTel, musicList } from '../../api/api';
import { RAGet } from '../../api/netWork';
import './index.scss';
import { formatTel, isMobileNumber, isEmpty } from '../../common/utils/format';

// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  gainUserInfo,
  isSHowLogin,
  isLogin,
  gainMenuList,
} from '../../store/actions';
import { message } from 'antd';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '18008523529',
      pwd: 'x123456',
      userInfo: {},
    };
  }
  componentDidMount = () => {
    // this.getMusicList(287070050)
  };
  inputKeyPress = (e) => {
    const name = e.target.name;
    let inputVal = e.target.value;
    switch (name) {
      case 'tel':
        const val = formatTel(inputVal);
        this.tel.value = val;
        this.setState({ tel: val });
        break;
      case 'pwd':
        this.pwd.value = inputVal;
        this.setState({ pwd: inputVal });
        break;
      default:
        break;
    }
  };
  loginSubmit = () => {
    const { tel, pwd } = this.state;
    const phone = tel.replace(/\s+/g, '');
    if (isEmpty(phone)) {
      message.destroy();
      message.error('请输入手机号!');
      return;
    }
    if (!isMobileNumber(phone)) {
      message.destroy();
      message.error('您输入的手机号有误!');
      return;
    }
    if (isEmpty(pwd)) {
      message.destroy();
      message.error('请输入密码!');
      return;
    }
    if (pwd.length < 6) {
      message.destroy();
      message.error('密码不能低于6位!');
      return;
    }
    this.getUserInfo(phone, pwd);
  };
  getUserInfo = (phone, pwd) => {
    RAGet(loginTel.api_url, {
      params: {
        phone: phone,
        password: pwd,
      },
    })
      .then((res) => {
        if (res.code !== 200) return;
        let userInfo = {};
        sessionStorage.setItem('token', res.token);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getMusicList = (id, nickname) => {
    const { menuList } = this.props;
    RAGet(musicList.api_url, {
      params: {
        uid: id,
      },
    })
      .then((res) => {
        if (res.code === 200) {
          res.playlist.map((item, index) => {
            item.path = '/home/single';
            item.icon = 'default';
            if (item.privacy !== 10) {
              if (item.userId === Number(id)) {
                const title = { name: '创建的歌单' };
                let index = menuList.findIndex((item) => {
                  return item.name === '创建的歌单';
                });
                if (index === -1) menuList.push(title);
                item.name = item.name.replace(nickname, '我');
                menuList.push(item);
              } else {
                const title = { name: '收藏的歌单' };
                let index = menuList.findIndex((item) => {
                  return item.name === '收藏的歌单';
                });
                if (index === -1) menuList.push(title);
                menuList.push(item);
              }
            }
            return index.id;
          });
          this.props.gainMenuList(menuList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  fork = () => {
    this.props.isSHowLogin(false);
  };
  render() {
    return (
      <div className="login">
        <i onClick={this.fork} className="fork"></i>
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
              ref={(tel) => (this.tel = tel)}
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
              ref={(pwd) => (this.pwd = pwd)}
            />
          </li>
          <li>
            <button onClick={this.loginSubmit} type="submit">
              登录
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    menuList: state.menuList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isSHowLogin: bindActionCreators(isSHowLogin, dispatch),
    isLogin: bindActionCreators(isLogin, dispatch),
    gainUserInfo: bindActionCreators(gainUserInfo, dispatch),
    gainMenuList: bindActionCreators(gainMenuList, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
