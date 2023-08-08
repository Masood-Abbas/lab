import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API for Test listing

const getTest = () => api.get('/Test')

export const useGetTest = ({ onSuccess, onError }) => {
  return useQuery('getTest', getTest, {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for Test search

const searchTest = params =>
  api.get(
    `/test?${params?.name ? `name=${params?.name}` : ''}${
      params?.abbreviation ? `abbreviation=${params?.abbreviation}` : ''
    }`
  )

export const  useSearchTest = ({ onSuccess, onError, params }) => {

  return useQuery(params !== undefined && ['searchTest', params], () => searchTest(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for create new Test

const addTest = data => api.post('/test', data)

export const useAddTest = () => {
  return useMutation('addTest', addTest)
}

// ** API for update Test

const updateTest = (params, data) => api.patch(`/test/${params}`, data)

export const useUpdateTest = params => {
  return useMutation(['updateTest', params], data => updateTest(params, data))
}
