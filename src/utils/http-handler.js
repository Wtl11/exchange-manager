import HTTP from '@utils/http'
import {app as APP} from '../main'
import { ERR_OK, TIME_OUT } from '@utils/config'

const COMMON_HEADER = {}

HTTP.init(http => {
  http.config.timeout = TIME_OUT
  http.config.headers = COMMON_HEADER
})

HTTP.setCallback({
  // 请求前处理
  beforeRequest({loading = true}) {
    if (loading) {
      showLoading()
    }
  },
  // 请求拦截
  willRequest(request) {
    return request
  },
  // 响应拦截
  willResponse(response) {
    return response
  },
  // 请求完成后的逻辑处理
  responseFulfilled(res, {url, loading = true, toast = true, formatter, doctor}) {
    let err = false // 是否有错
    if (typeof doctor !== 'function') {
      const errorText = url + '-->' + '请添加doctor字段'
      console.error(errorText)
      throw new Error(errorText)
    }
    // 可自定义处理loading
    if (typeof loading === 'function') {
      loading(res)
    } else if (loading) {
      hideLoading()
    }
    if (res.code !== ERR_OK) {
      errorCodeHandle(res.code)
    }
    // 可自定义处理toast错误
    if (res.error !== ERR_OK) {
      if (typeof toast === 'function') {
        toast(res)
      } else if (toast) {
        showToast(res.message)
      }
    }
    // 处理错误函数
    if (res.code !== ERR_OK || res.error !== ERR_OK) {
      console.error(url + ' <<<<<<接口异常>>>>> ' + JSON.stringify(res))
      err = true
      doctor(res, url)
    }
    // 对返回的数据劫持
    if (typeof formatter === 'function') {
      return formatter(err, res)
    }
    return res
  }
})

// 错误码处理
function errorCodeHandle(code) {
  switch (code) {
    case 10000:
      break
    case 13005:
      break
    default:
      break
  }
}

/**
 * 工具
 */
function showLoading() {
  APP && APP.$loading && APP.$loading.show()
}

function hideLoading() {
  APP && APP.$loading && APP.$loading.hide()
}

function showToast(message) {
  APP && APP.$toast && APP.$toast.show(message)
}
