/*
 * @Author: RA
 * @Date: 2020-06-07 01:15:21
 * @LastEditTime: 2020-06-08 20:30:36
 * @LastEditors: RA
 * @Description: 歌手详情->相似歌手
 */

import React, { Component } from 'react';
import '../index.scss';
import { RAGet } from '../../../api/netWork';
import { simiArtist } from '../../../api/api';
import { obtainId } from '../../../common/utils/format';
import Singer from '../../../components/singerList';
class SimiSinger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistsList: {},
    };
  }
  componentDidMount = () => {
    const id = obtainId(window.location.href, 'singerdetail');
    this.getSimiArtist(id);
  };
  componentWillUnmount() {
    // 卸载异步操作设置状态
    this.setState = (state, callback) => {
      return;
    };
  }

  getSimiArtist = (id) => {
    RAGet(simiArtist.api_url, {
      params: { id: id },
    })
      .then((res) => {
        const artistsList = res.artists;
        this.setState({ artistsList });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { artistsList } = this.state;
    return (
      <div className="simi_singer">
        <Singer data={artistsList} history={this.props.history} type={`true`} />
      </div>
    );
  }
}

export default SimiSinger;
