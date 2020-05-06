/*
 * @Author: RA
 * @Date: 2020-04-01 17:12:40
 * @LastEditTime: 2020-05-06 18:45:08
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Login from '../login';
import { Route } from 'react-router-dom';

// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainMusicList } from '../../store/actions';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loginShow: true
    }
  }
  render() {
    const { showLogin, routes } = this.props;
    return (
      <div className="index">
        {
          showLogin ? <Login /> : null
        }
        <Header />
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
        {/* <Redirect to="/home" /> */}
        <Footer {...this.props} />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);