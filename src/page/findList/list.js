/*
 * @Author: REFUSE_C
 * @Date: 2020-05-25 13:46:36
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-09 16:28:05
 * @Description:发现->歌单->歌单tag
 */
import React, { Component } from 'react';
import './index.scss';

// import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setShowPopStatus, setSonglstText } from '../../store/actions';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentText: '全部歌单',
    };
  }

  stopBubbling = (e) => {
    e.stopPropagation();
  };
  chooseItem = (text) => {
    this.props.setShowPopStatus('');
    this.props.setSonglstText(text);
  };
  render() {
    const { data, songListText } = this.props;
    return (
      <div className="all_list" onClick={this.stopBubbling.bind(this)}>
        <ScrollArea
          speed={1}
          className="area"
          ref={(ref) => (this.content = ref)}
        >
          <div className="lists">
            <p
              className={songListText === '全部歌单' ? 'a' : 'b'}
              onClick={this.chooseItem.bind(this, '全部歌单')}
            >
              全部歌单
            </p>
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div key={'list' + index}>
                    <h3>{item.title}</h3>
                    <ul>
                      {item.list.map((item, index) => {
                        let active = item.name === songListText ? 'a' : 'b';
                        return (
                          <li
                            className={active}
                            onClick={this.chooseItem.bind(this, item.name)}
                            key={'item' + index}
                          >
                            {item.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        </ScrollArea>
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    songListText: state.songListText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowPopStatus: bindActionCreators(setShowPopStatus, dispatch),
    setSonglstText: bindActionCreators(setSonglstText, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(List);
