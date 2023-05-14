// 配置拦截器
import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 每次请求服务器都会取出token发送出去
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config;
}, function (error) {

  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 每次接收都会取token存储
  const { authorization } = response.headers
  authorization && localStorage.setItem('token', authorization)
  return response;
}, function (error) {
  if (error.request.status === 401) {
    // 重定向到login主页
    location.href = '/#/login'
  }
  return Promise.reject(error);
});