/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-05-19 21:25:56
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';

//store
import { connect } from 'react-redux';
import { imgParam } from '../../common/utils/format';
// import { bindActionCreators } from 'redux';
// import { setPageNum, gainSearchInfo, setMenuIndex } from '../../store/actions';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data } = this.props;
    return (
      <div className="list">
        <ul>
          {
            data && data.map((item, index) => {
              const path = '/home/single';
              return (
                <NavLink to={path + item.id}>
                  <li key={index}>
                    <img src={imgParam(item.coverImgUrl, 50, 50)} alt="" />
                    <p>{item.name}</p>
                    <p>{item.trackCount}</p>
                    <p>by {item.creator.nickname}</p>
                  </li>
                </NavLink>
              )
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
export default connect(mapStateToProps, mapDispatchToProps)(List);