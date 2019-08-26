import router from './router'
import nprogress from 'nprogress' // 引入文件
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
  // console.log(to)
  nprogress.start()
  if (to.path.startsWith('/home')) {
    let userInfo = window.localStorage.getItem('authorpass')
    // console.log(userInfo)
    if (userInfo) {
      let token = JSON.parse(userInfo)
      if (token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  nprogress.done()
})
export default router
