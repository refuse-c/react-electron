/*
 * @Author: RA
 * @Date: 2020-04-02 14:46:55
 * @LastEditTime: 2020-07-02 13:25:57
 * @LastEditors: refuse_c
 * @Description: 头部
 */
import React, { Component } from 'react';
import './index.scss';
// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isSHowLogin, gainMenuList } from '../../store/actions';
import { RAGet } from '../../api/netWork';
import { musicList, loginStatus } from '../../api/api';
import { isEmpty } from '../../common/utils/format';
// const { ipcRenderer: ipc } = window.require('electron');
// const { ipcRenderer } = require('electron');

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: '',
      initpathname: '',
      endUrl: '',
      forwardState: false
    };
  }
  componentDidMount = () => {
    const initpathname = this.props.history.location.pathname;
    this.setState({ initpathname });
    if (isEmpty(this.props.userInfo.profile)) return;
    this.getLoginStatus();
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const { pathname } = nextProps.history.location;
    const endUrl = nextProps.history.location.pathname;
    if (nextProps.history.action === "PUSH") {
      return {
        endUrl,
        props: {
          endUrl: endUrl,
        },
      };
    }
    if (pathname !== prevState.pathname) {
      return {
        pathname,
        props: {
          pathname: pathname,
        },
      };
    }
    return null;
  }

  buttonClick = (type) => {
    console.log(type);
    // ipc.send(type);
  };
  showLogin = () => {
    this.props.isSHowLogin(true);
  };
  openIm = () => {
    this.props.history.push({ pathname: '/im' });
  };
  getLoginStatus = () => {
    RAGet(loginStatus.api_url, {})
      .then((res) => {
        if (res.code !== 200) return;
        const { userId, nickname } = res.profile;
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
  goBack = () => {
    this.props.history.goBack();
    this.setState({ forwardState: true })
  }
  goForward = () => {
    const { endUrl } = this.state;
    const nowUrl = window.location.href.split('#')[1];
    if (endUrl === nowUrl) {
      this.setState({ forwardState: false })
    }
    this.props.history.goForward();
  }
  render() {
    const { userInfo, isLogin } = this.props;
    const { pathname, initpathname, forwardState } = this.state;
    return (
      <div className="header">
        {pathname !== initpathname ? (
          <div
            className="header-back"
            onClick={this.goBack}
          ></div>
        ) : null}
        {
          forwardState ? (
            <div
              className="header-forward"
              onClick={this.goForward}
            ></div>
          ) : null}
        <div className="left">EMusic</div>
        <div className="center">
          <ul>
            {isLogin || (userInfo.account && userInfo.profile) ? (
              <li>
                <img
                  src={userInfo.account && userInfo.profile.avatarUrl}
                  alt=""
                />
                {userInfo.account && userInfo.profile.nickname}
              </li>
            ) : (
                <li onClick={this.showLogin}>未登录</li>
              )}
            <li>皮肤</li>
            <li>设置</li>
            <li onClick={this.openIm}>IM</li>
          </ul>
        </div>
        <div className="right">
          <div
            className="icons min"
            title="最小化"
            onClick={(e) => this.buttonClick('min', e)}
          ></div>
          <div
            className="icons max"
            title="最大化"
            onClick={(e) => this.buttonClick('max', e)}
          ></div>
          <div
            className="icons close"
            title="关闭"
            onClick={(e) => this.buttonClick('close', e)}
          ></div>
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
    menuList: state.menuList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isSHowLogin: bindActionCreators(isSHowLogin, dispatch),
    gainMenuList: bindActionCreators(gainMenuList, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
