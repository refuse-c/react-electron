/*
 * @Author: RA
 * @Date: 2020-04-01 17:12:40
 * @LastEditTime: 2020-06-01 20:20:04
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
import {
  gainMusicList,
  setShowPopStatus,
  setToolsStatus,
} from '../../store/actions';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //点击区域外掩藏
  handleHide = () => {
    const { showPlop, toolStatus } = this.props;
    this.props.setToolsStatus(false);
    if (showPlop) {
      this.props.setShowPopStatus('');
    }
    if (toolStatus) {
      
    }
  };
  render() {
    const { showLogin, routes, showPlop } = this.props;
    return (
      <div className="index">
        <div onClick={this.handleHide}>
          {showLogin ? <Login /> : null}
          <Header {...this.props} />
          {routes.map((route, key) => {
            return (
              <Route
                key={key}
                path={route.path}
                render={(props) => (
                  <route.component {...props} routes={route.routes} />
                )}
              />
            );
          })}
        </div>
        <Footer {...this.props} />
        {showPlop === 'play_list' ? <PlayList {...this.props} /> : null}
      </div>
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    showLogin: state.showLogin,
    showPlop: state.showPlop,
    toolStatus: state.toolStatus,
    setShowPopStatus: state.setShowPopStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
    setShowPopStatus: bindActionCreators(setShowPopStatus, dispatch),
    setToolsStatus: bindActionCreators(setToolsStatus, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
