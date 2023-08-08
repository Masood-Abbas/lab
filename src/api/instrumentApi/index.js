import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API for Instruments listing

const getInstruments = () => api.get('/instrument')

export const useGetInstruments = ({ onSuccess, onError }) => {
  return useQuery('getInstruments', getInstruments, {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for instrument search

const searchInstrument = params =>

  api.get(
    `/instrument/search/findByFilter?${params?.name ? `name=${params?.name}` : ''}${
      params?.abbreviation ? `abbreviation=${params?.abbreviation}` : ''
    }${params?.serialNo ? `serialNo=${params?.serialNo}` : ''}`
  )

export const useSearchInstrument = ({ onSuccess, onError, params }) => {

  return useQuery(params !== undefined && ['searchInstrument', params], () => searchInstrument(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for create new instrument

const createInstrument = data => api.post('/instrument', data)

export const useCreateInstrument = () => {
  return useMutation('createinstrument', createInstrument)
}

// ** API for update instrument

const updateInstrument = (params, data) => api.patch(`/instrument/${params}`, data)

export const useUpdateInstrument = params => {
  return useMutation(['updateinstrument', params], data => updateInstrument(params, data))
}
