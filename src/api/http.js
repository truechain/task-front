'use strict'
import Vue from 'vue'
import axios from 'axios'
import {
  apiUrl
} from '@/config/index.js'
import {
  getStore,
  removeStore
} from '@/util'
const that = Vue.prototype
const service = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

service.interceptors.request.use(config => {
  const token = getStore('token')
  const uid = getStore('uid')
  const agent = getStore('agent')

  if (token) {
    config.headers['uid'] = uid
    config.headers['Token'] = token
    config.headers['Agent'] = agent
  }
  return config
}, err => {
  that.$message({
    message: err,
    type: 'error',
    duration: '3000'
  })
  return Promise.reject(err)
})

service.interceptors.response.use(({ data: { code, message, result } }) => {
  if (code === 500) {
    that.$message({
      message,
      type: 'error',
      duration: '1000'
    })
    return Promise.reject(message)
  } else if (code === 403) {
    removeStore('token')
    removeStore('userId')
    removeStore('agent')
    location.href = '/login'
  } else {
    that.$message({
      message,
      type: 'success',
      duration: '1000'
    })
    return result
  }
}, (err) => {
  that.$message({
    message: err,
    type: 'error',
    duration: '3000'
  })
  return Promise.reject(err)
})

export default {
  post (url, data = {}, type = 'x-www-form-urlencoded', params = null) {
    return service({
      method: 'post',
      url,
      data,
      params,
      headers: {
        'Content-Type': `${
          type === 'form-data'
          ? 'multipart'
          : 'application'
        }/${type}; charset=UTF-8`
      }
    })
  },
  get (url, params = {}) {
    return service({
      method: 'get',
      url,
      params // get 请求时带的参数
    })
  }
}
