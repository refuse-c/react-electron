/*
 * @Author: RA
 * @Date: 2020-03-06 15:36:10
 * @LastEditTime: 2020-05-16 22:25:54
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
export const returnsongCount = (type, total) => {
  let totals = 0;
  if (isEmpty(total)) return;
  switch (type) {
    case 1: totals = total % 50 === 0 ? parseInt(total / 50) : parseInt(total / 50) + 1; break;
    case 10: totals = total % 20 === 0 ? parseInt(total / 20) : parseInt(total / 20) + 1; break;
    case 100: totals = total % 20 === 0 ? parseInt(total / 20) : parseInt(total / 20) + 1; break;
    case 1000: totals = total % 20 === 0 ? parseInt(total / 20) : parseInt(total / 20) + 1; break;
    case 1002: totals = total % 20 === 0 ? parseInt(total / 20) : parseInt(total / 20) + 1; break;
    case 1009: totals = total % 10 === 0 ? parseInt(total / 10) : parseInt(total / 10) + 1; break;
    case 1014: totals = total % 24 === 0 ? parseInt(total / 24) : parseInt(total / 24) + 1; break;
    default: totals = total % 50 === 0 ? parseInt(total / 50) : parseInt(total / 50) + 1; break;
  }
  return totals;
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
    obj.picUrl = '';
    obj.st = item.st;
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

/**
 * @param {obj obj} 
 * @return: obj
 * @description:合并相同元素的object 
 */
export const aa = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i].id === arr2[j].id) {
        // arr1[i].id = arr2[j].id;
        // arr1[i].fee = arr2[j].fee;
        // arr1[i].payed = arr2[j].payed;
        arr1[i].st = arr2[j].st;
        // arr1[i].pl = arr2[j].pl;
        // arr1[i].dl = arr2[j].dl;
        // arr1[i].sp = arr2[j].sp;
        // arr1[i].cp = arr2[j].cp;
        // arr1[i].subp = arr2[j].subp;
        // arr1[i].cs = arr2[j].cs;
        // arr1[i].maxbr = arr2[j].maxbr;
        // arr1[i].fl = arr2[j].fl;
        // arr1[i].toast = arr2[j].toast;
        // arr1[i].flag = arr2[j].flag;
        // arr1[i].preSell = arr2[j].preSell;
        // arr1[i].playMaxbr = arr2[j].playMaxbr;
        // arr1[i].downloadMaxbr = arr2[j].downloadMaxbr;
        break;
      }
    }
  }
  return arr1;
}

/**
 * @param {type} 
 * @return: 
 * @description: 是否是数组并且有值
 */
export const isArrays = (v) => {
  if (isEmpty(v)) return false;
  // if (typeof (v).toString() !== 'object') return false;
  if (v.length >= 1) {
    return true
  } else {
    return false
  }
}

/**
 * @param {type}
 * @return:
 * @description:获取年/月/日/星期
 */

export const getDate = (str) => {
  const date = new Date()
  switch (str) {
    case 'day':
      const day = date.getDate();
      const days = day < 10 ? '0' + day : day;
      return days;
    case 'week':
      const week = date.getDay();
      let weeks = '';
      switch (week) {
        case 1: weeks = '星期一'; break;
        case 2: weeks = '星期二'; break;
        case 3: weeks = '星期三'; break;
        case 4: weeks = '星期四'; break;
        case 5: weeks = '星期五'; break;
        case 6: weeks = '星期六'; break;
        default: weeks = '星期天'; break;
      }
      return weeks;
    default: return null;
  }
}