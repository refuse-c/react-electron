/*
 * @Author: RA
 * @Date: 2020-04-02 16:54:31
 * @LastEditTime: 2020-06-05 11:39:34
 * @LastEditors: refuse_c
 * @Description:检索页
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { searchDefaule, search, searchSuggest, searchHot } from '../../api/api';
import {
  isEmpty,
  isEmptyObject,
  pagingParams,
  getLocal,
  setLocal,
} from '../../common/utils/format';
import HotAndHistory from './hotAndHistory';
import SearchSuggest from './searchSuggest';
import SearchInfo from './searchInfo';
import Empty from '../../components/empty';

//store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setPageNum,
  gainSearchInfo,
  setMenuIndex,
  setTotal,
} from '../../store/actions';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: this.props.searchInfo.searchText || '',
      searchType: 1, //搜索类型；默认为 1; 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
      pageNum: 1,
      hotList: [], // 热搜
      resultList: [],
      suggestList: [], // 搜索建议
      pageStatus: 1, // 1 hotAndHistory  2 searchSuggest 3 searchResult // 4 empty
      placeholder: '', // input 初始值
      showsuggest: false, //是否显示搜索建议
      historyList: getLocal('historyList') || [], // 历史搜索
    };
  }
  componentDidMount = () => {
    this.getSearchHot();
    this.getPlaceholder();
    const { searchInfo } = this.props;
    if (isEmpty(Object.keys(searchInfo))) return;
    this.setState({ pageStatus: 3 });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { pageNum } = nextProps;
    if (pageNum !== prevState.pageNum) {
      return {
        pageNum,
        props: {
          pageNum: pageNum,
        },
      };
    }
    return null;
  }
  componentDidUpdate(prevState) {
    // 更新分页时
    if (prevState.pageNum !== this.state.pageNum) {
      const { pageNum } = this.state;
      const { inputVal } = this.state;
      const { menuIndex } = this.props;
      this.getSearch(inputVal, menuIndex, pageNum);
    }
  }

  // historyList
  historyList = (str) => {
    const { historyList } = this.state;
    const array = JSON.parse(JSON.stringify(historyList));
    for (let i in array) {
      if (!isEmpty(array) && array[i] === str) {
        array.splice(i, 1);
      }
    }
    array.unshift(str);
    this.setState({ historyList: array });
    setLocal('historyList', array);
  };
  //历史/热门 搜索
  getChildVal = (inputVal) => {
    this.getSearch(inputVal, 1);
    this.setState({ inputVal, searchType: 1 });
    this.props.setPageNum(1);
    this.props.setMenuIndex(1);
  };
  //搜索建议
  getTextAndType = (text, type) => {
    this.getSearch(text, type);
    this.props.setMenuIndex(type);
    this.setState({ inputVal: text, searchType: type });
    this.props.setPageNum(1);
  };

  getType = (type) => {
    const { inputVal, placeholder } = this.state;
    let val = inputVal;
    if (isEmpty(val)) {
      val = placeholder;
      this.setState({ inputVal: placeholder });
    } else {
      val = inputVal;
    }
    this.getSearch(val, type);
    this.setState({ searchType: type });
  };
  // get index
  getIndex = (index) => {
    const { historyList } = this.state;
    const array = JSON.parse(JSON.stringify(historyList));
    index === 'all'
      ? array.splice(index, array.length)
      : array.splice(index, 1);
    this.setState({ historyList: array });
    setLocal('historyList', array);
  };
  //enter search
  keyPress = (e) => {
    let keycode = e.which || e.keyCode;
    const { inputVal, placeholder } = this.state;
    if (isEmpty(inputVal)) this.setState({ showsuggest: false });
    let val = inputVal;
    if (keycode === 13) {
      global.debounce(() => null, 0);
      if (isEmpty(val)) {
        val = placeholder;
        this.setState({ inputVal: placeholder });
      } else {
        val = inputVal;
      }
      const { menuIndex } = this.props;
      // console.log(index)
      this.props.setPageNum(1);
      this.getSearch(val, menuIndex, 1);
    }
  };
  //change input value
  changeInput = (e) => {
    let inputVal = e.target.value.trim();
    if (isEmpty(inputVal)) {
      this.setState({ pageStatus: 1 });
    }
    this.setState({ inputVal });
    global.debounce(() => this.getSearchSuggest(inputVal));
  };
  // search suggest
  getSearchSuggest = (val) => {
    if (isEmpty(val)) return;
    RAGet(searchSuggest.api_url, {
      params: {
        keywords: val,
      },
    })
      .then((res) => {
        const suggestList = JSON.parse(JSON.stringify(res.result));
        isEmptyObject(res.result)
          ? this.setState({ showsuggest: false, suggestList })
          : this.setState({ showsuggest: true, suggestList });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // search
  getSearch = (keywords, type, pageNum) => {
    //清空数据
    this.props.gainSearchInfo({});
    const pageNums = isEmpty(pageNum) ? 1 : pageNum;
    this.historyList(keywords);
    // this.props.setMenuIndex(type);
    RAGet(search.api_url, {
      params: pagingParams(keywords, type, pageNums),
    })
      .then((res) => {
        if (res.code !== 200) return;
        this.setState({ showsuggest: false, pageStatus: 3 });
        const data = res.result;
        let searchInfo = {
          pageNum: pageNums,
          searchText: keywords,
        };
        switch (Number(type)) {
          case 1:
            searchInfo.menuIndex = 0;
            if (data) {
              this.props.setTotal(data.songCount);
              searchInfo.singleArr = data.songs || [];
            } else {
              this.props.setTotal(0);
              searchInfo.singleArr = [];
            }
            break; //1: 单曲
          case 10:
            searchInfo.menuIndex = 1;
            if (data) {
              this.props.setTotal(data.albumCount);
              searchInfo.albumArr = data.albums || [];
            } else {
              this.props.setTotal(0);
              searchInfo.albumArr = [];
            }
            break; //10: 专辑
          case 100:
            searchInfo.menuIndex = 2;
            if (data) {
              this.props.setTotal(data.artistCount);
              searchInfo.singerArr = data.artists || [];
            } else {
              this.props.setTotal(0);
              searchInfo.singerArr = [];
            }

            break; //100: 歌手
          case 1000:
            searchInfo.menuIndex = 3;
            if (data) {
              this.props.setTotal(data.playlistCount);
              searchInfo.listArr = data.playlists || [];
            } else {
              this.props.setTotal(0);
              searchInfo.listArr = [];
            }
            break; //1000: 歌单
          case 1002:
            searchInfo.menuIndex = 4;
            if (data && data.userprofileCount) {
              this.props.setTotal(data.userprofileCount);
              searchInfo.userArr = data.userprofiles || [];
            } else {
              this.props.setTotal(0);
              searchInfo.userArr = [];
            }
            break; //1002: 用户
          case 1009:
            searchInfo.menuIndex = 5;
            if (data) {
              this.props.setTotal(data.djRadiosCount);
              searchInfo.djArr = data.djRadios || [];
            } else {
              this.props.setTotal(0);
              searchInfo.djArr = [];
            }
            break; //1009: 电台
          case 1014:
            searchInfo.menuIndex = 6;
            if (data && data.videoCount) {
              this.props.setTotal(data.videoCount);
              searchInfo.videoArr = data.videos || [];
            } else {
              this.props.setTotal(0);
              searchInfo.videoArr = [];
            }
            break; //1014: 视频
          default:
            searchInfo.menuIndex = 7;
            if (data) {
              this.props.setTotal(data.songCount);
              searchInfo.singleArr = data.songs || [];
            } else {
              this.props.setTotal(0);
              searchInfo.singleArr = [];
            }
            break;
        }
        this.props.gainSearchInfo(searchInfo);
        //搜索类型；默认为 1; 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
        // const resultList = JSON.parse(JSON.stringify(res.result));
        // this.setState({ resultList })
      })
      .catch((err) => {
        console.log(err);
        this.props.setTotal(null);
      });
  };
  // hot search
  getSearchHot = () => {
    RAGet(searchHot.api_url)
      .then((res) => {
        let hotList = res.data;
        this.setState({ hotList });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //defult serach
  getPlaceholder = () => {
    RAGet(searchDefaule.api_url)
      .then((res) => {
        let placeholder = res.data.realkeyword;
        this.setState({ placeholder });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const {
      inputVal,
      hotList,
      historyList,
      suggestList,
      showsuggest,
      placeholder,
      pageStatus,
    } = this.state;
    return (
      <div className="search">
        <div className="search_input">
          <input
            type="text"
            ref={(input) => (this.input = input)}
            onChange={this.changeInput}
            value={inputVal}
            onKeyUp={this.keyPress}
            placeholder={placeholder}
          />
        </div>
        <div className="search-content">
          {pageStatus === 1 ? (
            <HotAndHistory
              hotList={hotList}
              historyList={historyList}
              getIndex={this.getIndex.bind(this)}
              getChildVal={this.getChildVal.bind(this)}
            />
          ) : pageStatus === 3 ? (
            <SearchInfo getType={this.getType.bind(this)} /> //searchType={searchType} resultList={resultList}  pageCallbackFn={this.getCurrentPage.bind(this)}
          ) : (
                <Empty msg={`123211313`} />
              )}
          {showsuggest ? (
            <SearchSuggest
              suggestList={suggestList}
              getTextAndType={this.getTextAndType.bind(this)}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    searchInfo: state.searchInfo,
    pageNum: state.pageNum,
    menuIndex: state.menuIndex,
    total: state.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gainSearchInfo: bindActionCreators(gainSearchInfo, dispatch),
    setPageNum: bindActionCreators(setPageNum, dispatch),
    setMenuIndex: bindActionCreators(setMenuIndex, dispatch),
    setTotal: bindActionCreators(setTotal, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
