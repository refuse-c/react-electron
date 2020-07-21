/*
 * @Author: RA
 * @Date: 2020-03-06 16:01:25
 * @LastEditTime: 2020-07-21 15:07:33
 * @LastEditors: refuse_c
 * @Description: 
 */
function resetWidth() {
  var baseWidth = document.documentElement.clientWidth || document.body.clientWidth;
  document.documentElement.style.fontSize = baseWidth / 375 * 100 + 'px'
  console.log(baseWidth / 375 * 100)
}
resetWidth();
window.addEventListener('resize', function () {
  resetWidth();
})     