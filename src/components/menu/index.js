/*
 * @Author: RA
 * @Date: 2020-04-01 17:06:28
 * @LastEditTime: 2020-04-03 17:58:45
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import './index.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        { title: 'EMusic', type: 'title' },
        { title: '搜索', type: 'menu', path: '/search' },
        { title: '发现', type: 'menu', path: '/home/find' },
        { title: '视频', type: 'menu', path: '/home/video' },
        { title: '朋友', type: 'menu', path: '/home/frind' },
        { title: '我的音乐', type: 'title' },
        { title: '本地音乐', type: 'menu', path: '/home/local' },
        { title: '下载管理', type: 'menu', path: '/home/down' },
        { title: '最近播放', type: 'menu', path: '/home/lately' },
        { title: '创建的歌单', type: 'title' },
        { title: '收藏的歌单', type: 'title' },
      ],
      getList1: [
        { title: 'add1', type: 'list', path: '/home/list:id', id: '1' },
        { title: 'add2', type: 'list', path: '/home/list:id', id: '2' },
        { title: 'add3', type: 'list', path: '/home/list:id', id: '3' },
        { title: 'add4', type: 'list', path: '/home/list:id', id: '4' },
      ],
      getList2: [
        { title: 'add5', type: 'list', path: '/home/list:id', id: '5' },
        { title: 'add6', type: 'list', path: '/home/list:id', id: '6' },
        { title: 'add7', type: 'list', path: '/home/list:id', id: '7' },
        { title: 'add8', type: 'list', path: '/home/list:id', id: '8' },
      ]
    }
  }
  componentDidMount = () => {
    const { menuList, getList1, getList2 } = this.state;
    const goalIndex1 = menuList.findIndex((item) => { return item.title === '创建的歌单' })
    getList1.map(item => {
      return menuList.splice(goalIndex1 + 1, 0, item);
    })
    const goalIndex2 = menuList.findIndex((item) => { return item.title === '收藏的歌单' })
    getList2.map(item => {
      return menuList.splice(goalIndex2 + 2, 0, item);
    })
    this.setState({ menuList })
  }
  handelIndex = index => {
    console.log(index)
  }
  render() {
    const { menuList } = this.state;
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
          <ul className="menu_list">
            {
              menuList.map((item, index) => {
                return (
                  item.path !== undefined ?
                    <NavLink onClick={this.handelIndex.bind(this, index)} exact activeClassName="active" key={index} to={item.id !== undefined ? item.path + item.id : item.path}>
                      <li className="menu_item" > {item.title}</li>
                    </NavLink> :
                    <h3 key={index} className="menu_title">{item.title}</h3>
                )
              })
            }
          </ul>
        </ScrollArea>
      </div >
    );
  }
}

export default Menu;