/*
 * @Author: REFUSE_C
 * @Date: 2020-06-05 17:54:41
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-10 09:04:31
 * @Description:歌手详情页
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { artistAlbum, artistMv } from '../../api/api';
import ScrollArea from 'react-scrollbar';
import { imgParam, obtainId, isEmpty } from '../../common/utils/format';
import { Route, NavLink } from 'react-router-dom';
import PlayAll from '../../components/playAll';
class SingerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      artistsInfo: {},
      artistsNav: [
        {
          ti: 'Top50',
          path: `/`,
        },
        {
          ti: '专辑',
          path: `/album`,
        },
        {
          ti: 'MV',
          path: `/mv`,
        },
        {
          ti: '歌手详情',
          path: `/desc`,
        },
        {
          ti: '相似歌手',
          path: `/simi`,
        },
      ],
      list: [],
      showPlayAll: true,
    };
  }
  componentDidMount = () => {
    const id = obtainId(window.location.href, 'singerdetail');
    this.setState({ id });
    this.requestGroup(id);
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { id } = nextProps.match.params;
  //   if (id !== prevState.id) {
  //     return {
  //       id,
  //       props: {
  //         id: id,
  //       },
  //     };
  //   }
  //   return null;
  // }
  // componentDidUpdate(prevState) {
  //   const { id } = prevState.match.params;
  //   console.log(id, this.props.match.params.id)
  //   if (this.props.match.params.id !== id) {
  //     this.requestGroup(id);
  //   }
  // }
  componentDidUpdate = () => {
    // this.props.history.listen(route => {
    //   const a = route.pathname.split('singerdetai')[1];
    //   const b = a.split('/')[1]
    //   if (isEmpty(b)) {
    //     this.setState({ showPlayAll: true })
    //   } else {
    //     this.setState({ showPlayAll: false })
    //   }
    // });
  };
  componentWillReceiveProps = () => {
    const id = obtainId(window.location.href, 'singerdetail');
    this.setState({ id });
    this.requestGroup(id);
  };
  requestGroup = async (id) => {
    let a = await this.getArtistAlbum(id);
    let b = await this.getArtistMv(id);
    if (!isEmpty(b.mvs)) {
      a.mvLength = b.mvs.length === 0 ? 0 : b.mvs.length;
    }
    this.setState({ artistsInfo: a });
  };
  getArtistAlbum = async (id) => {
    let data = {};
    await RAGet(artistAlbum.api_url, {
      params: { id: id },
    })
      .then((res) => {
        const info = res.artist;
        info.mvLength = '';
        data = info;
      })
      .catch((err) => {
        // console.log(err);
      });
    return data;
  };
  getArtistMv = async (id) => {
    let data = {};
    await RAGet(artistMv.api_url, {
      params: { id: id },
    })
      .then((res) => {
        data = res;
      })
      .catch((err) => {
        data = '';
        // console.log(err);
      });
    return data;
  };
  componentWillUnmount() {
    // 卸载异步操作设置状态
    this.setState = (state, callback) => {
      return;
    };
  }
  getChildValue(list) {
    this.setState({ list });
  }
  render() {
    const { routes } = this.props;
    const { artistsInfo, artistsNav, id, list, showPlayAll } = this.state;
    return (
      <div className="singer_details">
        <ScrollArea
          speed={0.8}
          className="area"
          contentClassName="content"
          vertical={true}
          horizontal={true}
          minScrollSize={5}
        >
          <div className="single_info">
            <img src={imgParam(artistsInfo.picUrl, 200, 200)} alt="" />
            <div className="single_box">
              <div className="artists">
                <p>歌手</p>
                <div>
                  <h2>{artistsInfo.name}</h2>
                  <span>{artistsInfo.alias}</span>
                </div>
              </div>
              <div className="artists_info">
                <p>{`单曲数：${artistsInfo.musicSize || '0'}`}</p>
                <p>{`专辑数：${artistsInfo.albumSize || '0'}`}</p>
                <p>{`MV数：${artistsInfo.mvLength || '0'}`}</p>
              </div>
            </div>
          </div>
          <div className="singer_nav">
            <ul>
              {artistsNav.map((item, index) => {
                return (
                  <NavLink
                    exact
                    activeClassName="active"
                    key={item.path}
                    to={`/home/singerdetail${id}${item.path}`}
                  >
                    <li>{item.ti}</li>
                  </NavLink>
                );
              })}
            </ul>
            {showPlayAll ? (
              <PlayAll cls={`btn1`} text={`播放全部`} list={list} />
            ) : (
                ''
              )}
          </div>
          <div className="singer_content">
            {routes.map((route, key) => {
              return (
                <Route
                  exact
                  key={key}
                  path={route.path}
                  render={(props) => (
                    <route.component
                      {...props}
                      routes={route.routes}
                      toFatherValue={this.getChildValue.bind(this)}
                    />
                  )}
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  }
}

export default SingerDetails;
