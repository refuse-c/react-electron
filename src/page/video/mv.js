/*
 * @Author: REFUSE_C
 * @Date: 2020-05-29 16:21:25
 * @LastEditors: RA
 * @LastEditTime: 2020-07-01 23:33:29
 * @Description:视频->MV
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { mvFirst, personalizedMv, mvRcmd, mvTop } from '../../api/api';
import { NavLink } from 'react-router-dom';
import { imgParam, formatPlaycount } from '../../common/utils/format';
import MvList from '../../components/mvList';
class ComponentMvs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mvNav: [
        {
          title: '内地',
        },
        {
          title: '港台',
        },
        {
          title: '欧美',
        },
        {
          title: '日本',
        },
        {
          title: '韩国',
        },
      ],
      newMv: {},
      hotMv: {},
      wyMv: {},
      mvTop: {},
      menu1State: 0,
      menu2State: 0,
    };
  }
  componentDidMount = () => {
    this.getMvFirst('内地');
    this.getMvPersonalizedMv();
    this.getMvRcmd();
    this.getMvTop('内地');
  };
  //最新mv
  getMvFirst = (text) => {
    RAGet(mvFirst.api_url, {
      params: {
        area: text,
        limit: '8',
      },
    })
      .then((res) => {
        const newMv = res.data;
        newMv.length = newMv.length > 8 ? (newMv.length = 8) : newMv.length;
        this.setState({ newMv });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //热播MV
  getMvPersonalizedMv = () => {
    RAGet(personalizedMv.api_url)
      .then((res) => {
        const hotMv = res.result;
        hotMv.length = hotMv.length > 8 ? (hotMv.length = 8) : hotMv.length;
        this.setState({ hotMv });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //网易出品
  getMvRcmd = (text) => {
    RAGet(mvRcmd.api_url)
      .then((res) => {
        const wyMv = res.data;
        wyMv.length = wyMv.length > 8 ? (wyMv.length = 8) : wyMv.length;
        this.setState({ wyMv });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getMvRcmd = () => {
    RAGet(mvRcmd.api_url)
      .then((res) => {
        const wyMv = res.data;
        wyMv.length = wyMv.length > 8 ? (wyMv.length = 8) : wyMv.length;
        this.setState({ wyMv });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleMenu1 = (title, index) => {
    this.getMvFirst(title);
    this.setState({ menu1State: index });
  };
  handleMenu2 = (title, index) => {
    this.getMvTop(title);
    this.setState({ menu2State: index });
  };
  //跳转全部mv
  gotoAllMv = (index) => {
    console.log(index);
    if (index === 'topMv') {
      this.props.history.push({ pathname: `/home/topMv` });
    } else {
      this.props.history.push({ pathname: `/home/allMv${index}` });
    }
  };
  //mv排行榜
  getMvTop = (text) => {
    RAGet(mvTop.api_url, {
      params: {
        area: text,
        limit: '8',
      },
    })
      .then((res) => {
        const mvTop = res.data;
        mvTop.length = mvTop.length > 10 ? (mvTop.length = 10) : mvTop.length;
        this.setState({ mvTop });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const {
      mvNav,
      newMv,
      hotMv,
      wyMv,
      mvTop,
      menu1State,
      menu2State,
    } = this.state;
    const path = '/videoDetail';
    return (
      <div className="components_mv">
        <div className="headline">
          <p className="headline_title">最新MV</p>
          <ul>
            {mvNav.map((item, index) => {
              const mvActive1 = menu1State === index ? 'mvActive1' : '';
              return (
                <li
                  className={mvActive1}
                  onClick={this.handleMenu1.bind(this, item.title, index)}
                  key={index}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
          <p
            className="headline_more"
            onClick={this.gotoAllMv.bind(this, 'new')}
          >
            更多
          </p>
        </div>
        {newMv.length > 0 ? <MvList data={newMv} path={path} /> : null}
        <div className="headline">
          <p className="headline_title">热播MV</p>
          <p
            className="headline_more"
            onClick={this.gotoAllMv.bind(this, 'hot')}
          >
            更多
          </p>
        </div>
        {hotMv.length > 0 ? <MvList data={hotMv} path={path} /> : null}
        <div className="headline">
          <p className="headline_title">网易出品</p>
          <p
            className="headline_more"
            onClick={this.gotoAllMv.bind(this, 'wycp')}
          >
            更多
          </p>
        </div>
        {wyMv.length > 0 ? <MvList data={wyMv} path={path} /> : null}
        <div className="headline">
          <p className="headline_title">MV排行榜</p>
          <ul>
            {mvNav.map((item, index) => {
              const mvActive1 = menu2State === index ? 'mvActive1' : '';
              return (
                <li
                  className={mvActive1}
                  onClick={this.handleMenu2.bind(this, item.title, index)}
                  key={index}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
          <p
            className="headline_more"
            onClick={this.gotoAllMv.bind(this, 'topMv')}
          >
            更多
          </p>
        </div>
        <div className="contents">
          <ul>
            {mvTop.length > 0 &&
              mvTop.map((item, index) => {
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
      </div>
    );
  }
}

export default ComponentMvs;
