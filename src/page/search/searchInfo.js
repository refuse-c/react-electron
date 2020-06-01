/*
 * @Author: RA
 * @Date: 2020-04-21 14:01:33
 * @LastEditTime: 2020-06-01 16:56:56
 * @LastEditors: refuse_c
 * @Description: 
 */
import React, { Component } from 'react';
import Singer from '../../components/singer';
import { dataScreening, returnsongCount } from '../../common/utils/format';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import Pagination from '../../components/pagination';
import MusicList from '../../components/musicList';
import Video from '../../components/video';
import Album from '../../components/album';
import List from '../../components/list';
import User from '../../components/user';


//store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gainSearchInfo, setMenuIndex, setPageNum } from '../../store/actions';
class SearchInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siNavList: [{
        name: '单曲',
        type: 1
      }, {
        name: '歌手',
        type: 100
      }, {
        name: '专辑',
        type: 10
      }, {
        name: '视频',
        type: 1014
      }, {
        name: '歌单',
        type: 1000
      },
      //  {
      //   name: '电台',
      //   type: 1009
      // },
      {
        name: '用户',
        type: 1002
      }],
      activeStatus: 1,
      resultList: [],
      currentPage: 0
      //搜索类型；默认为 1; 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
    }
  }
  componentDidMount = () => {

  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { resultList } = nextProps;
  //   if (resultList !== prevState.resultList) {
  //     return { resultList }
  //   }
  //   return null;
  // }

  sendType = (type) => {
    // this.setState({ activeStatus: type });
    this.props.getType(type);
    this.props.setMenuIndex(type);
    this.props.setPageNum(1);
  }
  // getCurrentPage(currentPage) {
  //   const getCurrentPage = this.props.pageCallbackFn;
  //   getCurrentPage(currentPage);
  //   this.setState({ currentPage });
  // }
  render() {
    const { siNavList } = this.state;
    const { menuIndex, searchInfo, pageNum, total } = this.props;// singleArr, singerArr, albumArr, videoArr, listArr, djArr, userArr,
    return (
      <div className="search-info">
        <div className="rolling-box">
          <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="content"
            vertical={true}
            horizontal={true}
            minScrollSize={5}
          >
            <ul className="si-nav">
              {siNavList.map((item, index) => {
                const style = Number(menuIndex) === item.type ? 'si-item-active' : ''
                return (
                  <li
                    key={index}
                    onClick={this.sendType.bind(this, item.type)}
                    className={'si-item ' + style}
                  >
                    {item.name}
                  </li>
                )
              })}
            </ul>
            <ul>
              {
                // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
                menuIndex === 1 && searchInfo.singleArr ?
                  <MusicList muscicList={dataScreening(searchInfo.singleArr)} pageNum={pageNum} />
                  :
                  menuIndex === 10 && searchInfo.albumArr ?
                    <Album data={searchInfo.albumArr} />
                    :
                    menuIndex === 100 && searchInfo.singerArr ?
                      <Singer data={searchInfo.singerArr} />
                      :
                      menuIndex === 1000 && searchInfo.listArr ?
                        <List data={searchInfo.listArr} />
                        :
                        //   menuIndex === 1009 ?
                        //  :
                        menuIndex === 1002 && searchInfo.userArr ?
                          <User data={searchInfo.userArr} />
                          :
                          menuIndex === 1014 && searchInfo.videoArr ?
                            <Video data={searchInfo.videoArr} />
                            :
                            null
              }
            </ul>
          </ScrollArea>
        </div>
        {
          !returnsongCount(menuIndex, total) || returnsongCount(menuIndex, total) === 1 ?
            null
            :
            <Pagination totalPage={returnsongCount(menuIndex, total)} pageNum={1} />
        }
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    searchInfo: state.searchInfo,
    menuIndex: state.menuIndex,
    pageNum: state.pageNum,
    total: state.total
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gainSearchInfo: bindActionCreators(gainSearchInfo, dispatch),
    setMenuIndex: bindActionCreators(setMenuIndex, dispatch),
    setPageNum: bindActionCreators(setPageNum, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchInfo);