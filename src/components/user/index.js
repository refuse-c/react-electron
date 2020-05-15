/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-05-15 10:44:12
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';

//store
import { connect } from 'react-redux';
import { imgParam } from '../../common/utils/format';
// import { bindActionCreators } from 'redux';
// import { setPageNum, gainSearchInfo, setMenuIndex } from '../../store/actions';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data } = this.props;
    console.log(data)
    return (
      <div className="user">
        <ul>
          {
            data && data.map((item, index) => {
              const gender = item.gender === 1 ? 'man' : item.gender === 2 ? 'woman' : ''
              return (
                <li key={index}>
                  <img src={imgParam(item.avatarUrl, 50, 50)} alt="" />
                  <p>{item.nickname} <span className={gender}></span></p>

                  <p>{item.description || item.signature}</p>

                </li>
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
export default connect(mapStateToProps, mapDispatchToProps)(User);