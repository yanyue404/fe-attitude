const baseUrl = ''

const checkStatus = response => {
  if (response.ok) {
    return response
  }
  throw new Error(`Request rejected with status ${response.status}`)
}

const http = async (url = '', options = {}) => {
  if (options.method !== 'GET' && !options.body.noToken) {
    options.body.access_token = localStorage.getItem('token')
  } else if (options.method !== 'GET') {
    delete options.body.noToken
  }

  try {
    const response = await fetch(url, options)
    checkStatus(response)
    return await response.json()
  } catch (err) {
    throw err
  }
}

const transformRequest = obj => {
  return Object.keys(obj)
    .filter(key => obj[key] != null && obj[key] !== '')
    .map(key => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&')
}

const _get = url => {
  return http(url, { method: 'GET' })
}

const _post = (url, params) => {
  return http(url, {
    method: 'POST',
    body: transformRequest(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export { _get, _post }
