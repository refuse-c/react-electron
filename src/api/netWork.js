/*
 * @Author: RA
 * @Date: 2020-04-02 09:29:54
 * @LastEditTime: 2020-09-19 13:45:15
 * @LastEditors: REFUSE_C
 * @Description: 
 */
import axios from "axios";
import { message } from 'antd';
import { isEmpty } from "../common/utils/format";
const Axios = axios.create({
  baseURL: 'http://103.52.154.247:3000',
  withCredentials: true,
  headers: {},
});


// 添加响应拦截器
Axios.interceptors.response.use(
  (res) => {
    if (isEmpty(res)) return;
    if (res.status === 200 || res.status === '200') {
      return res
    } else {
      return
    }
  }, err => {
    console.dir(err)
    let { data } = err.response;
    if (data.code === 301 || data.code === '301') {
      message.destroy();
      message.error(data && data.msg)
    }
    return err;
  }
);

export const RAPost = (path, params) => {
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
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
};