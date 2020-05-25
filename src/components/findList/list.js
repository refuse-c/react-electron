/*
 * @Author: REFUSE_C
 * @Date: 2020-05-25 13:46:36
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-05-25 18:04:21
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { data } = this.props;
    console.log(data)
    return (
      <div className="all_list">
        <div className="lists">
          <p>全部歌单</p>
          {
            data.length > 0 && data.map((item, index) => {
              return (
                <div key={'list' + index}>
                  <h3>{item.title}</h3>
                  <ul>
                    {
                      item.array.map((item, index) => {
                        return (
                          <li key={'item' + index}>{item.name}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default List;