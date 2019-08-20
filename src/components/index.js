import asideNav from './home/aside-nav.vue'
import header from './home/header.vue'
export default {
  install (Vue) {
    Vue.component('aside-nav', asideNav)
    Vue.component('header-h', header)
  }
}
