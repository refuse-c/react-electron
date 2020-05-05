/*
 * @Author: RA
 * @Date: 2020-04-01 17:12:40
 * @LastEditTime: 2020-05-01 22:04:15
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Login from '../login';
import { Route } from 'react-router-dom';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginShow: false
    }
  }
  render() {
    const { loginShow } = this.state;
    const { routes } = this.props;
    return (
      <div className="index">
        {
          loginShow ? <Login /> : null
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


export default Index;