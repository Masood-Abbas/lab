import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'


//** API for get Archived listing


const getArchived = () => api.get('/folder/get/archived/nodes')

export const useGetArchived = ({onSuccess, onError}) => {

  return useQuery('getArchived',getArchived,{
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false

  });
}

//** API for Archived File and Folder

const archiveFile = params => api.patch(`/folder/archive/${params}`)

export const useArchiveFile = params => {

  return useMutation(['archiveFile', params],()=> archiveFile(params))
}

//** API for Un-Archived Folder

const unarchiveFolder = (params, data) => api.patch(`/folder/un-archive/node/${params}`, data)

export const useUnarchiveFolder = params => {

  return useMutation(['unarchiveFolder', params],(data)=> unarchiveFolder(params, data))
}

//** API for Un-Archived File

const unarchiveFile = (params,data) => api.patch(`/file/un-archive/file/${params}`, data)

export const useUnarchiveFile = params => {

  return useMutation(['unarchiveFile', params],(data)=> unarchiveFile(params, data))
}


//** API for get Archived listing
const getDescendantArchived = params => api.get(`/folder/archived/descendant-nodes/${params}`)

export const useGetDescendantArchived = ({onSuccess, onError, params}) => {

  return useQuery(['getDescendantArchived', params],()=> getDescendantArchived(params),{
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false

  });
}

