import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API FOR SUBMIT MONTHLY ON-GOING FORM

const submitOngoing = data => api.post('/form-submission/on-going', data)

export const useOnGoingFormSubmit = () => {
  return useMutation('submitOngoing', data => submitOngoing(data))
}

// ** API FOR EDIT MONTHLY ON-GOING FORM

const editOngoing = (params, data) => api.patch(`/form-submission/${params}/on-going`, data)

export const useEditOnGoingForm = params => {
  return useMutation(['editOngoing', params], data => editOngoing(params, data))
}
