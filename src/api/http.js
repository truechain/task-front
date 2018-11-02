'use strict'

import axios from 'axios'
import {
  apiUrl
} from '@/config/index.js'
import {
  getStore,
  removeStore
} from '@/util'

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
  return Promise.reject(err)
})

service.interceptors.response.use(({ data: { code, message, result } }) => {
  if (code === 500) {
    alert(message)
    return Promise.reject(message)
  } else if (code === 403) {
    removeStore('token')
    removeStore('userId')
    removeStore('agent')
    location.href = '/login'
  }
  return result
}, (err) => {
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
