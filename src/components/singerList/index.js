/*
 * @Author: RA
 * @Date: 2020-05-01 22:18:42
 * @LastEditTime: 2020-06-09 09:05:25
 * @LastEditors: refuse_c
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
                    <div>
                      <img src={imgParam(item.img1v1Url, 150, 150)} alt="" />
                    </div>
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
