/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-17 16:42:45
 * @Description:检索->用户
 */
import React, { Component } from 'react';
import './index.scss';
import Empty from '../../components/empty';

//store
import { connect } from 'react-redux';
import { imgParam, isArrays, jumpDetails } from '../../common/utils/format';
// import { bindActionCreators } from 'redux';
// import { setPageNum, gainSearchInfo, setMenuIndex } from '../../store/actions';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  gotouserDetail = item => {
    jumpDetails(this, 'user', item.userId)
  }
  render() {
    const { data } = this.props;
    return (
      <div className="user">
        {
          isArrays(data) ?
            <ul>
              {
                data && data.map((item, index) => {
                  const gender = item.gender === 1 ? 'man' : item.gender === 2 ? 'woman' : ''
                  return (
                    <li key={index} onClick={this.gotouserDetail.bind(this, item)}>
                      <img src={imgParam(item.avatarUrl, 50, 50)} alt="" />
                      <p>{item.nickname} <span className={gender}></span></p>

                      <p>{item.description || item.signature}</p>

                    </li>
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
export default connect(mapStateToProps, mapDispatchToProps)(User);