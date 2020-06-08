/*
 * @Author: RA
 * @Date: 2020-05-01 22:18:42
 * @LastEditTime: 2020-06-08 19:59:05
 * @LastEditors: RA
 * @Description: 检索页歌手组件
 */
import React, { Component } from 'react';
import './index.scss';
import { imgParam, isArrays } from '../../common/utils/format';
import Empty from '../../components/empty';
import { NavLink } from 'react-router-dom';

class Singer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSingerDetail = (item) => {
    const { history } = this.props;
    history.push({ pathname: `/home/singerdetail${item.id}` });
  };
  render() {
    const { data, type } = this.props;
    return (
      <div className="singer">
        {isArrays(data) ? (
          <ul className={type ? 'across' : 'vertical'}>
            {data.map((item, index) => {
              return (
                <NavLink to={`/home/singerdetail${item.id}`} key={index}>
                  <li>
                    <img src={imgParam(item.img1v1Url, 120, 120)} alt="" />
                    <p>{item.name}</p>
                  </li>
                </NavLink>
              );
            })}
          </ul>
        ) : (
          <Empty />
        )}
      </div>
    );
  }
}

export default Singer;
