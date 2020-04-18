/*
 * @Author: RA
 * @Date: 2020-04-02 16:54:31
 * @LastEditTime: 2020-04-18 16:56:35
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import './index.scss';
import { RAGet } from '../../api/netWork';
import { serachDefaule } from '../../api/api';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: ''
    }
  }
  componentDidMount = () => {
    this.getPlaceholder()
  }
  getPlaceholder = () => {
    RAGet(serachDefaule.api_url)
      .then(res => {
        let placeholder = res.data.realkeyword;
        this.setState({ placeholder })
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    const { placeholder } = this.state;
    return (
      <div className="search">
        <div className="search_input">
          <input type="text" placeholder={placeholder} />
        </div>
      </div>
    );
  }
}

export default Search;