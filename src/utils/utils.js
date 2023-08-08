import {
  FORM_ACTIONS,
  MASTER_ABBREVIATION_CATEGORIES,
  MASTER_ABBREVIATION_CATEGORIES_KEYS,
  SPECIAL_CHAR
} from '@/utils/constants'
import { FileOperationsEnum, EMPLOYEE_TYPE } from '@/utils/constants'
import AWS from 'aws-sdk'
import dayjs from 'dayjs'

const linkPattern = /^(ftp|http|https):\/\/[^ "]+$/

export const capitalize = (string = '') => {
  return string?.charAt(0).toUpperCase() + string?.slice(1)
}

export const s3BaseURL = value => {
  if (value) return `${process.env.NEXT_PUBLIC_IMAGE_URL}${value}`
}

// For checking role is admin or lab director

export const userContainsRoles = userRoles => {
  return userRoles?.some(obj => {
    return obj?.role?.name?.toUpperCase() === 'ADMIN' || obj?.role?.name?.toUpperCase() === 'LAB DIRECTOR'
  })
}

export const filterFileName = fileName => {
  const regex = new RegExp('[' + SPECIAL_CHAR.join('\\') + ']', 'g')

  return fileName?.replace(regex, '-')
}

// To Delete Cookies just pass the name of the cookie;

export const deleteCookie = name => {
  return (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`)
}

//** Function to Join Array Elements and make route with
export const slugParamJoin = value => {
  return `/${value?.join('/')}`
}

//** Set Session Storage
export const setSessionStorage = (name, value) => sessionStorage.setItem(name, value)

//** Get Session Storage
export const getSessionStorage = name => sessionStorage.getItem(name)

const operationMap = new Map([
  [FileOperationsEnum.CREATE_FOLDER, 'Created Folder'],
  [FileOperationsEnum.MOVE_FOLDER, 'Folder Moved'],
  [FileOperationsEnum.COPY_FOLDER, 'Folder Copied'],
  [FileOperationsEnum.RENAME_FOLDER, 'Folder Renamed'],
  [FileOperationsEnum.ARCHIVE_FOLDER, 'Archived Folder'],
  [FileOperationsEnum.UN_ARCHIVE_FOLDER, 'Un Archived Folder'],
  [FileOperationsEnum.INACTIVE_FOLDER, 'Folder Inactive'],
  [FileOperationsEnum.ACTIVE_FOLDER, 'Folder Active'],
  [FileOperationsEnum.UPLOAD_FILE, 'Uploaded File'],
  [FileOperationsEnum.COPY_FILE, 'File Copied'],
  [FileOperationsEnum.MOVE_FILE, 'File Moved'],
  [FileOperationsEnum.RENAME_FILE, 'File Renamed'],
  [FileOperationsEnum.INACTIVE_FILE, 'File Inactive'],
  [FileOperationsEnum.ACTIVE_FILE, 'File Active'],
  [FileOperationsEnum.RENAME_ABBREVIATION, 'Rename Abbreviation'],
  [FileOperationsEnum.ARCHIVE_FILE, 'Archived File'],
  [FileOperationsEnum.UN_ARCHIVE_FILE, 'Un Archived File'],
  [FileOperationsEnum.FILE_REVIEW, 'File Reviewed'],
  [FileOperationsEnum.IN_PROGRESS, 'Form In Progress']
])

const employeeType = new Map([
  [EMPLOYEE_TYPE?.PP, 'Performing Personnel'],
  [EMPLOYEE_TYPE?.NPP, 'Non Performing Personnel']
])

const defaultOperationName = value => value

export const employeeTypeOperation = value => {
  return employeeType.get(value) ?? defaultOperationName(value)
}

export const getOperationType = value => {
  return operationMap.get(value) ?? defaultOperationName(value)
}

const authoritiesMap = new Map([
  [FileOperationsEnum.CREATE_FOLDER, 'Create Folder'],
  [FileOperationsEnum.CREATE_REQUEST, 'Create New Workflow Request'],
  [FileOperationsEnum.MOVE_FOLDER, 'Folder Move'],
  [FileOperationsEnum.DELETE_FOLDER, 'Delete Folder'],
  [FileOperationsEnum.COPY_FOLDER, 'Folder Copy'],
  [FileOperationsEnum.RENAME_FOLDER, 'Folder Rename'],
  [FileOperationsEnum.INACTIVE_FOLDER, 'Folder Inactive'],
  [FileOperationsEnum.ACTIVE_FOLDER, 'Folder Active'],
  [FileOperationsEnum.UPLOAD_FILE, 'Upload File'],
  [FileOperationsEnum.INACTIVE_FILE, 'File Inactive'],
  [FileOperationsEnum.ACTIVE_FILE, 'File Active'],
  [FileOperationsEnum.RENAME_ABBREVIATION, 'Rename Abbreviation'],
  [FileOperationsEnum.ARCHIVE_FILE, 'Archive File'],
  [FileOperationsEnum.UN_ARCHIVE_FILE, 'Unarchive File'],
  [FileOperationsEnum.ARCHIVE_FOLDER, 'Archive Folder'],
  [FileOperationsEnum.UN_ARCHIVE_FOLDER, 'Unarchive Folder'],
  [FileOperationsEnum.FILE_REVIEW, 'File Reviewed'],
  [FileOperationsEnum.ADD_USER, 'Add User'],
  [FileOperationsEnum.EDIT_USERS, 'Edit Users'],
  [FileOperationsEnum.VIEW_USERS, 'View Users'],
  [FileOperationsEnum.ADD_TITLES, 'Add Titles'],
  [FileOperationsEnum.EDIT_TITLES, 'Edit Titles'],
  [FileOperationsEnum.VIEW_TITLES, 'View Titles'],
  [FileOperationsEnum.VIEW_MASTER_LIST, 'View Master List'],
  [FileOperationsEnum.ADD_MASTER_LIST, 'Add Master List'],
  [FileOperationsEnum.EDIT_MASTER_LIST, 'Edit Master List'],
  [FileOperationsEnum.VIEW_ROLES, 'View Roles'],
  [FileOperationsEnum.ADD_ROLE, 'Add Role'],
  [FileOperationsEnum.EDIT_ROLES, 'Edit Roles'],
  [FileOperationsEnum.VIEW_FORM_CATEGORIES, 'View Form Categories'],
  [FileOperationsEnum.ADD_FORM_CATEGORIES, 'Add Form Categories'],
  [FileOperationsEnum.EDIT_FORM_CATEGORIES, 'Edit Form Categories'],
  [FileOperationsEnum.LIST_FORM_TEMPLATES, 'List Form Templates'],
  [FileOperationsEnum.ADD_FORM_TEMPLATE, 'Add Form Template'],
  [FileOperationsEnum.PUBLISH_FORM, 'Publish Form'],
  [FileOperationsEnum.UNPUBLISHED_FORM, 'Unpublished Form'],
  [FileOperationsEnum.REVIEW_FORMS, 'Review Forms'],
  [FileOperationsEnum.APPROVE_FORMS, 'Approve Forms'],
  [FileOperationsEnum.SUBMIT_FORM, 'Create Form'],
  [FileOperationsEnum.IN_PROGRESS, 'Form In Progress'],
  [FileOperationsEnum.CREATE_LOCATION, 'Create Location'],
  [FileOperationsEnum.EDIT_LOCATION, 'Edit Location'],
  [FileOperationsEnum.VIEW_LOCATION, 'View Location'],
  [FileOperationsEnum.CREATE_CROSS_LOCATION_USER, 'Create Cross Location User'],
  [FileOperationsEnum.VIEW_CROSS_LOCATION_USER, 'View Cross Location User'],
  [FileOperationsEnum.EDIT_CROSS_LOCATION_USER, 'Edit Cross Location User'],
  [FileOperationsEnum.CROSS_LOCATION_COPY_DIRECTORY, 'Cross Location Copy Directory'],
  [FileOperationsEnum.CREATE_GLOBAL_ENTITIES, 'Create Global Entities'],
  [FileOperationsEnum.ASSIGN_PERMISSIONS, 'Assign Authorities']
])

const defaultAuthority = value => value

export const getAuthorityType = value => {
  return authoritiesMap.get(value) ?? defaultAuthority(value)
}

const formActionsMap = new Map([
  [FORM_ACTIONS.CREATE_TEMPLATE, 'Form Template Created'],
  [FORM_ACTIONS.UN_PUBLISH, 'Form Template Unpublished'],
  [FORM_ACTIONS.PUBLISH, 'Form Template Published'],
  [FORM_ACTIONS.IN_PROGRESS, 'Form In Progress']
])

const defaultFormAction = value => value

export const getFormActions = value => {
  return formActionsMap.get(value) ?? defaultFormAction(value)
}

const categoriesMap = new Map([
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.TEST, 'Test'],
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.INSTRUMENT, 'Instrument'],
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.EQUIPMENT, 'Equipment'],
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.SERVICE, 'Service'],
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.QUALITY, 'Quality'],
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.UNIT, 'Unit'],
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.SECTION, 'Unit'],
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.LAB, 'Lab'],
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.PT_SURVEYS, 'PT Surveys'],
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.ANALYZER, 'Analyzer'],
  [MASTER_ABBREVIATION_CATEGORIES_KEYS?.UNGRADED_CAP_CODE, 'Ungraded Cap Code']
])

const defaultLabEntity = value => value

export const LabEntity = value => categoriesMap.get(value) ?? defaultLabEntity(value)

export const uploadFileAws = async ({
  file,
  dispatch = null,
  addUploadedFile = null,
  setFileProgress = null,
  fileKey = '',
  filePath = '',
  setFormSubmitLoading = null
}) => {
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  })

  const s3Bucket = new AWS.S3({
    params: { Bucket: process.env.NEXT_PUBLIC_S3_BUCKET },
    region: process.env.NEXT_PUBLIC_AWS_REGION
  })

  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
    Key: `${filePath}/${new Date().getTime()}-${filterFileName(file?.name)}`
  }
  try {
    if (setFileProgress) {
      request.on('httpUploadProgress', function (evt) {
        const progress = Math.round((evt.loaded / evt.total) * 100)
        setFileProgress(prevProgress => ({ ...prevProgress, [file.name]: progress }))
      })
    }

    return await s3Bucket.upload(params).promise()
  } catch (error) {
    dispatch(setFormSubmitLoading(false))
  }
}

export const isValidLink = link => linkPattern.test(link)

export const extractDate = ({ date, isDay = true, isMonth = true, isYear = true }) => {
  const newDate = date ? new Date(date?.toString()) : dayjs()?.$d
  const day = isDay ? newDate.getDate() : ''
  const month = isMonth ? newDate?.toLocaleString('en-US', { month: 'long' }) : ''
  const year = isYear ? newDate.getFullYear() : ''

  return [month, day, year].filter(Boolean).join('-')
}

export const checkUserAssignPermissions = (param, permissions) => {
  for (let i = 0; i < permissions?.length; i++) {
    if (permissions[i].name === param) {
      return true
    }
  }

  return false
}

export const getRandomOptions = ({ type, currentDate }) => {
  let date
  if (currentDate) {
    date = dayjs(new Date(currentDate))
  } else {
    date = dayjs(new Date())
  }
  const lastDateOfMonth = date.endOf(type).date()

  return Array.from({ length: lastDateOfMonth }, (_, index) => {
    return { name: `${index + 1}` }
  })
}

export const areDatesWithin24Hours = ({ date1, date2 }) => {
  date1 = new Date(date1)
  date2 = new Date(date2)
  if (date1 && date2) {
    const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime())
    const hoursDifference = diffInMilliseconds / (1000 * 60 * 60)

    return hoursDifference <= 24
  }

  return false
}
