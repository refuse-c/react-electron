/*
 * @Author: RA
 * @Date: 2020-04-01 17:12:40
 * @LastEditTime: 2020-04-03 17:35:34
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import Menu from '../../components/menu';
import Info from '../../components/info';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { routes } = this.props;
    return (
      <div className="home">
        <Menu />
        <Info routes={routes} />
      </div >
    );
  }
}


export default Home;