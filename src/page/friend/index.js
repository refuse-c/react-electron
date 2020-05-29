/*
 * @Author: REFUSE_C
 * @Date: 2020-04-03 15:13:06
 * @LastEditors: RA
 * @LastEditTime: 2020-04-29 13:19:49
 * @Description:
 */
import React, { Component } from 'react';
import './index.scss';
class Frind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          name: '订单提示',
          child: [
            {
              name: '您有新订单'
            },
            {
              name: '您有新订单'
            },
            {
              name: '您有新订单'
            }
          ]
        }, {
          name: '商品提示',
          child: [
            {
              name: '您有新订单'
            },
            {
              name: '您有新订单'
            },
            {
              name: '您有新订单'
            }
          ]
        }, {
          name: '商城提示',
          child: [
            {
              name: '您有新订单'
            },
            {
              name: '您有新订单'
            },
            {
              name: '您有新订单'
            }
          ]
        }, {
          name: '广告提示',
          child: [
            {
              name: '您有新订单'
            },
            {
              name: '您有新订单'
            },
            {
              name: '您有新订单'
            }
          ]
        }, {
          name: '会员提示',
          child: [
            {
              name: '您有新订单'
            },
            {
              name: '您有新订单'
            },
            {
              name: '您有新订单'
            }
          ]
        },
      ]
    }
  }
  render() {
    const { list } = this.state
    return (
      <div className="frind">
        <ul>
          {
            list.map((item, index) => {
              return (
                <li key={index}>
                  <p>{item.name}</p>
                  <ul>
                    {
                      item.child.map((item, index) => <p key={index}>{item.name}</p>)
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Frind;