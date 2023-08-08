import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API for Master Abbreviation listing

const getMasterAbbreviations = params =>
  api.get(
    `/master-abbreviation?${params?.name ? `name=${params?.name}` : ''}${
      params?.abbreviation ? `abbreviation=${params?.abbreviation}` : ''
    }${params?.sectionIds ? `sectionAbbreviation=${params?.sectionIds}` : ''}${
      params?.category ? `category=${params?.category}` : ''
    }`
  )

export const useGetMasterAbbreviations = ({ onSuccess, onError, params }) => {
  return useQuery(['getMasterAbbreviations', params], () => getMasterAbbreviations(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for Master Abbreviation search

const searchMasterAbbreviation = params =>
  api.get(
    `/master-abbreviation/search?${params?.name ? `name=${params?.name}` : ''}${
      params?.abbreviation ? `abbreviation=${params?.abbreviation}` : ''
    }${params?.sectionIds ? `section=${params?.sectionIds}` : ''}${
      params?.category ? `category=${params?.category}` : ''
    }`
  )

export const useSearchMasterAbbreviation = ({ onSuccess, onError, params }) => {
  return useQuery(
    params !== undefined && ['searchMasterAbbreviation', params],
    () => searchMasterAbbreviation(params),
    {
      onSuccess,
      onError,
      select: data => data.data,
      retry: false,
      refetchOnWindowFocus: false
    }
  )
}

// ** API for create new Master Abbreviation

const createMasterAbbreviations = data => api.post('/master-abbreviation', data)

export const useCreateMasterAbbreviations = () => {
  return useMutation('createMasterAbbreviations', createMasterAbbreviations)
}

// ** API for update Master Abbreviation

const updateMasterAbbreviation = (params, data) => api.patch(`/master-abbreviation/${params}`, data)

export const useUpdateMasterAbbreviations = params => {
  return useMutation(['updateMasterAbbreviation', params], data => updateMasterAbbreviation(params, data))
}
