import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API for Sections listing

const getSections = (params) => api.get(`/section?${params?.locationId ? `locationId=${params?.locationId}` : ''}`)

export const useGetSections = ({ onSuccess, onError,params }) => {
  return useQuery(['getSections',params],()=> getSections(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for Section search

const searchSection = params =>
  api.get(
    `/section/search?${params?.name ? `name=${params?.name}` : ''}${
      params?.abbreviation ? `abbreviation=${params?.abbreviation}` : ''
    }`
  )

export const useSearchSection = ({ onSuccess, onError, params }) => {
  return useQuery(params !== undefined && ['searchSection', params], () => searchSection(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for create new Section

const createSection = data => api.post('/section', data)

export const useCreateSection = () => {
  return useMutation('createSection', createSection)
}

// ** API for update Section

const updateSection = (params, data) => api.patch(`/section/${params}`, data)

export const useUpdateSection = params => {
  return useMutation(['updateSection', params], data => updateSection(params, data))
}
