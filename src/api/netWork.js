/*
 * @Author: RA
 * @Date: 2020-04-02 09:29:54
 * @LastEditTime: 2020-04-20 13:01:46
 * @LastEditors: RA
 * @Description: 
 */
import axios from "axios";

const Axios = axios.create({
  baseURL: 'http://139.155.89.11:443',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
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
  return new Promise((resolve, reject) => {
    Axios.post(path, params).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      }
    }).catch(err => {
      console.error(err);
      reject(err);
    });
  });
};

export const RAGet = (path, params) => {
  return new Promise((resolve, reject) => {
    Axios.get(path, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.error(err);
      reject(err);
    });
  });
};