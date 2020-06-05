/*
 * @Author: RA
 * @Date: 2020-04-20 11:14:41
 * @LastEditTime: 2020-06-05 17:41:12
 * @LastEditors: refuse_c
 * @Description: 搜索建议
 */
import React, { Component } from 'react';

import './index.scss';
// import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';


class SearchSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  sendTextAndType = (text, type) => {
    this.props.getTextAndType(text, type)
  }
  render() {
    const { songs, artists, albums, mvs, playlists } = this.props.suggestList;
    return (
      <div className="search-suggest">
        <ScrollArea
          speed={0.8}
          className="area"
          contentClassName="content"
          vertical={true}
          horizontal={true}
          minScrollSize={5}
        >
          <ul>
            {
              songs && songs ? <h3 className="songs">单曲</h3> : null
            }

            {
              songs && songs.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={this.sendTextAndType.bind(this, item.name, 1)}
                  >
                    {item.name + ' '}
                    {item.artists.map(item => item.name + '').join(' ')}
                  </li>
                )
              })
            }
            {
              artists && artists ? <h3 className="artists">歌手</h3> : null
            }
            {
              artists && artists.map((item, index) => {

                return (
                  <li
                    key={index}
                    onClick={this.sendTextAndType.bind(this, item.name, 100)}
                  >
                    {item.name + ' ' + item.alias[0]}
                  </li>
                )
              })
            }
            {
              albums && albums ? <h3 className="albums">专辑</h3> : null
            }
            {
              albums && albums.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={this.sendTextAndType.bind(this, item.name, 10)}
                  >
                    {item.name + ' ' + item.artist.name}
                  </li>
                )
              })
            }
            {
              mvs && mvs ? <h3 className="mvs">视频</h3> : null
            }
            {
              mvs && mvs.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={this.sendTextAndType.bind(this, item.name, 1014)}
                  >
                    {item.name + ' ' + item.artistName}
                  </li>
                )
              })
            }
            {
              playlists && playlists ? <h3 className="playlists">歌单</h3> : null
            }
            {
              playlists && playlists.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={this.sendTextAndType.bind(this, item.name, 1000)}
                  >
                    {item.name}
                  </li>
                )
              })
            }
          </ul >
        </ScrollArea>
      </div>
    );
  }
}

export default SearchSuggest;