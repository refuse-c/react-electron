/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-11 18:00:24
 * @Description: 歌单列表
 */
import React, { Component } from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';
import Empty from '../../components/empty';

//store
import { connect } from 'react-redux';
import { imgParam, isArrays, formatPlaycount } from '../../common/utils/format';
// import { bindActionCreators } from 'redux';
// import { setPageNum, gainSearchInfo, setMenuIndex } from '../../store/actions';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data, type } = this.props;
    return (
      <div className="list">
        {
          isArrays(data) ?
            <ul className={type ? 'vertical' : 'across'}>
              {
                data && data.map((item, index) => {
                  const path = '/home/single';
                  return (
                    <NavLink key={index} to={path + item.id}>
                      <li>
                        <div>
                          {
                            type
                              ? <p className="playCount">{formatPlaycount(item.playCount)}</p>
                              : ''
                          }
                          <img src={imgParam(item.coverImgUrl, 200, 200)} alt="" />
                        </div>
                        <p className="name">{item.name}</p>
                        {
                          type
                            ? ''
                            : <p className="trackCount">{item.trackCount}</p>
                        }
                        <p className="nickname">by {item.creator.nickname}</p>
                      </li>
                    </NavLink>
                  )
                })
              }
            </ul>
            : <Empty />
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(List);