import axios from '../utils/axios.config'
import URL from '../constant/api'
export function login (data) {
  return axios({
    method: 'post',
    url: URL.LOGIN_URL,
    data
  })
}
