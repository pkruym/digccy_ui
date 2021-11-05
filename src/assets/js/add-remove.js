export const addNum = function(num1, num2) {
  // let addvalue=1;
  // for (let index = 0; index < num2; index++) {
  //     addvalue=addvalue/10;
  // }
  // return (Number(num1)+Number(addvalue)).toFixed(num2);
  var r1, r2, m, n;
  try {
    r1 = num1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((num1 * m + num2 * m) / m).toFixed(n);
};
// 加法
export const accAdd = (num1, num2) => {
  var baseNum, baseNum1, baseNum2;
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(baseNum2);
};
/**
 * 减法
 * @param arg1
 * @param arg2
 * @returns
 */
export const accSub = (arg1, arg2) => {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  let val = ((arg1 * m - arg2 * m) / m).toFixed(n);
  if (val == "0.0") {
    val = 0;
  }
  return val;
};

export const subtr = function(arg1, arg2) {
  if (arg1 == 0) return;

  // let addvalue=1;
  // for (let index = 0; index < arg2; index++) {
  //     addvalue=addvalue/10;
  // }
  // return (arg1-addvalue).toFixed(arg2)
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
export const isPositiveIntegerTimes = function(arg1, arg2) {
  if (arg1 < arg2) {
    var flag = arg1;
    arg1 = arg2;
    arg2 = arg1;
  }
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}

  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  var times = (r1 / r2) * Math.pow(10, t2 - t1);

  if (!/(^[1-9]\d*$)/.test(times.toString())) {
    return false;
  } else {
    return true;
  }
};

let multiply = (a, b) => {
  let m = 0,
    c = a.toString(),
    d = b.toString();

  try {
    m += c.split(".")[1].length;
  } catch (e) {}

  try {
    m += d.split(".")[1].length;
  } catch (e) {}

  return (
    (Number(c.replace(".", "")) * Number(d.replace(".", ""))) / Math.pow(10, m)
  );
};
export const accDiv = function(a, b) {
  let m = 0,
    c = a.toString(),
    d = b.toString();

  try {
    m += c.split(".")[1].length;
  } catch (e) {}

  try {
    m += d.split(".")[1].length;
  } catch (e) {}

  return (
    (Number(c.replace(".", "")) * Number(d.replace(".", ""))) / Math.pow(10, m)
  );
};
/**
 * 保留小数位，默认两位
 * @param {*} num
 * @param {*} n
 */
export const toFixedStr = (num, n = 2) => {
  num = Number(num) || 0;
  num = num.toString();
  let result = "";
  if (n == 0) {
    return num.split(".")[0];
  }
  let zeroResult = n => {
    let zero = "";
    for (let i = 0; i < n; i++) {
      zero += "0";
    }
    return zero;
  };
  if (num % 1 == 0) {
    //整数
    result = num + "." + zeroResult(n);
  } else {
    //小数
    let num1 = num.split(".");
    if (num1.length > 0 && num1[1].length < n) {
      result = num1[0] + "." + num1[1] + zeroResult(n - num1[1].length);
    } else {
      result = num1[0] + "." + num1[1].substring(0, n);
    }
  }
  return result;
};
export const compare = function(keyName) {
  return function(objectN, objectM) {
    var valueN = objectN[keyName];
    var valueM = objectM[keyName];
    if (valueN < valueM) return 1;
    else if (valueN > valueM) return -1;
    else return 0;
  };
};
