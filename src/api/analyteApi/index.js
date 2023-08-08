import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API for Analyte listing

const getAnalyte = () => api.get('/analyte')

export const useGetAnalyte = ({ onSuccess, onError }) => {
  return useQuery('getAnalyte', getAnalyte, {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for Analyte search

const searchAnalyte = params =>
  api.get(
    `/analyte/search/findByFilter?${params?.name ? `name=${params?.name}` : ''}${
      params?.abbreviation ? `abbreviation=${params?.abbreviation}` : ''
    }`
  )

export const  useSearchAnalyte = ({ onSuccess, onError, params }) => {

  return useQuery(params !== undefined && ['searchAnalyte', params], () => searchAnalyte(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for create new Analyte

const addAnalyte = data => api.post('/analyte', data)

export const useAddAnalyte = () => {
  return useMutation('addAnalyte', addAnalyte)
}

// ** API for update Analyte

const updateAnalyte = (params, data) => api.patch(`/analyte/${params}`, data)

export const useUpdateAnalyte = params => {
  return useMutation(['updateAnalyte', params], data => updateAnalyte(params, data))
}
