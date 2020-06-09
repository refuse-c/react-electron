/*
 * @Author: RA
 * @Date: 2020-04-01 17:12:40
 * @LastEditTime: 2020-06-09 15:46:03
 * @LastEditors: refuse_c
 * @Description: 右侧框架页
 */
import React, { Component } from 'react';
import './index.scss';
import Menu from '../../components/menu';
import Info from '../info';
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