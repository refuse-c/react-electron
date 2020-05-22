/*
 * @Author: RA
 * @Date: 2020-05-01 22:18:42
 * @LastEditTime: 2020-05-22 16:39:35
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { imgParam, isArrays } from '../../common/utils/format';
import Empty from '../../components/empty';
class Singer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data } = this.props;
    return (
      <div className="singer">

        {
          isArrays(data) ?
            <ul>
              {
                data.map((item, index) => {
                  return (
                    <li key={index}>
                      <img src={imgParam(item.img1v1Url, 50, 50)} alt="" />
                      <p>{item.name}</p>
                    </li>
                  )
                })
              }
            </ul>
            :
            <Empty />
        }
      </div>
    );
  }
}

export default Singer;