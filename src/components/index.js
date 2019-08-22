import asideNav from './home/aside-nav.vue'
import header from './home/header.vue'
import breadcrumb from './common/breadcrumb.vue'
export default {
  install (Vue) {
    Vue.component('aside-nav', asideNav)
    Vue.component('header-h', header)
    Vue.component('bread-crumb', breadcrumb)
  }
}
