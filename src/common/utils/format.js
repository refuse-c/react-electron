/*
 * @Author: RA
 * @Date: 2020-03-06 15:36:10
 * @LastEditTime: 2020-07-17 18:03:56
 * @LastEditors: refuse_c
 * @Description:
 */
let myDate = new Date();
/**
 * @param {string}
 * @return:
 * @description: 日期格式化
 */
export const formatDate = (v, type) => {
  if (isEmpty(v)) return '';
  let date = new Date(v);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  switch (type) {
    case '0':
      return year + '年' + month + '月' + day + '日';
    default:
      return year + '-' + month + '-' + day;
  }
};

/**
 * @param {string}
 * @return:
 * @description: 获取当前时间
 */
export const getCurrentDate = () => {
  let y = myDate.getFullYear();
  y = y > 10 ? y + '' : '0' + y;
  let m = myDate.getMonth();
  m = m > 10 ? m + '' : '0' + m;
  let d = myDate.getDate();
  d = d > 10 ? d + '' : '0' + d;
  let dateStr = y + m + d;
  return dateStr;
};

// 动态时间
export const formatDynamicDate = oldTime => {
  let yyyy = '';
  let hhmm = '';
  //获取今天的时间
  let _year = myDate.getFullYear(); //年份
  let _month = myDate.getMonth() + 1;//月份
  _month = _month < 10 ? '0' + _month : _month;
  let _date = myDate.getDate();//日期

  //获取传入的时间
  let oldDate = new Date(oldTime);

  console.log(oldDate)
  let old_year = oldDate.getFullYear(); //年份
  let old_month = oldDate.getMonth() + 1;//月份
  let old_date = oldDate.getDate();//日期
  let old_hour = oldDate.getHours();//小时
  let old_minu = oldDate.getMinutes();//分钟
  old_month = old_month < 10 ? '0' + old_month : old_month;
  old_date = old_date < 10 ? '0' + old_date : old_date;
  old_hour = old_hour < 10 ? '0' + old_hour : old_hour;
  old_minu = old_minu < 10 ? '0' + old_minu : old_minu;

  //昨天 今天
  const today = `${_year}-${_month}-${_date} 00:00`;
  const startTime = new Date(today);
  const nowDay = startTime - oldTime;
  if (nowDay > 0 && nowDay <= 24 * 60 * 60 * 1000) {
    yyyy = '昨天'
  } else if (nowDay < 0 && nowDay >= -24 * 60 * 60 * 1000) {
    yyyy = '今天';
  } else {
    yyyy = old_year + '-' + old_month + '-' + old_date;
  }
  // 时分秒之前
  const nowTime = myDate.getTime();
  const newTime = (nowTime - oldTime) / 1000;
  if (newTime < 60) {
    hhmm = newTime + '秒前'
  } else if (newTime < 3600) {
    hhmm = Math.floor(newTime / 60) + '分钟前'
  } else {
    hhmm = old_hour + ':' + old_minu
  }
  //  else if (newTime < 3600 * 3) {
  //   hhmm = (newTime / 3600).toFixed(1) + '小时前'
  // }
  console.log(yyyy, hhmm)
  return yyyy + '' + hhmm;


}

/**
 * @param {number}  取值范围0~1之间
 * @return:
 * @description: 随机颜色
 */
export const randomColor = (v) => {
  return (
    'rgba(' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ',' +
    (v || 1) +
    ')'
  );
};

/**
 * @param {string}
 * @return:
 * @description: 是否是数组
 */
export const isArray = (v) => {
  return toString(v) === '[object Array]';
};

/**
 * @param {*}
 * @return:
 * @description: 转换为字符
 */
export const toString = (v) => {
  return Object.prototype.toString.apply(v);
};

/**
 * @param {*}
 * @return:
 * @description: 是否为空
 */
export const isEmpty = (v, allowBlank) => {
  return (
    v === null ||
    v === undefined ||
    String(v).toUpperCase() === 'NULL' ||
    (isArray(v) && !v.length) ||
    (!allowBlank ? v === '' : false)
  );
};

/**
 * @param {number}
 * @return:
 * @description: 时间格式化
 */
export const formatPlayTime = (v) => {
  if (isEmpty(v)) {
    return v;
  }
  let m = Math.floor(v / 60);
  let s = Math.floor(v % 60);
  let mm = m < 10 ? '0' + m : m;
  let ss = s < 10 ? '0' + s : s;
  return mm + ':' + ss;
};

/**
 * @param {number}
 * @return:
 * @description: 序号格式化
 */
export const formatNum = (v) => {
  if (isEmpty(v)) {
    return v;
  }
  v = Math.floor(v);
  return v < 9 ? '0' + (v + 1) : v + 1;
  // return v < 9 ? '00' + (v + 1) : (v < 99 ? '0' + (v + 1) : v + 1);
};

/**
 * @param {string}
 * @return:
 * @description: 手机号验证
 */
export const validateMobile = (phoneNum) => {
  return !!phoneNum && /^1(3|4|5|7|8|9)\d{9}$/.test(phoneNum);
};

/**
 * @param  {string}
 * @return:
 * @description: 数字验证
 */
export const validateNumber = (num) => {
  return !!num && /^\d+?$/.test(num);
};

/**
 * @param {string}
 * @return:
 * @description: 只能输入数字
 */
export const keyPressNum = (_this) => {
  _this = _this.replace(/[^0-9]/g, '');
};

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
};

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
};

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
};

/**
 * @param {string}
 * @return:
 * @description: 歌单数据清洗
 */
export const SonglistDataCleaning = (data) => {
  if (!isEmpty(data)) {
  }
};

/**
 * @param {string}
 * @return:
 * @description: 获取设备类型
 */
export const getDevice = (data) => {
  let agent = navigator.userAgent.toLowerCase();
  let result = {
    device: (function () {
      const device = {};
      if (/windows/.test(agent)) {
        device.name = 'pc';
        device.id = '0';
      } else if (/android/.test(agent) && /mobile/.test(agent)) {
        device.name = 'android';
        device.id = '1';
      } else if (/iphone|ipod/.test(agent) && /mobile/.test(agent)) {
        device.name = 'iphone';
        device.id = '2';
      } else if (/ipad/.test(agent) && /mobile/.test(agent)) {
        device.name = 'ipad';
        device.id = '3';
      } else if (/linux/.test(agent)) {
        device.name = 'linux';
        device.id = '4';
      } else if (/mac/.test(agent)) {
        device.name = 'mac';
        device.id = '5';
      } else {
        device.name = 'other';
        device.id = 'other';
      }
      return device;
    })(),
  };
  return result;
};

/**
 * @param {number}
 * @return:
 * @description: 格式化播放次数
 */
export const formatPlaycount = (v) => {
  if (isEmpty(v)) {
    return v;
  }
  return v >= 100000 ? Math.floor(v / 10000) + '万' : v;
};

/**
 * @param {object}
 * @return:
 * @description: 循环歌手列表
 */
export const getSinger = (arr) => {
  const singerArr = [];
  arr.map((item, index) => {
    const obj = {};
    obj.id = item.id; //歌手id
    obj.name = item.name; //歌手名字
    singerArr.push(obj);
    return index.id;
  });
  return singerArr;
};

/**
 * @param {*}
 * @return:
 * @description: 不能为空||空格
 */
export const formatStr = (str) => {
  const regExp = /^[ ]+$/g;
  return str === '' ||
    str === null ||
    str === undefined ||
    str.length === 0 ||
    regExp.test(str)
    ? true
    : false;
};

/**
 * @param {string}
 * @return:
 * @description: 判断是不是数字
 */
export const formatIsNum = (str) => {
  const regExp = /^[0-9]*$/g;
  return regExp.test(str);
};

/**
 * @param {*}
 * @return:
 * @description: 图片添加param
 */
export const imgParam = (url, width, height) => {
  if (isEmpty(url)) {
    return require('../../common/images/logo.png');
  }
  const urls = url.indexOf('https') === -1 ? url.replace('http', 'https') : url;
  let w = isEmpty(width) ? 'auto' : width;
  let h = isEmpty(height) ? 'auto' : height;
  // w = w > 500 ? Math.floor(w / 5) : w;
  // h = h > 500 ? Math.floor(h / 5) : h;
  return urls + '?param=' + w + 'y' + h;
};

/**
 * @param {object}
 * @return:
 * @description: 判断是不是空对象
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 ? true : false;
};

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
    return index.id;
  });
  return ids.substring(0, ids.length - 1);
};

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
    offset: 0,
  };
  switch (type) {
    case 1:
      params.limit = 50;
      break;
    case 10:
      params.limit = 20;
      break;
    case 100:
      params.limit = 20;
      break;
    case 1000:
      params.limit = 20;
      break;
    case 1002:
      params.limit = 20;
      break;
    case 1009:
      params.limit = 10;
      break;
    case 1014:
      params.limit = 24;
      break;
    default:
      params.limit = 50;
      break;
  }
  if (isEmpty(spageNum) || spageNum === 1) {
    params.offset = 0;
  } else {
    params.offset = (spageNum - 1) * params.limit - 1;
  }
  return params;
};

/**
 * @param {string object}
 * @return:
 * @description: 数据分页返回数据总页数
 */
export const returnsongCount = (type, total) => {
  let totals = 0;
  if (isEmpty(total)) return false;
  switch (type) {
    case 1:
      totals =
        total % 50 === 0 ? Math.floor(total / 50) : Math.floor(total / 50) + 1;
      break;
    case 10:
      totals =
        total % 20 === 0 ? Math.floor(total / 20) : Math.floor(total / 20) + 1;
      break;
    case 100:
      totals =
        total % 20 === 0 ? Math.floor(total / 20) : Math.floor(total / 20) + 1;
      break;
    case 1000:
      totals =
        total % 20 === 0 ? Math.floor(total / 20) : Math.floor(total / 20) + 1;
      break;
    case 1002:
      totals =
        total % 20 === 0 ? Math.floor(total / 20) : Math.floor(total / 20) + 1;
      break;
    case 1009:
      totals =
        total % 10 === 0 ? Math.floor(total / 10) : Math.floor(total / 10) + 1;
      break;
    case 1014:
      totals =
        total % 24 === 0 ? Math.floor(total / 24) : Math.floor(total / 24) + 1;
      break;
    default:
      totals =
        total % 50 === 0 ? Math.floor(total / 50) : Math.floor(total / 50) + 1;
      break;
  }
  return totals;
};

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
    obj.st = item.privilege ? item.privilege.st : item.st || '';
    newArr.push(obj);
    return index.id;
  });
  return newArr;
};

/**
 * @param {type}
 * @return:
 * @description: 手机号码格式化
 */
export const formatTel = (val) => {
  if (val.length === 3 || val.length === 8) {
    val += ' ';
  }
  return val;
};

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
};

export const formatVideoData = (array) => {
  let newArray = [];
  if (!isArrays(array)) return false;
  array.map((item, index) => {
    let obj = {};
    obj = item.data;
    obj.alg = item.alg || '';
    obj.displayed = item.displayed || '';
    obj.extAlg = item.extAlg || '';
    obj.type = item.type || '';
    newArray.push(obj);
    return index.id;
  });
  return newArray;
};
/**
 * @param {type}
 * @return:
 * @description: 是否是数组并且有值
 */
export const isArrays = (v) => {
  if (isEmpty(v)) return false;
  // if (typeof (v).toString() !== 'object') return false;
  if (v.length >= 1) {
    return true;
  } else {
    return false;
  }
};

/**
 * @param {type}
 * @return:
 * @description:获取年/月/日/星期
 */
export const getDate = (str) => {
  switch (str) {
    case 'day':
      const day = myDate.getDate();
      const days = day < 10 ? '0' + day : day;
      return days;
    case 'week':
      const week = myDate.getDay();
      let weeks = '';
      switch (week) {
        case 1:
          weeks = '星期一';
          break;
        case 2:
          weeks = '星期二';
          break;
        case 3:
          weeks = '星期三';
          break;
        case 4:
          weeks = '星期四';
          break;
        case 5:
          weeks = '星期五';
          break;
        case 6:
          weeks = '星期六';
          break;
        default:
          weeks = '星期天';
          break;
      }
      return weeks;
    default:
      return null;
  }
};

/**
 * @param {type}
 * @return:
 * @description: 歌词解析
 */
export const foramtLrc = (array) => {
  let lrcArr = [];
  let s = '';
  let t = '';
  if (isEmpty(array)) {
    return (lrcArr = [
      {
        t: '0',
        c: '暂无歌词,请欣赏',
      },
    ]);
  }
  const lrcs = array.split('\n'); //用回车拆分成数组
  if (array.length === 0) return;
  lrcs.map((item, index) => {
    const cutSpace = item.replace(/(^\s*)|(\s*$)/g, ''); //去除前后空格
    t = cutSpace.substring(cutSpace.indexOf('[') + 1, cutSpace.indexOf(']')); //取[]间的内容
    s = t.split(':'); //分离: 前后文字
    if (isNaN(parseInt(s[0]))) {
      //不是数值
      for (let i in lrcArr) {
        if (i !== 'ms' && i === s[0].toLowerCase()) {
          lrcArr[i] = s[1];
        }
      }
    } else {
      let start = 0;
      const arr = item.match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
      arr.map((item, index) => {
        start += item.length; //计算歌词位置
        return index.id;
      });
      const content = item.substring(start); //获取歌词内容
      arr.map((item, index) => {
        t = item.substring(1, item.length - 1); //取[]间的内容
        s = t.split(':'); //分离:前后文字
        lrcArr.push({
          //对象{t:时间,c:歌词}加入ms数组
          t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
          // c: isEmpty(content) ? '~ ~ ~ ~ ~ ~ ~ ~' : content,
          c: content,
        });
        return index.id;
      });
    }
    return index.id;
  });
  lrcArr.sort(function (a, b) {
    //按时间顺序排序
    return a.t - b.t;
  });
  return lrcArr;
};

/**
 * @param {type}
 * @return:
 * @description: 获取当前行的歌词
 */

export const getTimeIndex = (timeArr, time) => {
  let timeIndex = -1;
  const length = timeArr.length;
  const currentTime = Number(time) + 0.2;
  for (let i = 0; i < length; i++) {
    if (timeArr[i].t >= currentTime) {
      timeIndex = i - 1;
      break;
    } else {
      timeIndex = i;
    }
  }
  return Number(timeIndex);
};

/**
 * @param {type}
 * @return:
 * @description: 筛选出对应风格的tag
 */

export const formatArr = (dataist, object) => {
  let newList = [];
  for (const key in object) {
    const arr = dataist.filter((item) => item.category === Number(key));
    if (arr.length > 0) {
      newList.push({
        title: object[key],
        list: arr,
      });
    }
  }
  return newList;
};
/**
 * @description:
 * @param {type}
 * @return:格式化总页数
 */
export const formatTotal = (total, num) => {
  const nums = isEmpty(num) ? 50 : num;
  return total % nums === 0
    ? Math.floor(total / nums)
    : Math.floor(total / nums) + 1;
};

//数据存储
export const setLocal = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};
export const getLocal = (name) => {
  return JSON.parse(window.localStorage.getItem(name));
};
export const setSession = (name, data) => {
  window.sessionStorage.setItem(name, JSON.stringify(data));
};
export const getSession = (name) => {
  return JSON.parse(window.sessionStorage.getItem(name));
};

// 校验是否都是数字
export const IsNum = (value) => {
  var reg = new RegExp('^[0-9]*$');
  return reg.test(value) ? true : false;
};
export const a = (str) => {
  switch (str) {
    case '全部':
      return '-1';
    case '华语':
      return '7';
    case '欧美':
      return '96';
    case '日本':
      return '8';
    case '韩国':
      return '16';
    default:
      return '0';
  }
};
export const b = (str) => {
  switch (str) {
    case '全部':
      return '-1';
    case '男歌手':
      return '1';
    case '女歌手':
      return '2';
    default:
      return '3';
  }
};
export const c = (str) => {
  switch (str) {
    case '热门':
      return '-1';
    case '#':
      return '0';
    default:
      return str.toLowerCase();
  }
};

// id获取
export const obtainId = (url, separator) => {
  let id = url.split(separator)[1];
  if (id.indexOf('/') !== -1) {
    return id.split('/')[0];
  } else {
    return id;
  }
};
// 动态类型
export const formatDynamicType = (type) => {
  switch (Number(type)) {
    case 13:
      return '分享歌单';
    case 17:
      return '分享节目';
    case 18:
      return '分享单曲';
    case 19:
      return '分享专辑';
    case 21:
      return '分享视频';
    case 22:
      return '转发';
    case 24:
      return '分享专栏文章';
    case 28:
      return '分享节目';
    case 35:
      return '发布动态';
    case 39:
      return '发布视频';
    case 41:
      return '分享视频';
    default:
      return '';
  }
};

// 18 分享单曲
// 19 分享专辑
// 17、28 分享电台节目
// 22 转发
// 39 发布视频
// 35、13 分享歌单
// 24 分享专栏文章
// 41、21 分享视频
export const formatArrayNull = (str) => {
  const array = str.split("#");
  return array.filter((item) => item);
}
//页面跳转详情
export const jumpDetails = (that, type, id) => {
  let pathname = '';
  switch (type) {
    case 'user': pathname = `/home/userdetail${id}`; break;
    case 'album': pathname = `/home/albumdetail${id}`; break;
    case 'singer': pathname = `/home/singerdetail${id}`; break;
    case 'event': pathname = `/home/userevent${id}`; break;
    case 'mv': pathname = `/home/allMv${id}`; break;
    case 'video': pathname = `/videoDetail${id}`; break;
    default: pathname = '/home/find'; break
  }
  that.props.history.push({ pathname })
}