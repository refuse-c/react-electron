/*
 * @Author: RA
 * @Date: 2020-06-07 01:14:11
 * @LastEditTime: 2020-06-08 16:50:10
 * @LastEditors: refuse_c
 * @Description: 歌手详情->专辑
 */
import React, { Component } from 'react';
import '../index.scss';
import { obtainId } from '../../../common/utils/format';
import { RAGet } from '../../../api/netWork';
import { artistAlbum } from '../../../api/api';
import Album from '../../../components/albumList';
class singerAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistsAlbum: {}
    }
  }
  componentDidMount = () => {
    const str = this.props.history.location.pathname;
    let id = obtainId(str, 'singerdetail');
    this.getArtistAlbum(id);
  }

  getArtistAlbum = async (id) => {
    await RAGet(artistAlbum.api_url, {
      params: {
        id: id,
        limit: 50,
      },
    }).then((res) => {
      const artistsAlbum = res.hotAlbums;
      this.setState({ artistsAlbum })
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
    const { artistsAlbum } = this.state;
    return (
      <div className="singer_album">
        <Album data={artistsAlbum} />
      </div>
    );
  }
}

export default singerAlbum;