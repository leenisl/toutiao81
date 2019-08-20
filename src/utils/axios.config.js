import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use((req) => {
  // console.log(req)
  let userInfo = window.localStorage.getItem('authorpass')
  let token = userInfo ? JSON.parse(userInfo).token : null
  req.headers.Authorization = `Bearer ${token}`
  return req
}, (error) => {
  return Promise.reject(error)
})
axios.interceptors.response.use((res) => {
  // console.log(res)
  return res.data ? res.data : {}
}, (error) => {
  console.log(error.response)
  let code = error.response ? error.response.status : ''
  let message = ''
  switch (code) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号码不正确'
      break
    case 401:
      // 针对token过期或者失效的特殊处理
      message = 'token过期或未传'
      window.localStorage.clear()
      window.location.hash = '#/login'
      break
    default:
      message = '未知错误!'
      break
  }
  Message({
    message,
    type: 'warning'
  })
  return new Promise()
})

// axios.interceptors.response.use(function (response) {
//   // 对响应数据做处理
//   return response.data ? response.data : {}
// }, function (error) {
//   // 对响应错误做处理
//   return Promise.reject(error)
// })
export default axios
