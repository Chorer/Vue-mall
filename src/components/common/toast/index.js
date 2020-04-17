import Toast from './Toast'

export const toastPlugin = {
  // 1. 声明  install 方法
  install(Vue){
    // 1. 创建组件构造器
    const toastConstructor  = Vue.extend(Toast)
    // 2. 基于组件构造器创建组件实例
    const instance = new toastConstructor()
    // 3. 组件实例挂载到 dom 元素
    instance.$mount(document.createElement('div'))
    // 4. dom 元素插入
    document.body.appendChild(instance.$el)
    // 5. 组件实例挂载到 Vue 原型
    Vue.prototype.$toast = instance
  }
}