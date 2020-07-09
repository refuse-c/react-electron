/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-07-09 19:44:24
 * @LastEditors: RA
 * @Description: 个性推荐
 */
import React, { Component } from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';
import {
  recommendList,
  privatecontent,
  getBanner,
  topSongs,
  personalizedMv,
} from '../../api/api';
import { RAGet } from '../../api/netWork';
import {
  imgParam,
  getDate,
  dataScreening,
  getDevice,
} from '../../common/utils/format';
import MvList from '../../components/mvList';
import Exclusive from '../../components/exclusive';
import Swiper from 'swiper';
import './swiper.min.css';
// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  gainMusicList,
  setIndex,
  gainPlayList,
  setIsPlay,
  gainMusicId,
} from '../../store/actions';
class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: '',
      bannerData: {},
      recommendListData: {},
      privatecontentData: {},
      topSongsData: {},
      personalizedMvData: {},
      bannerActive: 1,
    };
  }
  componentDidMount = () => {
    const device = getDevice().device.id;
    this.setState({ device });
    this.getBanner(device);
    this.getRecommendList();
    this.getPrivatecontentList();
    this.getTopSongs();
    this.getPersonalizedMv();
  };
  getBanner = () => {
    RAGet(getBanner.api_url, {
      params: { type: 0 },
    })
      .then((res) => {
        const bannerData = res.banners;
        this.setState({ bannerData });
        this.runSwiper();
      })
      .catch((err) => {
        // console.log(err)
      });
  };
  getRecommendList = () => {
    const recommended = {
      name: '每日推荐音乐',
      day: getDate('day'),
      week: getDate('week'),
      picUrl: require('../../common/images/transparent.jpg'),
      copywriter: '根据您的音乐口味生成每日推荐',
      custom: 1,
    };
    RAGet(recommendList.api_url, {
      params: {
        limit: 9,
      },
    })
      .then((res) => {
        const recommendListData = res.result;
        recommendListData.unshift(recommended);
        if (recommendListData.length >= 10) {
          recommendListData.length = 10;
        }
        this.setState({ recommendListData });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
  getPrivatecontentList = () => {
    RAGet(privatecontent.api_url, {})
      .then((res) => {
        const privatecontentData = res.result;
        this.setState({ privatecontentData });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
  getTopSongs = () => {
    RAGet(topSongs.api_url, {
      params: { type: 0 },
    })
      .then((res) => {
        const topSongsData = dataScreening(res.data);
        this.setState({ topSongsData });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
  getPersonalizedMv = () => {
    RAGet(personalizedMv.api_url)
      .then((res) => {
        const personalizedMvData = res.result;
        this.setState({ personalizedMvData });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
  addMusic = (item) => {
    const { playList } = this.props;
    const array = JSON.parse(JSON.stringify(playList));
    array.forEach((element, index) => {
      if (element.id === item.id) {
        array.splice(index, 1);
      }
    });
    array.unshift(item);
    this.props.setIndex(0);
    this.props.gainPlayList(array);
    this.props.setIsPlay(true);
    this.props.gainMusicId(item.id);
  };
  handelMore = (index) => {
    let pathname = '';
    switch (index) {
      case 1:
        pathname = '/home/find/findList';
        break;
      case 2:
        pathname = '/home/personalized';
        break;
      case 3:
        pathname = '/home/find/newMusic';
        break;
      default:
        pathname = '/home/video/mv';
        break;
    }
    this.props.history.push({ pathname: pathname });
  };
  runSwiper = () => {
    new Swiper('.swiper-container', {
      direction: 'horizontal', //横向轮播
      loop: true, //无缝轮播
      effect: 'coverflow',
      autoplay: {
        delay: 3000,
      },
      pagination: {
        //小圆点分页
        el: '.swiper-pagination',
      },
    });
  };
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };
  render() {
    const {
      device,
      bannerData,
      recommendListData,
      privatecontentData,
      topSongsData,
      personalizedMvData,
    } = this.state;
    return (
      <div className="recommendation">
        <div className="recommend-banner">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {bannerData.length > 0 &&
                bannerData.map((item, index) => {
                  const imgUrl =
                    Number(device) === 0 ? item.imageUrl : item.pic;
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundImage:
                          'url(' + imgParam(imgUrl, 1000, 360) + ')',
                      }}
                      className="swiper-slide"
                    >
                      <span style={{ backgroundColor: item.titleColor }}>
                        {item.typeTitle}
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
        <div className="headline">
          <p className="headline_title">推荐歌单</p>
          <p className="headline_more" onClick={this.handelMore.bind(this, 1)}>
            更多
          </p>
        </div>
        <div className="recommend-list">
          <ul>
            {recommendListData.length > 0 &&
              recommendListData.map((item, index) => {
                const path = '/home/single';
                const dailySpecial = '/home/dailySpecial';
                return item.custom === 1 ? (
                  <NavLink to={dailySpecial} key={index}>
                    <li>
                      <div className="recommend-bg">
                        <img src={item.picUrl} alt="" />
                        <div>
                          <h4>{item.week}</h4>
                          <h3>{item.day}</h3>
                        </div>
                      </div>

                      <p>{item.name}</p>
                    </li>
                  </NavLink>
                ) : (
                  <NavLink to={path + item.id} key={index}>
                    <li>
                      <img src={imgParam(item.picUrl, 160, 160)} alt="" />
                      <p>{item.name}</p>
                    </li>
                  </NavLink>
                );
              })}
          </ul>
        </div>
        <div className="headline">
          <p className="headline_title">独家放送</p>
          <p className="headline_more" onClick={this.handelMore.bind(this, 2)}>
            更多
          </p>
        </div>
        {privatecontentData.length > 0 ? (
          <Exclusive history={this.props.history} data={privatecontentData} />
        ) : null}
        <div className="headline">
          <p className="headline_title">最新音乐</p>
          <p className="headline_more" onClick={this.handelMore.bind(this, 3)}>
            更多
          </p>
        </div>
        <div className="top-songs">
          <ul>
            {topSongsData.length > 0 &&
              topSongsData.map((item, index) => {
                const num = index < 9 ? '0' + (index + 1) : index + 1;
                if (index > 9) return false;
                return (
                  <li
                    key={index}
                    onDoubleClick={this.addMusic.bind(this, item, index)}
                  >
                    <p>{num}</p>
                    <img src={imgParam(item.al.blurPicUrl, 50, 50)} alt="" />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.ar.map((item) => item.name + '').join(' / ')}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="headline">
          <p className="headline_title">推荐MV</p>
          <p className="headline_more" onClick={this.handelMore.bind(this, 4)}>
            更多
          </p>
        </div>
        {personalizedMvData.length > 0 ? (
          <MvList data={personalizedMvData} path={'/videoDetail'} />
        ) : null}
      </div>
    );
  }
}

//注册store
const mapStateToProps = (state) => {
  return {
    musicList: state.musicList,
    playList: state.playList,
    musicId: state.musicId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
    gainPlayList: bindActionCreators(gainPlayList, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
