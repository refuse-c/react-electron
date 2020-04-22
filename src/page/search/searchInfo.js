/*
 * @Author: RA
 * @Date: 2020-04-21 14:01:33
 * @LastEditTime: 2020-04-22 15:34:22
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import MusicList from '../../components/musicList';
import { AssembleIds } from '../../common/utils/format';
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
      }, {
        name: '电台',
        type: 1009
      }, {
        name: '用户',
        type: 1002
      }],
      activeStatus: 1,
      resultList: []
      //搜索类型；默认为 1; 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
    }
  }
  componentDidMount = () => {
    const { resultList, searchType } = this.props;
    console.log(this.props)
    this.setState({ resultList, activeStatus: searchType })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.resultList)
    const { resultList } = nextProps;
    this.setState({ resultList })
  }

  sendType = (type) => {
    this.setState({ activeStatus: type })
    this.props.getType(type);
  }
  render() {
    const { siNavList, activeStatus, resultList } = this.state;
    const musicIds = AssembleIds(this.state.resultList.songs);
    console.log(this.state.resultList.songs, musicIds)
    return (
      <div className="search-info">
        <ul className="si-nav">
          {siNavList.map((item, index) => {
            const style = Number(activeStatus) === item.type ? 'si-item-active' : ''
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
            activeStatus === 1 && musicIds ?
              <MusicList musicIds={musicIds} />
              :
              activeStatus === 100 ?
                resultList.artists && resultList.artists.map((item, index) => {
                  return (
                    <li
                      key={index}
                    >
                      {item.name}
                    </li>
                  )
                }) :
                activeStatus === 10 ?
                  resultList.albums && resultList.albums.map((item, index) => {
                    return (
                      <li
                        key={index}
                      >
                        {item.name}
                      </li>
                    )
                  }) :
                  activeStatus === 1014 ?
                    resultList.videos && resultList.videos.map((item, index) => {
                      return (
                        <li
                          key={index}
                        >
                          {item.title}
                        </li>
                      )
                    }) :
                    activeStatus === 1000 ?
                      resultList.playlists && resultList.playlists.map((item, index) => {
                        return (
                          <li
                            key={index}
                          >
                            {item.name}
                          </li>
                        )
                      }) :
                      activeStatus === 1009 ?
                        resultList.djRadios && resultList.djRadios.map((item, index) => {
                          return (
                            <li
                              key={index}
                            >
                              {item.name}
                            </li>
                          )
                        }) :
                        activeStatus === 1002 ?
                          resultList.userprofiles && resultList.userprofiles.map((item, index) => {
                            return (
                              <li
                                key={index}
                              >
                                {item.nickname}
                              </li>
                            )
                          }) : null
          }
        </ul>
      </div>
    );
  }
}

export default SearchInfo;