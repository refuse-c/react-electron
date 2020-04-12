/*
 * @Author: RA
 * @Date: 2020-04-02 16:54:31
 * @LastEditTime: 2020-04-12 16:50:41
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="search">
        <div className="search_input">
          <input type="text" placeholder="搜索音乐、歌手、歌词、用户" />
        </div>
      </div>
    );
  }
}

export default Search;