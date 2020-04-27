/*
 * @Author: RA
 * @Date: 2020-04-02 16:54:31
 * @LastEditTime: 2020-04-26 11:25:55
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { searchDefaule, search, searchSuggest, searchHot } from '../../api/api';
import { isEmpty, isEmptyObject, pagingParams } from '../../common/utils/format';
import HotAndHistory from './hotAndHistory';
import SearchSuggest from './searchSuggest';
import SearchInfo from './searchInfo';
import Empty from '../../components/empty';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      searchType: 1, //搜索类型；默认为 1; 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
      hotList: [], // 热搜
      resultList: [],
      suggestList: [], // 搜索建议
      pageStatus: 1, // 1 hotAndHistory  2 searchSuggest 3 searchResult // 4 empty
      placeholder: '', // input 初始值
      showsuggest: false,//是否显示搜索建议
      historyList: JSON.parse(window.localStorage.getItem('historyList')) || [], // 历史搜索
    }
  }
  componentDidMount = () => {
    // let arr = ['张三', '李四', '王五', 'a', 'd', 'c', '小红', '小明'];
    // console.log(arr.sort())
    this.getSearchHot();
    this.getPlaceholder();
  }
  // historyList
  historyList = str => {
    const { historyList } = this.state;
    const array = JSON.parse(JSON.stringify(historyList));
    for (let i in array) {
      if (!isEmpty(array) && array[i] === str) {
        array.splice(i, 1)
      }
    }
    array.unshift(str);
    this.setState({ historyList: array })
    window.localStorage.setItem('historyList', JSON.stringify(array));
  }
  getCurrentPage(currentPage) {
    const { inputVal, searchType } = this.state;
    this.getSearch(inputVal ,searchType, currentPage)
  }
  // get child parameters
  getChildVal = inputVal => {
    this.getSearch(inputVal, 1);
    this.setState({ inputVal, searchType: 1 });
  }
  getTextAndType = (text, type) => {
    this.getSearch(text, type);
    this.setState({ inputVal: text, searchType: type });
  }
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
  }
  // get index
  getIndex = index => {
    const { historyList } = this.state;
    const array = JSON.parse(JSON.stringify(historyList));
    index === 'all' ? array.splice(index, array.length) : array.splice(index, 1);
    this.setState({ historyList: array })
    window.localStorage.setItem('historyList', JSON.stringify(array));
  }
  //enter search
  keyPress = e => {
    let keycode = e.which || e.keyCode;
    const { inputVal, placeholder, searchType } = this.state;
    if (isEmpty(inputVal)) this.setState({ showsuggest: false })
    let val = inputVal;
    if (keycode === 13) {
      if (isEmpty(val)) {
        val = placeholder;
        this.setState({ inputVal: placeholder });
      } else {
        val = inputVal;
      }
      this.getSearch(val, searchType,1);
    }
  }
  //change input value
  changeInput = e => {
    let inputVal = e.target.value.trim();
    if (isEmpty(inputVal)) {
      this.setState({ pageStatus: 1 })
    }
    this.setState({ inputVal })
    global.debounce(() => this.getSearchSuggest(inputVal))
  }
  // search suggest
  getSearchSuggest = val => {
    if (isEmpty(val)) return;
    RAGet(searchSuggest.api_url, {
      params: {
        keywords: val
      }
    }).then(res => {
      const suggestList = JSON.parse(JSON.stringify(res.result));
      isEmptyObject(res.result) ? this.setState({ showsuggest: false, suggestList }) : this.setState({ showsuggest: true, suggestList })
    }).catch(err => {
      console.log(err)
    })
  }
  // search
  getSearch = (keywords, type,currentPage) => {
    this.historyList(keywords);
    this.setState({ showsuggest: false, pageStatus: 3 });
    RAGet(search.api_url, {
      params: pagingParams(keywords, type,currentPage)
    }).then(res => {
      console.log(res)
      const resultList = JSON.parse(JSON.stringify(res.result));
      this.setState({ resultList })
    }).catch(err => {
      console.log(err)
    })
  }
  // hot search
  getSearchHot = () => {
    RAGet(searchHot.api_url)
      .then(res => {
        let hotList = res.data;
        this.setState({ hotList })
      }).catch(err => {
        console.log(err)
      })
  }
  //defult serach
  getPlaceholder = () => {
    RAGet(searchDefaule.api_url)
      .then(res => {
        let placeholder = res.data.realkeyword;
        this.setState({ placeholder })
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    const { inputVal, hotList, historyList, suggestList, showsuggest, placeholder, pageStatus, searchType, resultList } = this.state;
    return (
      <div className="search">
        <div className="search_input">
          <input
            type="text"
            ref={input => this.input = input}
            onChange={this.changeInput}
            value={inputVal}
            onKeyUp={this.keyPress}
            placeholder={placeholder} />
        </div>
        <div className="search-content">
          {
            pageStatus === 1 ?
              <HotAndHistory
                hotList={hotList}
                historyList={historyList}
                getIndex={this.getIndex.bind(this)}
                getChildVal={this.getChildVal.bind(this)}
              />
              :
              pageStatus === 3 ?
                <SearchInfo pageCallbackFn={this.getCurrentPage.bind(this)} getType={this.getType.bind(this)} searchType={searchType} resultList={resultList} />
                :
                <Empty msg={`123211313`} />
          }
          {
            showsuggest ?
              <SearchSuggest suggestList={suggestList} getTextAndType={this.getTextAndType.bind(this)} />
              : null
          }
        </div>
      </div>
    );
  }
}

export default Search;