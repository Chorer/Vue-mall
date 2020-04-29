import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { toastPlugin }  from 'components/common/toast'
import FastClick from 'fastclick'
import lazyload from 'vue-lazyload'
import 'assets/img/icons'

Vue.use(toastPlugin)
FastClick.attach(document.body)

Vue.use(lazyload,{
  loading:require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

