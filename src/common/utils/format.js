/*
 * @Author: RA
 * @Date: 2020-03-06 15:36:10
 * @LastEditTime: 2020-04-22 15:32:58
 * @LastEditors: RA
 * @Description: 
 */

/**
 * 日期格式化
 * @param {string} v 时间戳
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
* 获取当前时间
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
* 随机颜色
* @param {number} v 取值范围0~1之间
*/
export const randomColor = (v) => {
  return 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + (v || 1) + ')';
}

/**
* 是否是数组
* @param {string} v 
*/
export const isArray = (v) => {
  return toString(v) === '[object Array]';
}

/**
* 转换为字符
* @param {*} v 
*/
export const toString = (v) => {
  return Object.prototype.toString.apply(v);
}

/**
* 是否为空
* @param {*} v 
* @param {*} allowBlank 
*/
export const isEmpty = (v, allowBlank) => {
  return v === null || v === undefined || String(v).toUpperCase() === 'NULL' || ((isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
}

/**
* 时间格式化
* @param {number} v 
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
* 序号格式化
* @param {number} v 
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
* 手机号验证
* @param {string} phoneNum 手机号
*/
export const validateMobile = (phoneNum) => {
  return !!phoneNum && /^1(3|4|5|7|8|9)\d{9}$/.test(phoneNum);
}

/**
* 数字验证
* @param {string} num 数字
*/
export const validateNumber = (num) => {
  return !!num && /^\d+?$/.test(num);
}
/**
* 只能输入数字
* @param {string} _this 
*/
export const keyPressNum = (_this) => {
  _this = _this.replace(/[^0-9]/g, '');
}

/**
* 验证是否为中文字符
* @param {string} str 字符
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

// 校验手机号码是否合法
export const isMobileNumber = (tel) => {
  const myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
  if (myreg.test(tel)) {
    return true;
  } else {
    return false;
  }
}

// 校验身份证号码
export const isIDCard = (val) => {
  const isIDCard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (isIDCard.test(val)) {
    return true;
  } else {
    return false;
  }
}
//歌单数据清洗
export const SonglistDataCleaning = (data) => {
  if (!isEmpty(data)) {

  }
}

//获取设备类型
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

//格式化播放次数
export const fomatPlaycount = (v) => {
  if (isEmpty(v)) {
    return v;
  }
  return v >= 10000 ? parseFloat(v / 10000).toFixed(1) + '万' : v
}


//循环歌手列表
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

//不能为空||空格
export const fomatStr = (str) => {
  const regExp = /^[ ]+$/g;
  return (str === '' || str === null || str === undefined || str.length === 0 || regExp.test(str)) ? true : false
}

// 判断是不是数字
export const fomatIsNum = (str) => {
  const regExp = /^[0-9]*$/g;
  return regExp.test(str)
}

//图片添加param
export const imgParam = (url, width, height) => {
  const w = isEmpty(width) ? '100' : width;
  const h = isEmpty(height) ? '100' : height;
  return url + '?param=' + w + 'y' + h;
}

// 判断是不是空对象
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 ? true : false;
}

// 组装音乐id
export const AssembleIds = (arr) => {
  console.log(arr)
  if (isEmpty(arr)) return;
  let ids = '';
  arr.map((item, index) => {
    ids += item.id + ',';
    return index.id
  })
  return ids.substring(0, ids.length - 1);
}