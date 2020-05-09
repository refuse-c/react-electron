/*
 * @Author: RA
 * @Date: 2020-04-01 17:12:40
 * @LastEditTime: 2020-05-09 12:36:27
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import Footer from '../../components/footer';
import Header from '../../components/header';
import PlayList from '../../components/playList';

import Login from '../login';
import { Route } from 'react-router-dom';

// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainMusicList, setPlayListStatus } from '../../store/actions';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loginShow: true
    }
  }
  //点击区域外掩藏
  handleHide = () => {
    const { showPlayList } = this.props;
    if (showPlayList) {
      this.props.setPlayListStatus(false);
    }

  }
  render() {
    const { showLogin, routes, showPlayList } = this.props;
    return (
      <div className="index">
        <div onClick={this.handleHide}>
          {
            showLogin ? <Login /> : null
          }
          <Header {...this.props} />
          {
            routes.map((route, key) => {
              if (route.exact) {
                return <Route key={key} exact path={route.path}
                  render={props => (
                    <route.component {...props} routes={route.routes} />
                  )}
                />
              } else {
                return <Route key={key} path={route.path}
                  render={props => (
                    <route.component {...props} routes={route.routes} />
                  )}
                />

              }
            })
          }
        </div>
        <Footer {...this.props} />
        {
          showPlayList ? <PlayList {...this.props} /> : null
        }

        <div className="inner"></div>
      </div >
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    showLogin: state.showLogin,
    showPlayList: state.showPlayList,
    setPlayListStatus: state.setPlayListStatus,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
    setPlayListStatus: bindActionCreators(setPlayListStatus, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);