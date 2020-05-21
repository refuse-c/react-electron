/*
 * @Author: RA
 * @Date: 2020-05-15 15:24:07
 * @LastEditTime: 2020-05-21 17:55:46
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';
import { recommendList, privatecontent, getBanner, topSongs, personalizedMv } from '../../api/api';
import { RAGet } from '../../api/netWork';
import { imgParam, getDate, dataScreening } from '../../common/utils/format';

// store 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainMusicList, setIndex, gainPlayLIst, setIsPlay, gainMusicId } from '../../store/actions';
class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannersData: {},
      recommendListData: {},
      privatecontentData: {},
      topSongsData: {},
      personalizedMvData: {},
      bannerActive: 1
    }
  }
  componentDidMount = () => {
    this.getBanner();
    this.getRecommendList();
    this.getPrivatecontentList();
    this.getTopSongs();
    this.getPersonalizedMv();
  }
  getBanner = () => {
    RAGet(getBanner.api_url, {
      params: { type: 0 }
    }).then(res => {
      const bannersData = res.banners;
      this.setState({ bannersData })
    }).catch(err => {
      console.log(err)
    })
  }
  getRecommendList = () => {
    const recommended = {
      name: '每日推荐音乐',
      day: getDate('day'),
      week: getDate('week'),
      picUrl: require('../../common/images/transparent.jpg'),
      copywriter: '根据您的音乐口味生成每日推荐',
      custom: 1
    }
    RAGet(recommendList.api_url, {
      params: {
        limit: 9
      }
    })
      .then(res => {
        const recommendListData = res.result;
        recommendListData.unshift(recommended);
        if (recommendListData.length >= 10) {
          recommendListData.length = 10;
        }
        this.setState({ recommendListData })
      }).catch(err => {
        console.log(err)
      })
  }
  getPrivatecontentList = () => {
    RAGet(privatecontent.api_url, {})
      .then(res => {
        const privatecontentData = res.result;
        this.setState({ privatecontentData })
      }).catch(err => {
        console.log(err)
      })
  }
  getTopSongs = () => {
    RAGet(topSongs.api_url, {
      params: { type: 0 }
    }).then(res => {
      const topSongsData = dataScreening(res.data);
      this.setState({ topSongsData });
    }).catch(err => {
      console.log(err)
    })
  }
  getPersonalizedMv = () => {
    RAGet(personalizedMv.api_url)
      .then(res => {
        const personalizedMvData = res.result;
        this.setState({ personalizedMvData });
      }).catch(err => {
        console.log(err)
      })
  }
  addMusic = (item) => {
    const { playList } = this.props;
    const array = JSON.parse(JSON.stringify(playList));
    array.forEach((element, index) => {
      if (element.id === item.id) {
        // if (index === 0) return;
        array.splice(index, 1)
      }
    });
    array.unshift(item);
    this.props.setIndex(0);
    this.props.gainPlayLIst(array);
    this.props.setIsPlay(true);
    this.props.gainMusicId(item.id);
  }
  handelMore = index => {
    console.log(index)
  }
  render() {
    const { bannersData, recommendListData, privatecontentData, topSongsData, personalizedMvData } = this.state;
    return (
      <div className="recommendation">
        <div className="recommend-banner">
          <ul>
            {
              bannersData.length > 0 && bannersData.map((item, index) => {
                return (
                  <li key={index}>
                    <img src={imgParam(item.imageUrl, 700, 200)} alt="" />
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="recommend-title">
          <p>推荐歌单</p>
          <p onClick={this.handelMore.bind(this, 1)}>更多></p>
        </div>
        <div className="recommend-list">
          <ul>
            {
              recommendListData.length > 0 && recommendListData.map((item, index) => {
                const path = '/home/single';
                const dailySpecial = '/home/dailySpecial';
                return (
                  item.custom === 1 ?
                    <NavLink to={dailySpecial} key={index} >
                      <li >
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
                    :
                    <NavLink to={path + item.id} key={index} >
                      <li >
                        <img src={imgParam(item.picUrl, 160, 160)} alt="" />
                        <p>{item.name}</p>
                      </li>
                    </NavLink>
                )
              })
            }
          </ul>
        </div>
        <div className="recommend-title">
          <p>独家放送</p>
          <p onClick={this.handelMore.bind(this, 2)}>更多></p>
        </div>
        <div className="privatecontent-list">
          <ul>
            {
              privatecontentData.length > 0 && privatecontentData.map((item, index) => {
                const path = '/home/single';
                return (
                  <NavLink to={path + item.id} key={index} >
                    <li >
                      <img src={imgParam(item.picUrl, 330, 190)} alt="" />
                      <p>{item.name}</p>
                    </li>
                  </NavLink>
                )
              })
            }
          </ul>
        </div>
        <div className="recommend-title">
          <p>最新音乐</p>
          <p onClick={this.handelMore.bind(this, 3)}>更多></p>
        </div>
        <div className="top-songs">
          <ul>
            {
              topSongsData.length > 0 && topSongsData.map((item, index) => {
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
                      <p>{item.ar.map(item => item.name + '').join(' / ')}</p>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="recommend-title">
          <p>推荐MV</p>
          <p onClick={this.handelMore.bind(this, 4)}>更多></p>
        </div>
        <div className="privatecontent-list">
          <ul>
            {
              personalizedMvData.length > 0 && personalizedMvData.map((item, index) => {
                const path = '/home/single';
                if (index > 2) return false;
                return (
                  <NavLink to={path + item.id} key={index} >
                    <li>
                      <img src={imgParam(item.picUrl, 330, 190)} alt="" />
                      <p>{item.name}</p>
                    </li>
                  </NavLink>
                )
              })
            }
          </ul>
        </div>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gainMusicList: bindActionCreators(gainMusicList, dispatch),
    setIndex: bindActionCreators(setIndex, dispatch),
    gainPlayLIst: bindActionCreators(gainPlayLIst, dispatch),
    setIsPlay: bindActionCreators(setIsPlay, dispatch),
    gainMusicId: bindActionCreators(gainMusicId, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);