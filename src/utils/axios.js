import axios from 'axios'
// import { logoutUser } from '@/store/auth/authSlice'
import { deleteCookie } from '@/utils/utils'

const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_APP_URL
})

let store
let isRefreshing = false

export const injectStore = _store => {
  store = _store
}

export function getAccessTokenCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value?.split(`; ${name}=`)
  if (parts?.length === 2) {
    return parts?.pop()?.split(';')?.shift()
  }
}

const refreshToken = () => {
  return instance.post('/auth/refresh').catch(error => {
    if (error.response && error.response.status === 401) {
      // The refresh token has expired, so log the user out and redirect to the login screen
      // store.dispatch(logoutUser())
      deleteCookie('refresh_token')
    }

    return Promise.reject(error)
  })
}

//*********************************
instance.interceptors.request.use(function (config) {
  const access_token = getAccessTokenCookie('access_token')

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }

  return config
})

instance.interceptors.response.use(
  function (response) {
    // Return the response if successful
    return response
  },
  function (error) {
    // Handle any errors that occur during the request
    if (error.response) {
      if (error?.response?.status === 401 && error?.response?.data?.message === 'Unauthorized' && !isRefreshing) {
        const access_token = getAccessTokenCookie('access_token')
        if (access_token) {
          deleteCookie('access_token')
        }
        isRefreshing = true
        const refresh_token = getAccessTokenCookie('refresh_token')
        if (refresh_token) {
          instance.defaults.headers.Authorization = `Bearer ${refresh_token}`

          return refreshToken()
            .then(res => {
              isRefreshing = false
              const token = res?.data?.access_token
              document.cookie = `access_token=${token}; path=/`

              // instance.interceptos.response.eject();

              // Retry the original request with the same payload

              instance.defaults.headers.Authorization = `Bearer ${token}`

              return instance(error.config)
            })
            .catch(err => {
              isRefreshing = false

              // store.dispatch(logoutUser())
              deleteCookie('refresh_token')
              window.location.reload()
            })
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in Node.js
    } else {
      // Something happened in setting up the request that triggered an Error
    }

    // Return a rejected promise with the error object

    return Promise.reject(error)
  }
)

export default instance
