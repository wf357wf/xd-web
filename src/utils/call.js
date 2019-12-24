/**
 * axios
 * Created by wf on 2019/11/30.
 */
import axios from 'axios'
import { url, timeout } from '../config'
// 超时时间
axios.defaults.timeout = timeout
export function call (config) {
  const ax = axios.create({
    baseURL: url + '/service/rest',
    timeout: timeout
  })
  ax.interceptors.request.use(config => {
    return config
  }, error => {
    return Promise.reject(error)
  })

  // 拦截返回请求做相应业务逻辑处理
  ax.interceptors.response.use(response => {
    return Promise.resolve(response)
  }, error => {
    return Promise.reject(error)
  })
  return ax.request(config)
}
