const utils = {
  setLocalStorageAndTime(key, value) {
    window.localStorage.setItem(
      key,
      JSON.stringify({ data: value, time: new Date().getTime() })
    );
  },
  getLocalStorageAndTime(key, exp = 86400000) {
    // 获取数据
    let data = window.localStorage.getItem(key);
    if (!data) return null;
    let dataObj = JSON.parse(data);
    // 与过期时间比较
    if (new Date().getTime() - dataObj.time > exp) {
      // 过期删除返回null
      this.removeLocalStorage(key);
      return null;
    } else {
      return dataObj.data;
    }
  },
  removeLocalStorage(key) {
    window.localStorage.setItem(key, null);
  }
};
export default utils;
