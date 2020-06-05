
/*
 * @Author: RA
 * @Date: 2020-04-18 20:57:49
 * @LastEditTime: 2020-06-05 11:40:18
 * @LastEditors: refuse_c
 * @Description: 热门搜素/历史搜索
 */
import React, { Component } from 'react';

import './index.scss';
// import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import { formatNum } from '../../common/utils/format';

class HotAndHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hotList: this.props;
    }
  }
  handelName = text => {
    this.props.getChildVal(text);
  }
  handelDel = (index, e) => {
    this.props.getIndex(index);
    e.stopPropagation();
  }
  render() {
    const { hotList, historyList } = this.props;
    return (
      <div className="hot-and-history">
        <div className="hah search-hot">
          <div className="search-title">
            <h3>热门搜索</h3>
            {/* <i className="search-clear"></i> */}
          </div>
          <div className="scrolling">
            <ScrollArea
              speed={0.8}
              className="area"
              contentClassName="content"
              vertical={true}
              horizontal={true}
              minScrollSize={5}
            >
              <ul>
                {
                  hotList && hotList.map((item, index) => {
                    let iconType = '';
                    let indexType = 'hot-index';
                    switch (item.iconType) {
                      case 5: iconType = 'icon-top'; break;
                      default: iconType = 'icon-hot'; break;
                    }
                    index < 3 ? indexType = 'hot-index-active' : indexType = 'hot-index';
                    return (
                      <li key={index} onClick={this.handelName.bind(this, item.searchWord)}>
                        <p className={indexType}>{(formatNum(index))}</p>
                        <div className="hot-list">
                          <div className="hot-info">
                            <p className="hot-name">{item.searchWord}</p>
                            <p className="hot-score">{item.score}</p>
                            <img className={iconType} src={item.iconUrl} alt="" />
                          </div>
                          <p className="hot-content">{item.content}</p>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </ScrollArea>
          </div>
        </div>
        <div className="hah search-History">
          <div className="search-title">
            <h3>历史搜索</h3>
            <i
              className="search-clear"
              onClick={this.handelDel.bind(this, 'all')}
            ></i>
          </div>
          <div className="scrolling">
            <ScrollArea
              speed={0.8}
              className="area"
              contentClassName="content"
              vertical={true}
              horizontal={true}
              minScrollSize={5}
            >
              <ul>
                {
                  historyList && historyList.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={this.handelName.bind(this, item)}>{item}
                        <i
                          className="fork"
                          onClick={this.handelDel.bind(this, index)}></i>
                      </li>
                    )
                  })
                }
              </ul>
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  }
}

export default HotAndHistory;