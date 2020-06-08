/*
 * @Author: RA
 * @Date: 2020-05-01 22:18:42
 * @LastEditTime: 2020-06-08 17:04:05
 * @LastEditors: refuse_c
 * @Description: 检索页歌手组件
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
  handleSingerDetail = (item) => {
    const { history } = this.props;
    history.push({ pathname: `/home/singerdetail${item.id}` });
  };
  render() {
    const { data, type } = this.props;
    return (
      <div className="singer">

        {
          isArrays(data) ?
            <ul className={type ? 'across' : 'vertical'}>
              {
                data.map((item, index) => {
                  return (
                    <li onClick={this.handleSingerDetail.bind(this, item)}
                      key={index}
                    >
                      <img src={imgParam(item.img1v1Url, 120, 120)} alt="" />
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