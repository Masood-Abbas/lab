import { useMutation, useQuery } from 'react-query'
import api from '@/utils/axios'

//** API for root level folders tree structure

const getRootDirectory = () => api.get('/folder/parent-nodes')

export const useGetRootDirectory = ({ onSuccess, onError }) => {
  return useQuery('getRootDirectory', getRootDirectory, {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

//** API for get Root Children Folders

const getRootChildrenFolder = data => api.post('/folder/descendant/nodes', data)

export const useGetSubDirectory = () => {
  return useMutation('getRootChildrenFolder', getRootChildrenFolder)
}

//** API for get Selected Folder Data

const checkSelectedDirectory = params => api.get(`/folder/${params}`)

export const useCheckSelectedDirectory = ({ onSuccess, onError, params }) => {
  return useQuery(
    params !== '%2Fundefined' && ['checkSelectedDirectory', params],
    () => checkSelectedDirectory(params),
    {
      onSuccess,
      onError,
      select: data => data.data,
      retry: false,
      refetchOnWindowFocus: false
    }
  )
}

//** API for create new Folder (Directory)

const createNewDirectory = data => api.post('/folder', data)

export const useCreateNewDirectory = () => {
  return useMutation('createNewDirectory', createNewDirectory)
}

//** API for root level folders

export const getDirectory = params => api.get(`/folder?${params?.locationId ? `locationId=${params?.locationId}` : ''}`)

export const useGetDirectory = ({ onSuccess, onError, params }) => {
  return useQuery(['getDirectory', params], () => getDirectory(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

//** API for root level folders

export const getSelectedDirectory = params =>
  api.get(
    `/folder/descendant-nodes/${params?.path}?${params?.locationId ? `locationId=${params?.locationId}` : ''}${
      params?.name ? `name=${params?.name}` : ''
    }${params?.abbreviation ? `abbreviation=${params?.abbreviation}` : ''}`
  )

export const useGetSelectedDirectory = ({ onSuccess, onError, params }) => {
  return useQuery(
    params?.path !== '%2Fundefined' && params !== 'null' && ['getSelectedDirectory', params],
    () => getSelectedDirectory(params),
    {
      onSuccess,
      onError,
      select: data => data.data,
      retry: false,
      refetchOnWindowFocus: false
    }
  )
}

export const useGetSelectedDirectoryChange = ({ onSuccess, onError, params }) => {
  return useQuery(params?.path !== 'null' && ['getSelectedDirectory', params], () => getSelectedDirectory(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

//** API for copy Folder (Directory)

const copyFolder = data => api.post('/folder/copy', data)

export const useCopyDirectory = () => {
  return useMutation('copyFolder', copyFolder)
}

//** API for move Folder (Directory)

const moveFolder = data => api.post('/folder/move', data)

export const useMoveDirectory = () => {
  return useMutation('moveFolder', moveFolder)
}

// Active folder
const activeFolder = (data, params) => api.patch(`/folder/${params}/active`, data)

export const useActiveFolder = params => {
  return useMutation(['activeFile', params], data => activeFolder(data, params))
}

//** API for Rename Folder (Directory)

const renameFolder = (params, data) => api.patch(`/folder/${params}/rename`, data)

export const useRenameFolder = params => {
  return useMutation('renameFolder', data => renameFolder(params, data))
}

//** API for temporary folder Delete (Directory)

// TODO: Need to delete with path not with id (March 3, 2023)

const temporaryDeleteFolder = (params, data) => api.patch(`/folder/${params}/inactive`, data)

export const useTemporaryDeleteFolder = params => {
  return useMutation(['temporaryDeleteFolder', params], data => temporaryDeleteFolder(params, data))
}

//** File Upload

const uploadFile = data => api.post('/file/upload', data)

export const useUploadFile = () => {
  return useMutation('uploadFile', uploadFile)
}

//** File Copy

const copyFile = data => api.post('/file/copy', data)

export const useCopyFile = () => {
  return useMutation('copyFile', copyFile)
}

//** Copy folder to other locations

const copyFolderToOtherLocation = data => api.post('/folder/copy-directory-structure', data)

export const useCopyFolderToOtherLocation = () => {
  return useMutation('copyFolderToOtherLocation', copyFolderToOtherLocation)
}

//** File Move

const moveFile = data => api.post('/file/move', data)

export const useMoveFile = () => {
  return useMutation('moveFile', moveFile)
}

//** Inactive File

const inactiveFile = (data, params) => api.patch(`/file/${params}/inactive`, data)

export const useInactiveFile = params => {
  return useMutation(['inactiveFile', params], data => inactiveFile(data, params))
}

//** Active File
const activeFile = (data, params) => api.patch(`/file/${params}/active`, data)

export const useActiveFile = params => {
  return useMutation(['activeFile', params], data => activeFile(data, params))
}

//** delete File

const deleteFile = (data, params) => api.patch(`/file/${params}/delete`, data)

export const useDeleteFile = params => {
  return useMutation(['deleteFile', params], data => deleteFile(data, params))
}

//** Rename File

const renameFile = (data, params) => api.patch(`/file/${params}/rename`, data)

export const useRenameFile = params => {
  return useMutation(['renameFile', params], data => renameFile(data, params))
}

const deleteFolder = (data, params) => api.patch(`/folder/${params}/delete`, data)

export const useDeleteFolder = params => {
  return useMutation(['deleteFolder', params], data => deleteFolder(data, params))
}

//** API for Get history files/folders

const getHistory = params => api.get(`/file-history/all/${params}`)

export const useGetHistory = ({ onSuccess, onError, params }) => {
  return useQuery('getHistory', () => getHistory(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}

//** File Review

const reviewFile = (data, params) => api.patch(`/file/${params}/review`, data)

export const useReviewFile = params => {
  return useMutation(['reviewFile', params], data => reviewFile(data, params))
}

//** API for file reviewers list

const getReviewers = params => api.get(`/file/${params}`)

export const useGetReviewers = ({ onSuccess, onError, params }) => {
  return useQuery('getReviewers', () => getReviewers(params), {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}
