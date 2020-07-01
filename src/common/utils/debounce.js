/*
 * @Author: RA
 * @Date: 2020-04-18 20:02:46
 * @LastEditTime: 2020-06-22 16:13:22
 * @LastEditors: refuse_c
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

// const debounce = (func, wait = 500, immediate = false) => {
//   let timeout;
//   return function () {
//     let context = this;
//     let args = arguments;

//     if (timeout) clearTimeout(timeout);
//     if (immediate) {
//       var callNow = !timeout;
//       timeout = setTimeout(() => {
//         timeout = null;
//       }, wait)
//       if (callNow) func.apply(context, args)
//     }
//     else {
//       timeout = setTimeout(function () {
//         func.apply(context, args)
//       }, wait);
//     }
//   }
// }
// module.exports = debounce;