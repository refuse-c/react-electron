/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-07-08 16:01:31
 * @Description:评论组件
 */
import React, { Component } from 'react';
import './index.scss';
// import Empty from '../empty';

//store
import { connect } from 'react-redux';
import { imgParam, formatDate } from '../../common/utils/format';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data } = this.props;
    return (
      <div className="comment">
        <ul className="comment-list">
          {data.hotComments && data.hotComments.map((item, index) => {
            console.log(item)
            return (
              <li
                key={index}
                className="comment-item"
              >
                <img src={imgParam(item.user.avatarUrl, 40, 40)} alt="" />
                <div className="comment-info">
                  <div className='commenter'>
                    <p className="commenter-name">{item.user.nickname}：</p>
                    <p className="commenter-text">{item.content}</p>
                  </div>
                  {
                    item.beReplied.length > 0
                      ? <div className="replyer">
                        <p className='replyer-name commenter-name'>@{item.beReplied[0].user.nickname}：</p>
                        <p className='replyer-text commenter-text'>{item.beReplied[0].content}</p>
                      </div>
                      : ''
                  }
                  <div className="comment-tools">
                    <p>{formatDate(item.time)}</p>
                    <ul className="ct-list">
                      <li className="ct-item">点赞</li>
                      <li className="ct-item">分享</li>
                      <li className="ct-item">回复</li>
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
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
export default connect(mapStateToProps, mapDispatchToProps)(Comment);