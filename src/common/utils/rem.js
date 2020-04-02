/*
 * @Author: RA
 * @Date: 2020-03-06 16:01:25
 * @LastEditTime: 2020-03-06 23:46:16
 * @LastEditors: RA
 * @Description: 
 */
function resetWidth() {
  // 兼容ie浏览器 document.body.clientWidth
  var baseWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // console.log(baseWidth);
  // 默认的设置是375px(ip6)的根元素设为100px, 其他的手机都相对这个进行调整
  document.documentElement.style.fontSize = baseWidth / 375 * 100 + 'px'
  console.log(baseWidth / 375 * 100)
}
resetWidth();
window.addEventListener('resize', function () {
  resetWidth();
})     