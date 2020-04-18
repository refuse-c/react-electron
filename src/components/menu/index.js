/*
 * @Author: RA
 * @Date: 2020-04-01 17:06:28
 * @LastEditTime: 2020-04-18 16:54:14
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import './index.scss';
import { musicList } from '../../api/api';
import { RAGet } from '../../api/netWork';


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 287070050,
      menuList: [
        { name: 'EMusic' },

        { name: '搜索', path: '/home/search', icon: 'search' },
        { name: '发现', path: '/home/find', icon: 'find' },
        { name: '视频', path: '/home/video', icon: 'video' },
        { name: '朋友', path: '/home/frind', icon: 'frind' },
        { name: '我的音乐' },
        { name: '本地音乐', path: '/home/local', icon: 'local' },
        { name: '下载管理', path: '/home/down', icon: 'down' },
        { name: '最近播放', path: '/home/lately', icon: 'lately' },
        { name: '创建的歌单' },
        { name: '收藏的歌单' },
      ]
    }
  }
  componentDidMount = () => {
    this.getMusicList(287070050);
  }
  handelIndex = index => {
    // console.log(index)
  }
  getMusicList = (id) => {
    const { userId, menuList } = this.state;
    RAGet(musicList.api_url, {
      params: {
        uid: id,
      }
    }).then(res => {
      if (res.code === 200) {
        res.playlist.map((item, index) => {
          item.path = '/home/list';
          if (item.privacy !== 10) {
            if (item.userId === Number(userId)) {
              let index = menuList.findIndex((item) => { return item.name === '收藏的歌单' })
              menuList.splice(index, 0, item);
            }
            if (item.userId !== Number(userId)) {
              let index = menuList.findIndex((item) => { return item.name === '收藏的歌单' })
              menuList.splice(index + 2, 0, item);
            }
          }
          return index.id
        })
        this.setState({ menuList })
      }

    }).catch(err => {
      console.log(err)
    })
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
                      <li className={`menu_item ` + item.icon} > {item.name}</li>
                    </NavLink> :
                    <h3 key={index} className="menu_title">{item.name}</h3>
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