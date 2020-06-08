/*
 * @Author: RA
 * @Date: 2020-06-07 01:14:11
 * @LastEditTime: 2020-06-08 20:06:23
 * @LastEditors: RA
 * @Description: 歌手详情->mv
 */
import React, { Component } from 'react';
import '../index.scss';
import { obtainId } from '../../../common/utils/format';
import { RAGet } from '../../../api/netWork';
import { artistMv } from '../../../api/api';
import Video from '../../../components/videoList';
class singerMv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistMvList: {}
    }
  }
  componentDidMount = () => {
    const id = obtainId(window.location.href, 'singerdetail')
    this.getArtistMv(id);
  }

  getArtistMv = async (id) => {
    await RAGet(artistMv.api_url, {
      params: {
        id: id,
        limit: 50,
      },
    }).then((res) => {
      const artistMvList = res.mvs;
      this.setState({ artistMvList })
    }).catch((err) => {
      console.log(err);
    });
  };
  componentWillUnmount() {
    // 卸载异步操作设置状态
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { artistMvList } = this.state;
    return (
      <div className="singer_mv">
        <Video data={artistMvList} />
      </div>
    );
  }
}

export default singerMv;