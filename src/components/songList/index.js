/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-09 16:27:32
 * @Description:检索->歌单组件
 */
import React, { Component } from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';
//store
import { connect } from 'react-redux';
import { imgParam, formatPlaycount } from '../../common/utils/format';
// import Empty from '../empty';
// import { bindActionCreators } from 'redux';
// import { setPageNum, gainSearchInfo, setMenuIndex } from '../../store/actions';

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }
  render() {
    const { data } = this.props;
    return (
      <div className="song_list">
        <ul>
          {
            data.length > 0 &&
            data.map((item, index) => {
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
                      <div>
                        <img src={imgParam(item.coverImgUrl, 160, 160)} alt="" />
                        <p className="play_count">{formatPlaycount(item.playCount)}</p>
                        <p className="user_info">{item.creator.nickname}</p>
                      </div>

                      <p className="song_list_name">{item.name}</p>
                    </li>
                  </NavLink>
                );
            })
          }
        </ul>
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    searchInfo: state.searchInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // gainSearchInfo: bindActionCreators(gainSearchInfo, dispatch),
    // setPageNum: bindActionCreators(setPageNum, dispatch),
    // setMenuIndex: bindActionCreators(setMenuIndex, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SongList);