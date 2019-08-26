import asideNav from './home/aside-nav.vue'
import header from './home/header.vue'
import breadcrumb from './common/breadcrumb.vue'
import searchImg from './common/searchImg.vue'
import coverImg from './common/coverImg.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  install (Vue) {
    Vue.component('aside-nav', asideNav)
    Vue.component('header-h', header)
    Vue.component('bread-crumb', breadcrumb)
    Vue.component('quillEditor', quillEditor)
    Vue.component('search-Img', searchImg)
    Vue.component('cover-Img', coverImg)
  }
}
