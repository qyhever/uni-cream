import qs from 'qs'
const baseURL = 'https://qyhever.com'

const genEmptyPromise = () => new Promise(() => {})

const codeMessage = {
  400: '请求错误',
  401: '未授权',
  403: '禁止访问',
  404: '请求地址不存在',
  500: '服务器繁忙',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

const getErrorMsg = (statusCode, errorMsg) => {
  let msg = ''
  if (errorMsg) {
    return errorMsg
  }
  // http 错误响应
  if (statusCode) {
    return codeMessage[statusCode]
  }
  return msg
}

/**
 * Determines whether the specified URL is absolute
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

function normalizeOptions({ method = 'get', params = {}, data = {}, ...restOpts } = {}) {
  const opts = Object.assign({}, restOpts)
  opts.method = method.toUpperCase()
  // url
  if (!isAbsoluteURL(opts.url)) {
    const separator = opts.url.indexOf('/') !== 0 ? '/' : ''
    opts.url = baseURL + separator + opts.url
  }
  // urlParams
  const urlParams = {
    // default params
    t: new Date().getTime()
  }
  if (opts.url.indexOf('?') >= 0) {
    const group = opts.url.split('?')
    opts.url = group[0] // remove url params
    Object.assign(
      urlParams,
      qs.parse( group[1] )
    )
  }
  if (method === 'get') {
    Object.assign(
      urlParams,
      qs.parse( Object.assign({}, params, data) )
    )
  }
  if (method === 'post') {
    Object.assign(
      urlParams,
      qs.parse( Object.assign({}, params) )
    )
  }
   // add url params
  if (Object.keys(urlParams).length) {
    opts.url = opts.url + '?' + qs.stringify(urlParams)
  }
  return Object.assign({}, opts, {
    data,
    timeout: 20000
  })
}

let count = 0

// 请求之前
function requestStart(config, loadingCb, showLoading) {
  loadingCb(true)
  count++
  if (showLoading) {
    // startLoading()
  }
  config.header = config.header || {}
  // 添加请求头
  config.header['X-Requested-With'] = 'XMLHttpRequest'
}

// 响应正常
function requestThenEnd({response, resolve, reject, loadingCb, showWarning, warningMsg, throwWarningError, showError, errorMsg, throwHttpError}) {
  loadingCb(false)
  // endLoading()
  const responseData = response.data
  // http success
  if (response.statusCode === 200) {
    if (responseData.success) { // success code
      resolve(responseData.data)
      return
    }
    // not success code
    if (showWarning) {
      uni.showModal({
        content: warningMsg || responseData.msg || '操作失败',
        showCancel: false,
        confirmText: '我知道了'
      })
    }
    console.log('业务报错', responseData)
    // 抛出业务错误
    if (throwWarningError) {
      const err = new Error('warning')
      err.name = 'warning'
      err.response = responseData
      reject(err)
      return
    }
    resolve( genEmptyPromise() )
    return
  }
  // http fail
  if (showError) {
    const msg = getErrorMsg(response.statusCode, errorMsg)
    uni.showModal({
      content: msg,
      showCancel: false,
      confirmText: '我知道了'
    })
  }
  console.log('http报错', responseData)
  if (throwHttpError) {
    const err = new Error('err')
    err.name = 'err'
    err.response = responseData
    reject(err)
    return
  }
  resolve( genEmptyPromise() )
}

// 响应异常
function requestCatchEnd({error, resolve, reject, loadingCb, showError, errorMsg, throwHttpError}) {
  loadingCb(false)
  // endLoading()
  // 超时或断网
  let msg = ''
  if (error.errMsg.indexOf('timeout') >= 0) {
    msg = '请求超时！请检查网络是否正常'
  } else {
    msg = '网络错误，请检查网络是否已连接！'
  }
  if (showError && msg) {
    uni.showModal({
      content: msg,
      showCancel: false,
      confirmText: '我知道了'
    })
  }
  // 抛出http错误
  if (throwHttpError) {
    const err = new Error('network fail')
    err.name = 'network fail'
    reject(err)
    return
  }
  resolve( genEmptyPromise() )
}

/**
 * 发起异步请求
 * @param {Object} options 请求配置参数
 * @param {Boolean} [options.showWarning=true] 是否显示业务错误提示（请求成功，但业务状态码非成功状态）
 * @param {Boolean} [options.showError=true] 是否显示http错误提示（http请求失败）
 * @param {Boolean} [options.showLoading=true] 是否显示 loading
 * @param {Function} [options.loadingCb=()=>{}] loading 状态回调
 * @param {Boolean} [options.throwWarningError=false] 是否抛出业务逻辑错误（请求成功，但业务状态码非成功状态）
 * @param {Boolean} [options.throwHttpError=false] 是否显示http错误（http请求失败）
 * @param {String} [options.warningMsg=''] 业务错误提示
 * @param {String} [options.errorMsg=''] http错误提示
 * @return {Promise} Promise
 */
function request(options = {}) {
  const {
    showWarning = true,
    showError = true,
    showLoading = true,
    loadingCb = () => {},
    throwWarningError = false,
    throwHttpError = false,
    warningMsg = '',
    errorMsg = '',
    ...restOptions
  } = options
  const opts = normalizeOptions(restOptions)
  requestStart(opts, loadingCb, showLoading)
  return new Promise((resolve, reject) => {
    opts.success = response => {
      requestThenEnd({response, resolve, reject, loadingCb, showWarning, warningMsg, throwWarningError, showError, errorMsg, throwHttpError})
    }
    opts.fail = error => {
      requestCatchEnd({error, resolve, reject, loadingCb, showError, errorMsg, throwHttpError})
    }
    const requestTask = uni.request(opts)
    if (opts.cancel) {
      opts.cancel(requestTask)
    }
  })
}

function get(url, params = {}, options = {}) {
  const result = {
    method: 'get',
    url,
    params,
    ...options
  }
  return request(result)
}

function post(url, data = {}, options = {}) {
  const result = {
    method: 'post',
    url,
    data,
    ...options
  }
  return request(result)
}

export {
  request,
  get,
  post
}
