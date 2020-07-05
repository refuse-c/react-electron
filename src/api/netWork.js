/*
 * @Author: RA
 * @Date: 2020-04-02 09:29:54
 * @LastEditTime: 2020-07-05 17:55:01
 * @LastEditors: RA
 * @Description: 
 */
import axios from "axios";
import { message } from 'antd';
const Axios = axios.create({
  baseURL: 'https://xiangbh.cn:3389/',
  withCredentials: true,
  headers: {},
});


// 请求拦截器
Axios.interceptors.request.use((res) => {
  // global.showLoading()
  return res
}, (err) => {
  // global.hideLoading()
  console.log(err)
})

//添加响应拦截器
Axios.interceptors.response.use(
  (res) => {
    // global.hideLoading()
    return res
  }, err => {
    // global.hideLoading()
    console.log(err)
  }
);

export const RAPost = (path, params) => {
  message.destroy();
  message.info('loading')
  return new Promise((resolve, reject) => {
    Axios.post(path, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
};

export const RAGet = (path, params) => {
  return new Promise((resolve, reject) => {
    Axios.get(path, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err);
    });
  });
};