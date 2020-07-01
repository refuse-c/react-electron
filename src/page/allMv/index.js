/*
 * @Author: REFUSE_C
 * @Date: 2020-06-12 09:42:42
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-01 18:05:02
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { mvAll } from '../../api/api';
import ScrollView from 'react-custom-scrollbars';
import MvList from '../../components/mvList'

class AllMv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: ['全部', '内地', '港台', '欧美', '日本', '韩国'], //地区 不填则为全部 
      typeList: ['全部', '官方版', '原生', '现场版', '网易出品'], //类型 不填则为全部
      orderList: ['上升最快', '最热', '最新'], //排序, 不填则为上升最快
      areaText: '全部',
      typeText: '全部',
      orderText: '上升最快',
      allMvList: [],
      offset: 0
    }
  }
  componentDidMount = () => {
    const name = window.location.href.split('allMv')[1];
    console.log(name)
    switch (name) {
      case 'new':
        this.setState({ areaText: '内地', orderText: '最热' })
        this.getmvAll('内地', '', '最热', 0);
        break;
      case 'hot':
        this.setState({ orderText: '最热' })
        this.getmvAll('', '', '最热', 0);
        break;
      case 'wycp':
        this.setState({ typeText: '网易出品', orderText: '最热' })
        this.getmvAll('', '网易出品', '最热', 0);
        break;
      default:
        this.getmvAll('', '', '', 0);
        break
    }
  }
  /*监听滚动*/
  onScroll = e => {
    if (e.target.scrollTop + e.target.clientHeight - 100 === e.target.scrollHeight - 100) {
      // 滚动到底部需要做的事情
      const { areaText, typeText, orderText, offset } = this.state;
      const num = offset + 40
      this.getmvAll(areaText, typeText, orderText, num);
    }
  }
  hangleClick = (text, type) => {
    this.setState({ allMvList: [] })
    const { areaText, typeText, orderText } = this.state;
    let a = areaText === '全部' ? '' : areaText, b = typeText === '全部' ? '' : typeText, c = orderText === '上升最快' ? '' : orderText;
    switch (type) {
      case '1':
        a = text === '全部' ? '' : text;
        this.setState({ areaText: text });
        break;
      case '2':
        b = text === '全部' ? '' : text;
        this.setState({ typeText: text });
        break;
      default:
        c = text === '上升最快' ? '' : text;
        this.setState({ orderText: text });
        break;
    }

    this.getmvAll(a, b, c, 0);
  }
  getmvAll = (a, b, c, d) => {
    RAGet(mvAll.api_url, {
      params: {
        area: a,
        type: b,
        order: c,
        limit: 40,// 取出数量, 默认为 30
        offset: d
      }
    }).then(res => {
      console.log(res)


      let obj = []
      const { allMvList } = this.state;
      if (allMvList.list) {
        obj.list = allMvList.list.concat(res.data);
      } else {
        obj.list = res.data;
      }
      obj.more = res.hasMore;
      this.setState({ allMvList: obj })
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const path = '/videoDetail';
    const { areaList, typeList, orderList, areaText, typeText, orderText, allMvList } = this.state;
    console.log(allMvList)
    return (
      <div className="all_mv">
        <ScrollView onScroll={this.onScroll}>
          <div className="allmv_content">
            <div className="headline">
              <p className="headline_title">全部MV</p>
            </div>
            <div className="menu_list">
              <ul>
                <p>地区：</p>
                {areaList.map((item, index) => {
                  const active = areaText === item ? 'active' : '';
                  return (
                    <li
                      className={active}
                      onClick={this.hangleClick.bind(this, item, '1')}
                      key={index}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
              <ul>
                <p>类型：</p>
                {typeList.map((item, index) => {
                  const active = typeText === item ? 'active' : '';
                  return (
                    <li
                      className={active}
                      onClick={this.hangleClick.bind(this, item, '2')}
                      key={index}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
              <ul>
                <p>排序：</p>
                {orderList.map((item, index) => {
                  const active = orderText === item ? 'active' : '';
                  return (
                    <li
                      className={active}
                      onClick={this.hangleClick.bind(this, item, '3')}
                      key={index}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            {
              allMvList.list && allMvList.list.length > 0 ? <MvList data={allMvList.list} path={path} /> : null
            }
            {
              allMvList.more === true ? (
                <span className="load_more"  >
                  {/* onClick= { this.handleMore} */}
            正在加载请稍后 ꒰⑅•ᴗ•⑅꒱
                </span>
              ) : allMvList.more === false ? (
                <span className="load_more">
                  没有更多的啦,不要划了(＞﹏＜)
                </span>
              ) : null
            }
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default AllMv;