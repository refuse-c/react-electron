/*
 * @Author: RA
 * @Date: 2020-04-18 20:02:46
 * @LastEditTime: 2020-04-18 20:02:47
 * @LastEditors: RA
 * @Description: 
 */
let timeout = null
const debounce = (cb, wait = 500) => {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(() => {
    timeout = null
    cb && cb()
  }, wait);
}
module.exports = debounce;