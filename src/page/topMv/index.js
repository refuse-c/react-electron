/*
 * @Author: REFUSE_C
 * @Date: 2020-06-12 09:42:42
 * @LastEditors: RA
 * @LastEditTime: 2020-07-01 23:38:51
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { mvTop } from '../../api/api';
import ScrollView from 'react-custom-scrollbars';
import { NavLink } from 'react-router-dom';
import {
  formatPlaycount,
  imgParam,
  formatDate,
  isEmpty,
} from '../../common/utils/format';

class AllMv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: ['内地', '港台', '欧美', '日本', '韩国'], //地区 不填则为全部
      areaText: '内地',
      topMvList: [],
      date: '',
    };
  }
  componentDidMount = () => {
    const { areaText } = this.state;
    this.getTopMv(areaText);
  };

  handleClick = (text) => {
    this.setState({ allMvList: [], areaText: text });
    this.getTopMv(text);
  };
  //mv排行榜
  getTopMv = (text) => {
    RAGet(mvTop.api_url, {
      params: {
        area: text,
        limit: 50,
      },
    })
      .then((res) => {
        const topMvList = res.data;
        const date = formatDate(res.updateTime);
        this.setState({ topMvList, date });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const path = '/videoDetail';
    const { areaList, areaText, topMvList, date } = this.state;
    return (
      <div className="top_mv">
        <ScrollView onScroll={this.onScroll}>
          <div className="topmv_content">
            <div className="headline">
              <p className="headline_title">MV排行榜</p>
              <ul>
                {areaList.map((item, index) => {
                  const mvActive1 = areaText === item ? 'mvActive1' : '';
                  return (
                    <li
                      className={mvActive1}
                      onClick={this.handleClick.bind(this, item)}
                      key={index}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
              <p>{!isEmpty(date) ? `最近更新：${date}` : ''}</p>
            </div>
            <ul className="top_mv_list">
              {topMvList.length > 0 &&
                topMvList.map((item, index) => {
                  return (
                    <NavLink key={index} to={path + item.id}>
                      <li>
                        <p>{index + 1}</p>
                        <div className="img_box">
                          <img src={imgParam(item.cover, 150, 90)} alt="" />
                          <span>{`热度：${formatPlaycount(item.score)}`}</span>
                        </div>
                        <div className="c_info">
                          <p className="overflow">{item.name}</p>
                          <p className="overflow">{item.artistName}</p>
                        </div>
                      </li>
                    </NavLink>
                  );
                })}
            </ul>
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default AllMv;
