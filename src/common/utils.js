export function  debounce(func,delay){
  let timer = null;
  return (...args) => {
    // 每次图片加载完重新调用此函数，打断本要进行的刷新
    if(timer) clearTimeout(timer)
    // 在 delay 时间内不被打断，即可成功刷新
    timer = setTimeout(() => {
      func(args)
    },delay)
  }
}

// 时间戳转换
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

