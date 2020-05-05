/*
 * @Author: RA
 * @Date: 2020-05-01 22:18:42
 * @LastEditTime: 2020-05-01 22:30:59
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { imgParam } from '../../common/utils/format';
class Singer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data } = this.props;
    console.log(data)
    return (
      <div className="singer">
        {/* img1v1Url  picUrl name*/}
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

      </div>
    );
  }
}

export default Singer;