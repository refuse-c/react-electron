/*
 * @Author: RA
 * @Date: 2020-04-01 17:06:28
 * @LastEditTime: 2020-04-02 23:00:24
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import './index.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="menu">
        <ScrollArea
          speed={0.8}
          className="area"
          contentClassName="content"
          vertical={true}
          horizontal={true}
          minScrollSize={5}
        >
          <h3>setting icon</h3>
          <ul className="menu_list">
            <Link to="/search"> <li className="menu_item">搜索</li></Link>
            <Link to="/find"> <li className="menu_item">发现音乐</li></Link>
            <li className="menu_item">MV</li>
            <li className="menu_item">朋友</li>
            <li className="menu_item"></li>
          </ul>
          <h3>我的音乐</h3>
          <ul className="menu_list">
            <li className="menu_item">本地音乐</li>
            <li className="menu_item">下载管理</li>
            <li className="menu_item">最近播放</li>
          </ul>
          <h3>创建的歌单</h3>
          <ul className="menu_list">
            <li className="menu_item">创建的歌单1</li>
            <li className="menu_item">创建的歌单2</li>
            <li className="menu_item">创建的歌单3</li>
            <li className="menu_item">创建的歌单4</li>
            <li className="menu_item">创建的歌单5</li>
          </ul>
          <h3>收藏的歌单</h3>
          <ul className="menu_list">
            <li className="menu_item">收藏的歌单1</li>
            <li className="menu_item">收藏的歌单2</li>
            <li className="menu_item">收藏的歌单3</li>
            <li className="menu_item">收藏的歌单4</li>
            <li className="menu_item">收藏的歌单5</li>
          </ul>
        </ScrollArea>
      </div>
    );
  }
}

export default Menu;