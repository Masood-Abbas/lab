import axios from 'axios'
// import { logoutUser } from '@/store/auth/authSlice'
import { deleteCookie } from '@/utils/utils'

const api = axios.create({
  baseURL: 'http://localhost:5000/'
})

let store

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


// Add a request interceptor
api.interceptors.request.use(function (config) {
  // Do something before request is sent
  Object.assign(config.headers,{rnadomData:'My token'})
 

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default api;