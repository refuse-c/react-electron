/*
 * @Author: RA
 * @Date: 2020-04-24 12:07:27
 * @LastEditTime: 2020-04-24 16:04:15
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react'
import './index.scss';
class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1, //当前页码
      groupCount: 5, //页码分组，显示7个页码，其余用省略号显示
      startPage: 1,  //分组开始页码
      totalPage: 1 //总页数
    }
  }
  // componentWillMount() {
  //   const totalPage = this.props.totalPage;
  //   this.setState({ totalPage })
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { totalPage } = nextProps;
    if (totalPage !== prevState.totalPage) {
      return {
        totalPage,
        props: {
          totalPage
        }
      }
    }
    return null;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.totalPage !== this.props.totalPage) {
      this.setState({ totalPage:this.props.totalPage })
    }
  }
  // 点击页码
  pageClick(currentPage) {
    const { groupCount } = this.state
    const getCurrentPage = this.props.pageCallbackFn;
    //当 当前页码 大于 分组的页码 时，使 当前页 前面 显示 两个页码
    let startPage = currentPage >= groupCount ? currentPage - 2 : 1
    this.setState({
      startPage,
      currentPage
    })
    //将当前页码返回父组件
    getCurrentPage(currentPage)
  }
  //上一页事件
  prePageHandeler() {
    let { currentPage } = this.state
    if (currentPage === 1) return;
    this.pageClick(--currentPage)
  }
  //下一页事件
  nextPageHandeler() {
    let { currentPage, totalPage } = this.state
    if (currentPage === totalPage) return;
    this.pageClick(++currentPage)
  }
  // 获取从父组件传来的总页数与当前页数
  componentDidMount() {
    this.setState({
      currentPage: this.props.currentPage,
      totalPage: this.props.totalPage
    })
  }
  render() {
    const { groupCount, startPage, currentPage, totalPage } = this.state;
    let pages = []

    // 如果当前面不是第一页 则添加上一页
    // if (currentPage !== 1) {
    pages.push(<li onClick={this.prePageHandeler.bind(this)} key={0}> 上一页</li>)
    // }

    /*总页码小于等于10时，全部显示出来*/
    if (totalPage <= 10) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(<li key={i} onClick={this.pageClick.bind(this, i)}
          className={currentPage === i ? "activePage" : null}>{i}</li>)
      }
    } else {/*总页码大于10时，部分显示*/

      //第一页
      pages.push(<li className={currentPage === 1 ? "activePage" : null} key={1}
        onClick={this.pageClick.bind(this, 1)}>1</li>)

      //前面省略号(当当前页码比分组的页码大时显示省略号)
      if (currentPage >= groupCount) {
        pages.push(<li className="" key={-1}>···</li>)
      }
      //非第一页和最后一页显示
      for (let i = currentPage - 2; i < currentPage + 3; i++) {
        if (i <= totalPage - 1 && i > 1) {
          pages.push(<li className={currentPage === i ? "activePage" : null} key={i}
            onClick={this.pageClick.bind(this, i)}>{i}</li>)
        }
      }
      //后面省略号
      if (totalPage - startPage >= groupCount + 1) {
        pages.push(<li className="" key={-2}>···</li>)
      }
      //最后一页
      pages.push(<li className={currentPage === totalPage ? "activePage" : null} key={totalPage}
        onClick={this.pageClick.bind(this, totalPage)}>{totalPage}</li>)
    }

    //如果当前面不是最后一页 则添加下一页
    // if (currentPage !== totalPage) {
    pages.push(<li onClick={this.nextPageHandeler.bind(this)} key={totalPage + 1}>下一页</li>)
    // }
    return (
      <div className="pagination">
        <ul>{pages}</ul>
      </div>
    )
  }
}
export default Pagination;