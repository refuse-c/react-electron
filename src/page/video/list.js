/*
 * @Author: REFUSE_C
 * @Date: 2020-05-25 13:46:36
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-11 16:08:11
 * @Description:发现->歌单->歌单tag
 */
import React, { Component } from 'react';
import './index.scss';

// import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setShowPopStatus, setVideoText } from '../../store/actions';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentText: '全部视频',
    };
  }

  stopBubbling = (e) => {
    e.stopPropagation();
  };
  chooseItem = (item) => {
    this.props.setShowPopStatus('');
    this.props.setVideoText(item);
  };
  render() {
    const { data, videoText } = this.props;
    return (
      <div className="all_list" onClick={this.stopBubbling.bind(this)}>
        <ScrollArea
          speed={1}
          className="area"
          ref={(ref) => (this.content = ref)}
        >
          <div className="lists">
            <p
              className={videoText.split('RA')[0] === '全部视频' ? 'a' : 'b'}
              onClick={this.chooseItem.bind(this, '全部视频RA')}
            >
              全部视频
            </p>
            <ul>
              {
                data.map((item, index) => {
                  let active = item.name === videoText.split('RA')[0] ? 'a' : 'b';
                  return (
                    <li
                      className={active}
                      onClick={this.chooseItem.bind(this, `${item.name}RA${item.id}`)}
                      key={'item' + index}
                    >
                      {item.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </ScrollArea>
      </div >
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    videoText: state.videoText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowPopStatus: bindActionCreators(setShowPopStatus, dispatch),
    setVideoText: bindActionCreators(setVideoText, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(List);
