import Vue from 'vue'
import App from './App.vue'
import router from './premission'
import Ele from 'element-ui'
import Component from './components'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from './utils/axios.config'
Vue.prototype.$axios = axios
Vue.use(Ele)
Vue.use(Component)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
