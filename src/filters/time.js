const dateFormat = (date, fmt) => {
  if (date == null || date == "" || date == undefined) return null;
  try {
    //解决ios手机时间格式化NAN问题
    if (typeof date == "string" && date.indexOf("-") != -1) {
      date = date.replace(/-/g, "/");
    }
    date = new Date(date);
  } catch (e) {
    date = date;
  }
  fmt = fmt ? fmt : "yyyy-MM-dd";
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
const formatTime = (date, fmt = "yyyy-MM-dd") => {
  // let dateTime = new Date(date);
  return dateFormat(date, fmt);
};
export default {
  dateFormat,
  formatTime
};
