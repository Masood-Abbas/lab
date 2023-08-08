import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API for Designation listing

const getTitle = params => api.get(`/designation?${params?.name ? `name=${params?.name}` : ''}
${params?.locationId ? `locationId=${params?.locationId}` : ''}&take=15
&${`skip=${params?.skip ? params?.skip : 0 }`}`)

export const useGetTitle = ({ onSuccess, onError, params }) => {
  return useQuery(['getDesignation', params], () => getTitle(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for create new Designation

const createDesignation = data => api.post('/designation', data)

export const useCreateDesignation = () => {
  return useMutation('createDesignation', createDesignation)
}

// ** API for update Designation

const updateTitle = (params, data) => api.patch(`/designation/${params}`, data)

export const useUpdateTitle = params => {
  return useMutation(['updateDesignation', params], data => updateTitle(params, data))
}
