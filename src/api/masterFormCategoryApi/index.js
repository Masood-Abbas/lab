import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API for Form Categories listing

const getFormCategories = params =>
  api.get(`/form-category?${params?.name ? `name=${params?.name}` : ''}&take=15skip=${params?.skip ? params?.skip : 0}`)

export const useGetFormCategories = ({ onSuccess, onError, params }) => {
  return useQuery(['getFormCategories', params], () => getFormCategories(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for Form Category search

const searchFormCategory = params => api.get(`/form-category/search/findByFilter?${params ? `name=${params}` : ''}`)

export const useSearchFormCategory = ({ onSuccess, onError, params }) => {
  return useQuery(params !== undefined && ['searchFormCategory', params], () => searchFormCategory(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for create new Form Category

const addFormCategory = data => api.post('/form-category', data)

export const useAddFormCategory = () => {
  return useMutation('addFormCategory', addFormCategory)
}

// ** API for update Form Category

const updateFormCategory = (params, data) => api.patch(`/form-category/${params}`, data)

export const useUpdateFormCategory = params => {
  return useMutation(['updateFormCategory', params], data => updateFormCategory(params, data))
}
