/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-05-14 18:48:09
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
import { imgParam } from '../../common/utils/format';

//store
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { setPageNum, gainSearchInfo, setMenuIndex } from '../../store/actions';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data } = this.props;
    return (
      <div className="video">
        <ul>
          {
            data && data.map((item, index) => {
              return (
                <li key={index}>
                  <img src={imgParam(item.coverUrl,160,90)} alt="" />
                  <h4>{item.title}</h4>
                  <p>by {item.creator[0].userName}</p>
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
export default connect(mapStateToProps, mapDispatchToProps)(Video);