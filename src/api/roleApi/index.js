import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API for Role listing

const getRoles = params =>
  api.get(`/role?${params?.name ? `name=${params?.name}` : ''}
${params?.locationId ? `locationId=${params?.locationId}` : ''}&take=15
&skip=${params?.skip ? params?.skip : 0}`)

export const useGetRoles = ({ onSuccess, onError, params }) => {
  return useQuery(['getRoles', params], () => getRoles(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for GET Role  By Id

const getRoleById = params => api.get(`/role/${params}`)

export const useGetRoleById = ({ onSuccess, onError, params }) => {
  return useQuery(params && ['getRoleById', params], () => getRoleById(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for create new Role

const addRole = data => api.post('/role', data)

export const useAddRole = () => {
  return useMutation('addRole', addRole)
}

// ** API for update Role

const updateRole = (params, data) => api.patch(`/role/${params}`, data)

export const useUpdateRole = params => {
  return useMutation(['updateRole', params], data => updateRole(params, data))
}
