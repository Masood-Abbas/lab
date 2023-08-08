import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

//** API FOR GET ALL FORM TEMPLATES

const getWorkFlowInbox = params =>
  api.get(`/form-submission?isReadyForReview=${params?.isReadyForReview}
${params?.searchParam?.initiator && `initiator=${params?.searchParam?.initiator}`}
${params?.searchParam?.approver && `approver=${params?.searchParam?.approver}`}
${params?.searchParam?.reviewer && `reviewer=${params?.searchParam?.reviewer}`}
${params?.searchParam?.status && `status=${params?.searchParam?.status}`}
${params?.searchParam?.startDate && `startDate=${params?.searchParam?.startDate}`}
${params?.searchParam?.endDate && `&endDate=${params?.searchParam?.endDate}`}
`)

export const useGetWorkflowInbox = ({ onSuccess, onError, params }) => {
  return useQuery(params && ['getWorkFlowInbox', params], () => getWorkFlowInbox(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API FOR GET FORM TEMPLATE BY ID
const getFormTemplateById = params => api.get(`/form/${params}`)

export const useGetFormTemplateById = ({ onSuccess, onError, params }) => {
  return useQuery(params && ['getFormTemplateById', params], () => getFormTemplateById(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API FOR GET FORM TEMPLATE BY ID
const getFormSubmittedById = params => api.get(`/form-submission/${params}`)

export const useGetFormSubmittedById = ({ onSuccess, onError, params }) => {
  return useQuery(params && ['getFormSubmittedById', params], () => getFormSubmittedById(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API FOR GET FORM CATEGORY BY ID

const getFormCategoryById = params =>
  api.get(`/form/category-base/${params?.formCategoryId}?isReadyForReview=${params?.isReadyForReview}`)

export const useGetFormCategoryById = ({ onSuccess, onError, params }) => {
  return useQuery(params?.formCategoryId !== '' && ['getFormCategoryById', params], () => getFormCategoryById(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API FOR SUBMIT FORM

const formSubmit = data => api.post('/form-submission', data)

export const useFormSubmit = () => {
  return useMutation('formSubmit', data => formSubmit(data))
}

export const loadDependents = ({ selectedSectionObjectId, dependantKey, setEntitiesDependents, dispatch }) =>
  api
    ?.get(
      `/master-abbreviation/category-base/${dependantKey}${
        selectedSectionObjectId ? `?sectionId=${selectedSectionObjectId}` : ''
      }`
    )
    .then(response => {
      dispatch(
        setEntitiesDependents({
          [`${dependantKey}`]: response?.data
        })
      )
    })

export const loadSections = ({ entity, dispatch, setEntitiesData }) => {
  api?.get(`/${entity}`).then(response => {
    dispatch(setEntitiesData({ [`${entity}`]: response?.data }))
  })
}

// ** API FOR GET INSTRUMENT BY SECTION ID

const getInstrumentBySectionId = params => api.get(`/section/${params}`)

export const useGetInstrumentBySectionId = ({ onSuccess, onError, params }) => {
  return useQuery(params && ['getInstrumentBySectionId', params], () => getInstrumentBySectionId(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API FOR GET SUBMISSION OPERATIONS BY ID

const getSubmissionOperations = params => api.get(`/form-submission/${params}/operations`)

export const useGetSubmissionOperations = ({ onSuccess, onError, params }) => {
  return useQuery(params && ['getSubmissionOperations', params], () => getSubmissionOperations(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API FOR REVIEW FORM THAT IS ASSIGNED

const reviewForm = (params, data) => api.patch(`/form-submission/${params}/review`, data)

export const useReviewForm = params => {
  return useMutation(['reviewForm', params], data => reviewForm(params, data))
}

// ** API FOR APPROVE FORM THAT IS ASSIGNED

const approveForm = (params, data) => api.patch(`/form-submission/${params}/approve`, data)

export const useApproveForm = params => {
  return useMutation(['approveForm', params], data => approveForm(params, data))
}

// ** API FOR RETURN FORM THAT IS ASSIGNED

const returnForm = (params, data) => api.patch(`/form-submission/${params}/return`, data)

export const useReturnForm = params => {
  return useMutation(['returnForm', params], data => returnForm(params, data))
}

// ** API FOR RESUBMIT FORM THAT WAS RETURNED

const resubmitForm = (params, data) => api.patch(`/form-submission/${params}/resubmit`, data)

export const useResubmitForm = params => {
  return useMutation(['resubmitForm', params], data => resubmitForm(params, data))
}

//** API FOR WORK FLOW HISTORY (APPROVED FORMS)

const getApprovedFormHistory = params => api.get(`/form-submission/${params}/form-histories`)

export const useGetApprovedFormHistory = ({ onSuccess, onError, params }) => {
  return useQuery('getApprovedFormHistory', () => getApprovedFormHistory(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

//** API FOR FORM TEMPLATE HISTORY

const getFormTemplateHistory = params => api.get(`/form/${params}/history`)

export const useGetFormTemplateHistory = ({ onSuccess, onError, params }) => {
  return useQuery('getFormTemplateHistory', () => getFormTemplateHistory(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

// ** API for workflow inbox search

const workFlowSearchTitle = params =>
  api.get(
    `/form-submission?${params?.form_category ? `categoryName=${params?.form_category}` : ''}${
      params?.status ? `status=${params?.status}` : ''
    }${params?.startDate ? `startDate=${params?.startDate}` : ''}${
      params?.endDate ? `&endDate=${params?.endDate}` : ''
    }`
  )

export const useWorkFlowSearchTitle = ({ onSuccess, onError, params }) => {
  return useQuery(params !== undefined && ['searchDesignation', params], () => workFlowSearchTitle(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

//** API FOR CHECK DOCUMENT CODE

const checkDocumentCode = params => api.get(`/folder/${params}/path/exists`)

export const useCheckDocumentCode = ({ onSuccess, onError, params }) => {
  return useQuery(params !== undefined && ['checkDocumentCode', params], () => checkDocumentCode(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}
