import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API for Users listing

const getAllUsers = params =>
  api.get(
    `/user?${params?.name ? `name=${params?.name}` : ''}${
      params?.employeeNo ? `employeeNo=${params?.employeeNo}` : ''
    }${
      params?.unit ? (params?.unit === 'all' ? `allSections=${params?.unit}` : `unitAbbreviation=${params?.unit}`) : ''
    }${params?.status ? `status=${params?.status}` : ''}&take=15&${`skip=${params?.skip ? params?.skip : 0}`}`
  )

export const useGetAllUsers = ({ onSuccess, onError, params }) => {
  return useQuery(params && ['getAllUsers', params], () => getAllUsers(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for Get user by Id

const getUser = params => api.get(`/user/${params}`)

export const useGetUser = ({ onSuccess, onError, params }) => {
  return useQuery(params !== undefined && ['getUser', params], () => getUser(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for Add new User

const addUser = data =>axios.post('http://localhost:5000/register',data)
.then(response => {
  console.log('Response:', response.data);
})
.catch(error => {
  console.error('Error:', error.message);
});

export const useAddUser = () => {
  console.log('in')
  return useMutation('addUser', addUser)
}

// ** API for update User

const updateUser = (params, data) => api.patch(`/user/${params}`, data)

export const useUpdateUser = params => {
  return useMutation(['updateUser', params], data => updateUser(params, data))
}

//  API for Resend Email

const getEmailResend = data => api.patch(`/auth/${data}/resend-email`)

export const useResendEmail = () => {
  return useMutation(['getEmailResend'], data => getEmailResend(data))
}

//  API for set Password Email

const setPassword = (params, data) => api.post(`/auth/${params}/set-password`, data)

export const useSetUserPassword = params => {
  return useMutation(['useSetUserPassword', params], data => setPassword(params, data))
}
