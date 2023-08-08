import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

//** API FOR GET ALL FORM TEMPLATES

const getFormTemplates = params =>
  api.get(`/form?${params?.name ? `name=${params?.name}` : ''}
${params?.status ? `status=${params?.status}` : ''}${
    params?.categoryName ? `categoryName=${params?.categoryName}` : ''
  }`)

export const useGetFormTemplates = ({ onSuccess, onError, params }) => {
  return useQuery(['getFormTemplates', params], () => getFormTemplates(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

//** API FOR GET ALL FORM TEMPLATES BY ID

const getFormTemplateById = params => api.get(`/form/${params}`)

export const useGetFormTemplateById = ({ onSuccess, onError, params }) => {
  return useQuery('getFormTemplateById', () => getFormTemplateById(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API FOR CREATE NEW FORM TEMPLATE

const createFormTemplate = data => api.post('/form', data)

export const useCreateFormTemplate = () => {
  return useMutation('createFormTemplate', data => createFormTemplate(data))
}

// ** API FOR UPDATE FORM TEMPLATE

const updateFormTemplate = (params, data) => api.patch(`/form/${params}`, data)

export const useUpdateFormTemplate = params => {
  return useMutation(['updateFormTemplate', params], data => updateFormTemplate(params, data))
}

// ** API FOR PUBLISH FORM TEMPLATE

const formTemplatePublish = (params, data) => api.patch(`/form/${params}/publish`, data)

export const useFormTemplatePublish = params => {
  return useMutation(params && ['formTemplatePublish', params], data => formTemplatePublish(params, data))
}

const formTemplateUnpublish = (params, data) => api.patch(`/form/${params}/un-publish`, data)

export const useFormTemplateUnpublish = params => {
  return useMutation(params && ['formTemplateUnpublish', params], data => formTemplateUnpublish(params, data))
}
