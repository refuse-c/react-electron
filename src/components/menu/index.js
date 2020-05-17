/*
 * @Author: RA
 * @Date: 2020-04-01 17:06:28
 * @LastEditTime: 2020-05-15 18:10:32
 * @LastEditors: RA
 * @Description: 
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-scrollbar/dist/css/scrollArea.css';
import ScrollArea from 'react-scrollbar';
import './index.scss';

// store 
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { isSHowLogin, gainUserInfo } from '../../store/actions';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handelIndex = index => {
    // console.log(index)
  }
  render() {
    const { menuList } = this.props;
    return (
      <div className="menu">
        <ScrollArea
          speed={0.8}
          className="area"
          contentClassName="content"
          vertical={true}
          horizontal={true}
          minScrollSize={5}
        >
          <ul className="menu_list">
            {
              menuList && menuList.map((item, index) => {
                return (
                  item.path !== undefined ?
                    <NavLink onClick={this.handelIndex.bind(this, index)}  activeClassName="active" key={index} to={item.id !== undefined ? item.path + item.id : item.path}>
                      <li className={`menu_item ` + item.icon} > {item.name}</li>
                    </NavLink> :
                    <h3 key={index} className="menu_title">{item.name}</h3>
                )
              })
            }
          </ul>
        </ScrollArea>
      </div >
    );
  }
}
//注册store
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    menuList: state.menuList,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {}
// }
export default connect(mapStateToProps)(Menu);