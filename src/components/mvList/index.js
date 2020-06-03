/*
 * @Author: REFUSE_C
 * @Date: 2020-06-03 09:52:21
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-03 10:56:13
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';

import { NavLink } from 'react-router-dom';
import { imgParam, formatPlaycount } from '../../common/utils/format';
class MvList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data, path } = this.props;
    return (
      <div className='mv_list'>
        <ul>
          {
            data.length > 0 && data.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  to={path + item.id}
                >
                  <li>
                    <span>{formatPlaycount(item.playCount)}</span>
                    <img src={imgParam(item.cover || item.picUrl, 240, 140)} alt="" />
                    <div>
                      <p className="overflow">{item.name}</p>
                      <p className="overflow">by {item.artistName}</p>
                    </div>
                  </li>
                </NavLink>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default MvList;