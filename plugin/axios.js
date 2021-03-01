import axios from 'axios'
import notification from 'ant-design-vue/lib/notification'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  NProgress.start()//开启进度条
  return config
}, function (error) {
  // 对请求错误做些什么
  notification.error({
    message: `请求失败,错误为${error.message}`,
    description: '请检查网络重试',
    duration: 2,
  })
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  NProgress.done()//关闭进度条
  return response
}, function (error) {
  // 对响应错误做点什么
  notification.error({
    message: `响应失败,错误为${error.message}`,
    description: '请联系管理员',
    duration: 2,
  })
  return Promise.reject(error)
})

export function $get (url, params) {
  return axios.get(url, { params })
}

export function $post (url, params) {
  return axios.post(url, params)
}



