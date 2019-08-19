import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Ele from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.use(Ele)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
