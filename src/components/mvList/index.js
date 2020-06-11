/*
 * @Author: REFUSE_C
 * @Date: 2020-06-03 09:52:21
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-11 15:02:24
 * @Description:视频->NV->list
 */
import React, { Component } from 'react';
import './index.scss';

import { NavLink } from 'react-router-dom';
import { imgParam, formatPlaycount, isEmpty } from '../../common/utils/format';
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
                  to={path + (item.id || item.vid)}
                >
                  <li>
                    <div>
                      <span>{formatPlaycount(item.playCount || item.praisedCount)}</span>
                      <img src={imgParam(item.cover || item.coverUrl || item.picUrl, 240, 134)} alt="" />
                    </div>
                    <p className="overflow mv_ti">{item.name || item.title}</p>
                    {
                      !isEmpty(item.artistName)
                        ? <p className="overflow mv_by">by {item.artistName}</p>
                        : ''
                    }
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