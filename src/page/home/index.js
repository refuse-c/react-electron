/*
 * @Author: RA
 * @Date: 2020-04-01 17:12:40
 * @LastEditTime: 2020-04-02 21:24:00
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import Menu from '../../components/menu';
import Info from '../../components/info';
import Footer from '../../components/footer';
import Header from '../../components/header';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { routes } = this.props;
    return (
      <div className="home">
        <Header />
        <div className="container">
          <Menu />
          <Info routes={routes} />
        </div>
        <Footer />
      </div>
    );
  }
}


export default Home;