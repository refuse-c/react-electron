/*
 * @Author: RA
 * @Date: 2020-03-06 15:36:10
 * @LastEditTime: 2020-05-06 23:47:02
 * @LastEditors: RA
 * @Description: 
 */

/**
 * @param {string}
 * @return: 
 * @description: 日期格式化
 */
export const fomatDate = (v) => {
  if (isEmpty(v)) return '';
  let date = new Date(v);
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return year + '-' + month + '-' + day
}

/**
 * @param {string} 
 * @return: 
 * @description: 获取当前时间
 */
export const getCurrentDate = () => {
  let myDate = new Date();
  let y = myDate.getFullYear();
  y = y > 10 ? y + '' : '0' + y;
  let m = myDate.getMonth();
  m = m > 10 ? m + '' : '0' + m;
  let d = myDate.getDate();
  d = d > 10 ? d + '' : '0' + d;
  let dateStr = y + m + d;
  return dateStr;
};

/**
 * @param {number}  取值范围0~1之间
 * @return: 
 * @description: 随机颜色
 */
export const randomColor = (v) => {
  return 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + (v || 1) + ')';
}

/**
 * @param {string} 
 * @return: 
 * @description: 是否是数组
 */
export const isArray = (v) => {
  return toString(v) === '[object Array]';
}

/**
 * @param {*} 
 * @return: 
 * @description: 转换为字符
 */
export const toString = (v) => {
  return Object.prototype.toString.apply(v);
}

/**
 * @param {*} 
 * @return: 
 * @description: 是否为空
 */
export const isEmpty = (v, allowBlank) => {
  return v === null || v === undefined || String(v).toUpperCase() === 'NULL' || ((isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
}

/**
 * @param {number} 
 * @return: 
 * @description: 时间格式化
 */
export const formatPlayTime = (v) => {
  if (isEmpty(v)) {
    return v;
  }
  let m = parseInt(v / 60);
  let s = parseInt(v % 60);
  let mm = m < 10 ? '0' + m : m;
  let ss = s < 10 ? '0' + s : s;
  return mm + ':' + ss
}

/**
 * @param {number} 
 * @return: 
 * @description: 序号格式化
 */
export const formatNum = (v) => {
  if (isEmpty(v)) {
    return v;
  }
  v = parseInt(v);
  return v < 9 ? '0' + (v + 1) : (v + 1);
  // return v < 9 ? '00' + (v + 1) : (v < 99 ? '0' + (v + 1) : v + 1);
}

/**
 * @param {string}
 * @return: 
 * @description: 手机号验证
 */
export const validateMobile = (phoneNum) => {
  return !!phoneNum && /^1(3|4|5|7|8|9)\d{9}$/.test(phoneNum);
}

/**
 * @param  {string} 
 * @return: 
 * @description: 数字验证
 */
export const validateNumber = (num) => {
  return !!num && /^\d+?$/.test(num);
}

/**
 * @param {string} 
 * @return: 
 * @description: 只能输入数字
 */
export const keyPressNum = (_this) => {
  _this = _this.replace(/[^0-9]/g, '');
}

/**
 * @param {string} 
 * @return: 
 * @description: 验证是否为中文字符
 */
export const validateCNEN = (str) => {
  if (!str) {
    return false;
  }
  const dotIndex = str.indexOf('·');
  const isRightDot = dotIndex > 0 && dotIndex !== str.length - 1;
  str = isRightDot ? str.replace('·', '') : str;
  return /^[\u4e00-\u9fa5_a-zA-Z]+$/.test(str);
}

/**
 * @param {number} 
 * @return: 
 * @description: 校验手机号码是否合法
 */
export const isMobileNumber = (tel) => {
  const myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
  if (myreg.test(tel)) {
    return true;
  } else {
    return false;
  }
}

/**
 * @param {string} 
 * @return: 
 * @description: 校验身份证号码
 */
export const isIDCard = (val) => {
  const isIDCard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (isIDCard.test(val)) {
    return true;
  } else {
    return false;
  }
}

/**
 * @param {string} 
 * @return: 
 * @description: 歌单数据清洗
 */
export const SonglistDataCleaning = (data) => {
  if (!isEmpty(data)) {

  }
}

/**
 * @param {string} 
 * @return: 
 * @description: 获取设备类型
 */
export const getDevice = (data) => {
  let agent = navigator.userAgent.toLowerCase();
  let result = {
    device: function () {
      const device = {}
      if (/windows/.test(agent)) {
        device.name = 'pc'
        device.id = '0'
      } else if (/android/.test(agent) && /mobile/.test(agent)) {
        device.name = 'android'
        device.id = '1'
      } else if (/iphone|ipod/.test(agent) && /mobile/.test(agent)) {
        device.name = 'iphone'
        device.id = '2'
      } else if (/ipad/.test(agent) && /mobile/.test(agent)) {
        device.name = 'ipad'
        device.id = '3'
      } else if (/linux/.test(agent)) {
        device.name = 'linux'
        device.id = '4'
      } else if (/mac/.test(agent)) {
        device.name = 'mac'
        device.id = '5'
      } else {
        device.name = 'other'
        device.id = 'other'
      }
      return device
    }(),
  }
  return result;
}

/**
 * @param {number} 
 * @return: 
 * @description: 格式化播放次数
 */
export const fomatPlaycount = (v) => {
  if (isEmpty(v)) {
    return v;
  }
  return v >= 10000 ? parseFloat(v / 10000).toFixed(1) + '万' : v
}

/**
 * @param {object} 
 * @return: 
 * @description: 循环歌手列表
 */
export const getSinger = (arr) => {
  const singerArr = []
  arr.map((item, index) => {
    const obj = {}
    obj.id = item.id//歌手id
    obj.name = item.name//歌手名字
    singerArr.push(obj)
    return index.id
  })
  return singerArr
}

/**
 * @param {*} 
 * @return: 
 * @description: 不能为空||空格
 */
export const fomatStr = (str) => {
  const regExp = /^[ ]+$/g;
  return (str === '' || str === null || str === undefined || str.length === 0 || regExp.test(str)) ? true : false
}

/**
 * @param {string} 
 * @return: 
 * @description: 判断是不是数字
 */
export const fomatIsNum = (str) => {
  const regExp = /^[0-9]*$/g;
  return regExp.test(str)
}

/**
 * @param {*} 
 * @return: 
 * @description: 图片添加param
 */
export const imgParam = (url, width, height) => {
  const w = isEmpty(width) ? '100' : width;
  const h = isEmpty(height) ? '100' : height;
  return url + '?param=' + w + 'y' + h;
}

/**
 * @param {object} 
 * @return: 
 * @description: 判断是不是空对象
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 ? true : false;
}

/**
 * @param {object} 
 * @return: 
 * @description: 组装音乐id
 */
export const AssembleIds = (arr) => {
  if (isEmpty(arr)) return;
  let ids = '';
  arr.map((item, index) => {
    ids += item.id + ',';
    return index.id
  })
  return ids.substring(0, ids.length - 1);
}

/**
 * @param {string string number} 
 * @return: 
 * @description: 分页传参
 */
export const pagingParams = (keyword, type, spageNum) => {
  // type 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
  let params = {
    keywords: keyword,
    type: type,
    limit: 0,
    offset: 0
  }
  switch (type) {
    case 1: params.limit = 50; break;
    case 10: params.limit = 20; break;
    case 100: params.limit = 20; break;
    case 1000: params.limit = 20; break;
    case 1002: params.limit = 20; break;
    case 1009: params.limit = 10; break;
    case 1014: params.limit = 24; break;
    default: params.limit = 50; break;
  }
  if (isEmpty(spageNum) || spageNum === 1) {
    params.offset = 0
  } else {
    params.offset = ((spageNum - 1) * params.limit) - 1
  }
  return params;
}

/**
 * @param {string object} 
 * @return: 
 * @description: 数据分页返回数据总页数
 */
export const returnsongCount = (type, resultList) => {
  let total = 0;
  if (isEmpty(resultList)) return;
  switch (type) {
    case 1: total = resultList.songCount % 50 === 0 ? parseInt(resultList.songCount / 50) : parseInt(resultList.songCount / 50) + 1; break;
    case 10: total = resultList.albumCount % 20 === 0 ? parseInt(resultList.albumCount / 20) : parseInt(resultList.albumCount / 20) + 1; break;
    case 100: total = resultList.artistCount % 20 === 0 ? parseInt(resultList.artistCount / 20) : parseInt(resultList.artistCount / 20) + 1; break;
    case 1000: total = resultList.playlistCount % 20 === 0 ? parseInt(resultList.playlistCount / 20) : parseInt(resultList.playlistCount / 20) + 1; break;
    case 1002: total = resultList.userprofileCount % 20 === 0 ? parseInt(resultList.userprofileCount / 20) : parseInt(resultList.userprofileCount / 20) + 1; break;
    case 1009: total = resultList.djRadiosCount % 10 === 0 ? parseInt(resultList.djRadiosCount / 10) : parseInt(resultList.djRadiosCount / 10) + 1; break;
    case 1014: total = resultList.videoCount % 24 === 0 ? parseInt(resultList.videoCount / 24) : parseInt(resultList.videoCount / 24) + 1; break;
    default: total = resultList.songCount % 50 === 0 ? parseInt(resultList.songCount / 50) : parseInt(resultList.songCount / 50) + 1; break;
  }
  return total;
}

/**
 * @param {type} 
 * @return: 
 * @description: 数据筛选
 */
export const dataScreening = (arr) => {
  if (isEmpty(arr)) return;
  var newArr = [];
  arr.map((item, index) => {
    const obj = {};
    obj.id = item.id || '';
    obj.name = item.name || '';
    obj.al = item.album || item.al || '';
    obj.ar = item.artists || item.ar || '';
    obj.dt = item.duration || item.dt;
    obj.mv = item.mv || item.mvid || '';
    obj.index = index;
    newArr.push(obj);
    return index.id
  });
  return newArr;
}


/**
 * @param {type} 
 * @return: 
 * @description: 手机号码格式化
 */
export const formatTel = (val) => {
  if (val.length === 3 || val.length === 8) {
    val += " ";
  }
  return val;
}