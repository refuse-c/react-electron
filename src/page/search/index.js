/*
 * @Author: RA
 * @Date: 2020-04-02 16:54:31
 * @LastEditTime: 2020-04-19 19:03:29
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { searchDefaule, search, searchSuggest, searchHot } from '../../api/api';
import { isEmpty } from '../../common/utils/format';
import HotAndHistory from './hotAndHistory';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      hotList: '',
      historyList: JSON.parse(window.localStorage.getItem('historyList')) || [],
      placeholder: ''
    }
  }
  componentDidMount = () => {
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
  // get child parameters
  getChildVal = inputVal => {
    this.getSearch(inputVal);
    this.setState({ inputVal });
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
    const { inputVal, placeholder } = this.state;
    let val = inputVal;
    if (keycode === 13) {
      if (isEmpty(val)) {
        val = placeholder;
        this.setState({ inputVal: placeholder });
      } else {
        val = inputVal;
      }
      this.getSearch(val);
    }
  }
  //change input value
  changeInput = e => {
    let inputVal = e.target.value.trim();
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
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  // search
  getSearch = val => {
    this.historyList(val)
    RAGet(search.api_url, {
      params: {
        keywords: val
      }
    }).then(res => {
      console.log(res)
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
    const { inputVal, hotList, historyList, placeholder } = this.state;
    return (
      <div className="search">
        <div className="search_input">
          <input
            type="text"
            ref={input => this.input = input}
            onChange={this.changeInput}
            value={inputVal}
            onKeyPress={this.keyPress}
            placeholder={placeholder} />
        </div>
        <HotAndHistory
          hotList={hotList}
          historyList={historyList}
          getIndex={this.getIndex.bind(this)}
          getChildVal={this.getChildVal.bind(this)}
        />
      </div>
    );
  }
}

export default Search;