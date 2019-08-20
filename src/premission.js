import router from './router'
router.beforeEach((to, from, next) => {
  console.log(to)
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
export default router
