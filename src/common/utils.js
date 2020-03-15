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