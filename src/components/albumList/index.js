/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-17 15:54:23
 * @Description:检索页专辑组件
 */
import React, { Component } from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';
//store
import { connect } from 'react-redux';
import { imgParam, isArrays, formatDate } from '../../common/utils/format';
import Empty from '../empty';
// import { bindActionCreators } from 'redux';
// import { setPageNum, gainSearchInfo, setMenuIndex } from '../../store/actions';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data } = this.props;
    const path = '/home/albumdetail'
    return (
      <div className="album">
        {

          isArrays(data) ?
            < ul >
              {
                data && data.map((item, index) => {
                  return (
                    <NavLink
                      key={index}
                      to={path + item.id}
                    >
                      <li>
                        <div>
                          <img src={imgParam(item.picUrl, 50, 50)} alt="" />
                        </div>
                        <p className="overflow">{item.name}</p>
                        <p className="overflow">{item.artist.name}</p>
                        <p>{`${item.size}首`}</p>
                        <p>{`发行时间：${formatDate(item.publishTime)}`}</p>
                      </li>
                    </NavLink>
                  )
                })
              }
            </ul>
            :
            <Empty />
        }

      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    // searchInfo: state.searchInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // gainSearchInfo: bindActionCreators(gainSearchInfo, dispatch),
    // setPageNum: bindActionCreators(setPageNum, dispatch),
    // setMenuIndex: bindActionCreators(setMenuIndex, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Album);