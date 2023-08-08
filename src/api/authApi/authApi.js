import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

const postLogin = data => api.post('/auth/login', data)

export const useAuthLogin = () => {
  return useMutation('authLogin', postLogin)
}

const authLogout = () => api.post('/auth/logout')

export const useAuthLogout = () => {
  return useMutation('authLogout', authLogout)
}

const fetchUser = () => api.get('/auth/me')

export const useAuthUser = ({ onSuccess, onError }) => {
  return useQuery('authUser', fetchUser, {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

const getUser = () => api.get('/user/assignToList')

export const useGetUser = ({ onSuccess, onError }) => {
  return useQuery('getUser', getUser, {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// Reset Password

const resetPassword = data => api.patch('/auth/update-password', data)

export const useResetPassword = () => {
  return useMutation('resetPassword', resetPassword)
}

//** API for Update User Info

const updateUserInfo = (params, data) => api.patch(`/auth/update-user-info/${params}`, data)

export const useUpdateUserInfo = params => {
  return useMutation(['updateUserInfo', params], data => updateUserInfo(params, data))
}

//** API for Update User Sign & Stamp

const updateUserStamp = data => api.patch('/auth/upload-sign-stamp', data)

export const useUpdateUserStamp = () => {
  return useMutation('updateUserStamp', updateUserStamp)
}
