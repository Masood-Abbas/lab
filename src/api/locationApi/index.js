import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API for Location listing

const getLocation = params =>
  api.get(`/location?${params?.name ? `name=${params?.name}` : ''}${
    params?.code ? `code=${params?.code}` : ''
  }&take=15&skip=${params?.skip ? params?.skip : 0}
  `)

export const useGetLocation = ({ onSuccess, onError, params }) => {
  return useQuery(['getLocation', params], () => getLocation(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for create new Location

const createLocation = data => api.post('/location', data)

export const useCreateLocation = () => {
  return useMutation('createLocation', data => createLocation(data))
}

// ** API for update Location

const updateLocation = (params, data) => api.patch(`/location/${params}`, data)

export const useUpdateLocation = params => {
  return useMutation(['updateLocation', params], data => updateLocation(params, data))
}
