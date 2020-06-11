/*
 * @Author: REFUSE_C
 * @Date: 2020-05-29 16:21:35
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-06-11 16:09:14
 * @Description:视频->VIDEO
 */
import React, { Component } from 'react';
import { RAGet } from '../../api/netWork';
import { videoGroupList, videoGroup, videoCategory, videoAll } from '../../api/api';
import { formatVideoData, isEmpty } from '../../common/utils/format';
import MvList from '../../components/mvList';
import List from './list';


// store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setShowPopStatus, setVideoText } from '../../store/actions';
class ComponentVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoText: '全部视频',
      videoGroupList: {},
      categoryList: {},
      videoList: {},
      ids: '',
      offset: 0,
    }
  }
  componentDidMount = () => {
    this.getVideoGroupList();
    this.getVideoCategory();
    this.getVideoAll(0);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { videoText } = nextProps;
    if (videoText !== prevState.videoText) {
      return {
        videoText,
        props: {
          videoText: videoText,
        },
      };
    }
    return null;
  }
  componentDidUpdate(prevState) {
    if (prevState.videoText !== this.state.videoText) {
      this.setState({ videoList: {}, offset: 0 })
      const { videoText } = this.state;
      const ids = videoText.split('RA')[1];
      console.log(ids)
      if (isEmpty(ids)) {
        this.getVideoAll(0);
      } else {
        this.getVideoGroup(ids, 0)
      }
    }
  }

  // 全部视频
  getVideoAll = (offset) => {
    this.setState({ offset })
    RAGet(videoAll.api_url, {
      params: { offset: offset * 8 }
    }).then(res => {
      let obj = []
      const { videoList } = this.state;
      if (videoList.list) {
        obj.list = videoList.list.concat(res.datas);
      } else {
        obj.list = res.datas;
      }
      obj.more = res.hasmore;
      this.setState({ videoList: obj })
    }).catch(err => {
      console.log(err)
    })
  }
  // 视频标签列表
  getVideoGroupList = () => {
    RAGet(videoGroupList.api_url)
      .then(res => {
        const videoGroupList = res.data
        this.setState({ videoGroupList })
      }).catch(err => {
        console.log(err)
      })
  }
  //视频分类列表
  getVideoCategory = () => {
    RAGet(videoCategory.api_url)
      .then(res => {
        const categoryList = res.data;
        this.setState({ categoryList })
      }).catch(err => {
        console.log(err)
      })
  }
  // 单个标签数据
  getVideoGroup = (ids, offset) => {
    this.setState({ ids, offset: offset })
    RAGet(videoGroup.api_url, {
      params: {
        id: ids,
        offset: offset * 8
      }
    }).then(res => {
      let obj = []
      const { videoList } = this.state;
      if (videoList.list) {
        obj.list = videoList.list.concat(res.datas);
      } else {
        obj.list = res.datas;
      }
      obj.more = res.hasmore;
      this.setState({ videoList: obj })
    }).catch(err => {
      console.log(err)
    })
  }
  handleMore = () => {
    const { ids, offset } = this.state;
    const num = offset + 1
    if (isEmpty(ids)) {
      this.getVideoAll(num);
    } else {
      this.getVideoGroup(ids, num)
    }
  };
  handleChoose = (item) => {
    this.setState({ videoList: {}, offset: 0 })
    this.props.setShowPopStatus('');
    this.props.setVideoText(`${item.name}RA${item.id}`);
    const { offset } = this.state;
    this.getVideoGroup(item.id, offset)
  }
  showPlop = () => {
    this.props.setShowPopStatus('song_list')
  }
  render() {
    const path = '/videoDetail';
    const { videoText, categoryList, videoList, videoGroupList } = this.state;
    console.log(videoGroupList)
    const { showPlop } = this.props;
    const list = formatVideoData(videoList.list)
    return (
      <div className="components_video">
        {showPlop === 'song_list' && videoGroupList ? (
          <List data={videoGroupList} />
        ) : null}
        <h3 className="song_list_text" onClick={this.showPlop}>
          {videoText.split('RA')[0]}
        </h3>
        <div className="tags">
          分类：
           <ul>
            {
              categoryList.length > 0 && categoryList.map((item, index) => {
                let active = item.name === videoText.split('RA')[0] ? 'active' : '';
                return (
                  <li
                    key={index}
                    className={active}
                    onClick={this.handleChoose.bind(this, item)}
                  >
                    {item.name}
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div>
          {
            list.length > 0 ? <MvList data={list} path={path} /> : null
          }
        </div>
        {
          videoList.more === true ? (
            <span className="load_more" onClick={this.handleMore}>
              点我加载更多喔,不信你试试 ꒰⑅•ᴗ•⑅꒱
            </span>
          ) : videoList.more === false ? (
            <span className="load_more" onClick={this.handleMore}>
              没有更多的啦,不要划了(＞﹏＜)
            </span>
          ) : null
        }
      </div>
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    showPlop: state.showPlop,
    videoText: state.videoText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowPopStatus: bindActionCreators(setShowPopStatus, dispatch),
    setVideoText: bindActionCreators(setVideoText, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ComponentVideo);