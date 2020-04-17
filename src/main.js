import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { toastPlugin }  from 'components/common/toast'

Vue.use(toastPlugin)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

