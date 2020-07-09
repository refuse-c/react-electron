/*
 * @Author: RA
 * @Date: 2020-05-16 22:35:46
 * @LastEditTime: 2020-07-03 10:56:06
 * @LastEditors: refuse_c
 * @Description: 每日推荐歌曲
 */
import React, { Component } from 'react';
import './index.scss';
import ScrollArea from 'react-scrollbar';
import { getDate, dataScreening } from '../../common/utils/format';
import { RAGet } from '../../api/netWork';
import { recommendSong } from '../../api/api';
import MusicList from '../../components/musicList';
import PlayAll from '../../components/playAll';
class DailySpecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommended: {
        name: '每日歌曲推荐',
        day: getDate('day'),
        week: getDate('week'),
        picUrl: require('../../common/images/transparent.jpg'),
        copywriter: '根据您的音乐口味生成,每天6:00更新',
      },
      recommendList: {}
    }
  }

  componentDidMount = () => {
    this.getRecommendSong();
  }

  getRecommendSong = () => {
    RAGet(recommendSong.api_url, {})
      .then(res => {
        const recommendList = dataScreening(res.recommend)
        this.setState({ recommendList })
      }).catch(err => {
        // console.log(err)
      })
  }

  render() {
    const { recommended, recommendList } = this.state;
    return (
      <div className="daily-special">
        <ScrollArea
          speed={1}
          className="area"
          ref={ref => (this.content = ref)}
        >
          <div className="content">
            <div className="content-left">
              <p>{recommended.week}</p>
              <h3>{recommended.day}</h3>
            </div>
            <div className="content-right">
              <h3>{recommended.name}</h3>
              <p>{recommended.copywriter}</p>
            </div>
          </div>
          <div className="tool">
            <PlayAll
              cls={`btn1`}
              text={`播放全部`}
              list={recommendList}
            />
            {/* <h3 onClick={this.playAll}>播放全部</h3> */}

            <p>收藏全部</p>
          </div>
          <div className="subassembly-style">
            {recommendList.length > 0 && recommendList ?
              <MusicList muscicList={recommendList} />
              :
              null
            }
          </div>
        </ScrollArea>
      </div>
    );
  }
}
export default DailySpecial;