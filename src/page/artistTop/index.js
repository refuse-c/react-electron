/*
 * @Author: REFUSE_C
 * @Date: 2020-06-10 09:50:41
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-10 11:25:23
 * @Description:发现 ->歌手排行榜
 */
import React, { Component } from 'react';
import { RAGet } from '../../api/netWork';
import { toplistArtist } from '../../api/api';
import { formatDate } from '../../common/utils/format';
import SingerList from '../../components/singerList';
class ArtistTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaNav: [
        {
          title: '华语'
        }, {
          title: '欧美'
        }, {
          title: '韩国'
        }, {
          title: '日本'
        }
      ],
      areaStatus: 1,
      artistList: {}
    }
  }
  componentDidMount = () => {
    this.geTtoplistArtist();
  }
  geTtoplistArtist = async (type) => {
    await RAGet(toplistArtist.api_url, {
      params: {
        type: type
      }
    }).then((res) => {
      const artistList = res.list;
      this.setState({ artistList })
    }).catch((err) => {
      console.log(err);
    });
  };
  handleMenu = (index) => {
    const { artistList: data } = this.state;
    let artistList = {}
    artistList.updateTime = data.updateTime
    this.setState({ artistList })
    this.geTtoplistArtist(index + 1);
    this.setState({ areaStatus: index + 1 })
  }
  render() {
    const { areaNav, areaStatus, artistList } = this.state;
    return (
      <div className="artist_top">
        <div className="headline">
          <p className="headline_title">云音乐歌手榜</p>
          <ul>
            {
              areaNav.map((item, index) => {
                const mvActive = areaStatus === index + 1 ? 'areaActive' : ''
                return (
                  <li className={mvActive} onClick={this.handleMenu.bind(this, index)} key={index}>{item.title}</li>
                )
              })
            }
          </ul>
          <p>{`更新时间：${formatDate(artistList.updateTime)}`}</p>
        </div>
        <div>
          {
            artistList.artists
              ? <SingerList data={artistList.artists} />
              : null
          }
        </div>
      </div>
    );
  }
}

export default ArtistTop;