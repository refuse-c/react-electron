/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-05-20 13:09:35
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';

//store
import { connect } from 'react-redux';
import { imgParam } from '../../common/utils/format';
// import { bindActionCreators } from 'redux';
// import { setPageNum, gainSearchInfo, setMenuIndex } from '../../store/actions';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data } = this.props;
    return (
      <div className="album">
        <ul>
          {
            data && data.map((item, index) => {
              return (
                <li key={index}>
                  <img src={imgParam(item.picUrl, 50, 50)} alt="" />
                  <p>{item.name}</p>
                  <p>{item.artist.name}</p>
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
export default connect(mapStateToProps, mapDispatchToProps)(Album);