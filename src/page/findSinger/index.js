/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-06-08 19:25:35
 * @LastEditors: RA
 * @Description: 歌手列表
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { artistList } from '../../api/api';
import { imgParam, a, b, c } from '../../common/utils/format';
class FindSinger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singerCat: ['全部', '华语', '欧美', '日本', '韩国', '其他'],
      singerType: ['全部', '男歌手', '女歌手', '乐队组合'],
      singerArea: [
        '热门',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '#',
      ],
      singerCatText: '全部',
      singerTypeText: '全部',
      singerAreaText: '热门',
      limit: 50,
      offset: 0,
      artistsList: {},
    };
  }
  componentDidMount = () => {
    this.getArtistList('-1', '-1', '-1', 50, 0);
  };
  hangleClick = (text, type) => {
    this.setState({ artistsList: {}, offset: 0 });
    const { singerCatText, singerTypeText, singerAreaText } = this.state;
    let cat = a(singerCatText);
    let types = b(singerTypeText);
    let area = c(singerAreaText);
    switch (type) {
      case '1':
        cat = a(text);
        this.setState({ singerCatText: text });
        break;
      case '2':
        types = b(text);
        this.setState({ singerTypeText: text });
        break;
      default:
        area = c(text);
        this.setState({ singerAreaText: text });
        break;
    }
    this.getArtistList(cat, types, area, 50, 0);
  };
  getArtistList = (cat, type, area, limit, offset) => {
    RAGet(artistList.api_url, {
      params: {
        area: cat,
        type: type,
        initial: area,
        limit: limit,
        offset: offset,
      },
    })
      .then((res) => {
        let obj = {};
        const { artistsList } = this.state;
        if (artistsList.list) {
          obj.list = artistsList.list.concat(res.artists);
        } else {
          obj.list = res.artists;
        }
        obj.more = res.more;
        this.setState({ artistsList: obj });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleMore = () => {
    const {
      singerCatText,
      singerTypeText,
      singerAreaText,
      limit,
      offset,
    } = this.state;
    let cat = a(singerCatText);
    let types = b(singerTypeText);
    let area = c(singerAreaText);
    let offsets = offset + limit;
    this.setState({ offset: offsets });
    this.getArtistList(cat, types, area, limit, offsets);
  };
  handleSingerDetail = (item) => {
    this.props.history.push({ pathname: `/home/singerdetail${item.id}` });
  };
  render() {
    const {
      singerCat,
      singerType,
      singerArea,
      singerCatText: cat,
      singerTypeText: type,
      singerAreaText: area,
      artistsList: list,
    } = this.state;
    return (
      <div className="find_singer">
        <div className="menu_list">
          <ul>
            <p>语种：</p>
            {singerCat.map((item, index) => {
              const active = cat === item ? 'active' : '';
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
            <p>分类：</p>
            {singerType.map((item, index) => {
              const active = type === item ? 'active' : '';
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
            <p>筛选：</p>
            {singerArea.map((item, index) => {
              const active = area === item ? 'active' : '';
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

        <div className="singer_list">
          <ul>
            {list.list &&
              list.list.map((item, index) => {
                return (
                  <li
                    onClick={this.handleSingerDetail.bind(this, item)}
                    key={index}
                  >
                    <div>
                      <img src={imgParam(item.picUrl, 200, 200)} alt="" />
                    </div>
                    <p>{item.name}</p>
                  </li>
                );
              })}
          </ul>
        </div>
        {list.more === true ? (
          <span className="load_more" onClick={this.handleMore}>
            点我加载更多喔,不信你试试 ꒰⑅•ᴗ•⑅꒱
          </span>
        ) : list.more === false ? (
          <span className="load_more" onClick={this.handleMore}>
            没有更多的啦,不要划了(＞﹏＜)
          </span>
        ) : null}
      </div>
    );
  }
}
export default FindSinger;
