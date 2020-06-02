/*
 * @Author: REFUSE_C
 * @Date: 2020-05-29 16:21:25
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-02 18:03:22
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { mvFirst, personalizedMv, mvRcmd } from '../../api/api';
import { NavLink } from 'react-router-dom';
import { imgParam } from '../../common/utils/format';
class ComponentMvs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mvNav: [
        {
          title: '内地'
        }, {
          title: '港台'
        }, {
          title: '欧美'
        }, {
          title: '日本'
        }, {
          title: '韩国'
        }
      ],
      newMv: {},
      hotMv: {},
      wyMv: {},
      mvTopRanking: {},
    }
  }
  componentDidMount = () => {
    this.getMvFirst('内地');
    this.getMvPersonalizedMv();
    this.getMvRcmd();
  }
  //最新mv
  getMvFirst = (text) => {
    console.log(text)
    RAGet(mvFirst.api_url, {
      paramsL: {
        area: text,
        limit: '8'
      }
    }).then(res => {
      const newMv = res.data;
      newMv.length = newMv.length > 8 ? newMv.length = 8 : newMv.length
      this.setState({ newMv })
    }).catch(err => {
      console.log(err)
    })
  }
  //热播MV
  getMvPersonalizedMv = () => {
    RAGet(personalizedMv.api_url)
      .then(res => {
        console.log(res)
        const hotMv = res.result;
        hotMv.length = hotMv.length > 8 ? hotMv.length = 8 : hotMv.length
        this.setState({ hotMv })
      }).catch(err => {
        console.log(err)
      })
  }
  //网易出品
  getMvRcmd = (text) => {
    RAGet(mvRcmd.api_url)
      .then(res => {
        const wyMv = res.data;
        wyMv.length = wyMv.length > 8 ? wyMv.length = 8 : wyMv.length
        this.setState({ wyMv })
      }).catch(err => {
        console.log(err)
      })
  }

  getMvRcmd = () => {
    RAGet(mvRcmd.api_url)
      .then(res => {
        const wyMv = res.data;
        wyMv.length = wyMv.length > 8 ? wyMv.length = 8 : wyMv.length
        this.setState({ wyMv })
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    const { mvNav, newMv, hotMv, wyMv, mvTopRanking } = this.state;
    console.log(hotMv)
    const path = '/videoDetail';
    return (
      <div className="components_mv">
        <div className="headline">
          <p>最新MV</p>
          <ul>
            {
              mvNav.map((item, index) => {
                return (
                  <li onClick={this.getMvFirst.bind(this, item.title)} key={index}>{item.title}</li>
                )
              })
            }
          </ul>
          <p>更多></p>
        </div>
        <div className="contents">
          <ul>
            {
              newMv.length > 0 && newMv.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={path + item.id}
                  >
                    <li>
                      <img src={imgParam(item.cover, 240, 140)} alt="" />
                      <h4>{item.name}</h4>
                      <p>by {item.artistName}</p>
                    </li>
                  </NavLink>
                )
              })
            }
          </ul>
        </div>
        <div className="headline">
          <p>热播MV</p>
          <p>更多></p>
        </div>
        <div className="contents">
          <ul>
            {
              hotMv.length > 0 && hotMv.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={path + item.id}
                  >
                    <li>
                      <img src={imgParam(item.picUrl, 240, 140)} alt="" />
                      <h4>{item.name}</h4>
                      <p>by {item.artistName}</p>
                    </li>
                  </NavLink>
                )
              })
            }
          </ul>
        </div>
        <div className="headline">
          <p>网易出品</p>
          <p>更多></p>
        </div>
        <div className="contents">
          <ul>
            {
              wyMv.length > 0 && wyMv.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={path + item.id}
                  >
                    <li>
                      <img src={imgParam(item.cover, 240, 140)} alt="" />
                      <h4>{item.name}</h4>
                      <p>by {item.artistName}</p>
                    </li>
                  </NavLink>
                )
              })
            }
          </ul>
        </div>
        <div className="headline">
          <p>MV排行榜</p>
          <ul>
            {
              mvNav.map((item, index) => {
                return (
                  <li key={index}>{item.title}</li>
                )
              })
            }
          </ul>
          <p>更多></p>
        </div>
      </div>
    );
  }
}

export default ComponentMvs;