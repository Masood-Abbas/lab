import { FT_OPTIONS, MASTER_ABBREVIATION_CATEGORIES } from '@/utils/constants'

export const ENTITY_RELATIONS = {
  section: {
    options: []
  }
}

const MASTER_ABBREVIATIONS = {}
MASTER_ABBREVIATION_CATEGORIES?.forEach(item => {
  MASTER_ABBREVIATIONS[`${item?.value}`] = {
    label: item?.label,
    options: [],
    isUnit: item?.isUnit,
    isSerialNo: item?.isSerialNo,
    isAbbreviation: item?.isAbbreviation
  }
})

export { MASTER_ABBREVIATIONS }

export const APPROVAL_PATHS = [
  {
    name: 'SUBMIT',
    value: 'done_by',
    disable: true,
    checked: true
  },
  {
    name: 'REVIEW',
    value: 'review_by'
  },
  {
    name: 'APPROVE',
    value: 'approve_by'
  }
]

export const REMARKS = [
  { value: 'Received and Accepted', remarks: 'Received and Accepted' },
  { value: 'Received and Approved', remarks: 'Received and Approved' },
  { value: 'Check Again', remarks: 'Check Again' },
  { value: 'Please Check', remarks: 'Please Check' },
  { value: 'other', remarks: 'other' }
]

export const TEXTAREA_MAX_ROWS = 10

export const DATE_PICKER_LABELS = {
  [FT_OPTIONS.date]: { label: 'Month, Day, Year', views: ['year', 'month', 'day'] },
  [FT_OPTIONS.month]: { label: 'Month, Year', views: ['month', 'year'] },
  [FT_OPTIONS.year]: { label: 'Year', views: ['year'] }
}

export const TEXT_ALIGNS = {
  left: 'left',
  center: 'center',
  right: 'right'
}

export const FONT_WEIGHT_LABELS = {
  regular: 'regular',
  mediumBold: 'medium bold',
  bold: 'bold'
}

export const FONT_WEIGHTS = {
  [`${FONT_WEIGHT_LABELS.regular}`]: '400',
  [`${FONT_WEIGHT_LABELS.mediumBold}`]: '500',
  [`${FONT_WEIGHT_LABELS.bold}`]: '600'
}

export const FONT_STYLES = {
  textAlign: 'textAlign',
  fontWeight: 'fontWeight'
}

export const FORM_TYPE_OBJECTS = {
  ON_DEMAND: {
    title: 'On Demand',
    name: 'ON_DEMAND',
    isReadyForReview: true,
    isEditable: false
  },
  MONTHLY: {
    title: 'Monthly',
    name: 'MONTHLY',
    isReadyForReview: false,
    isEditable: true
  },
  ONE_DAY: {
    title: 'One Day',
    name: 'ONE_DAY',
    isReadyForReview: false,
    isEditable: true
  }
}

export const FORM_TYPES = Object.keys(FORM_TYPE_OBJECTS)?.map(item => FORM_TYPE_OBJECTS?.[item])

export const CALENDAR_EVENT_OBJECTS = {
  initial: {
    title: 'Add Initial',
    name: 'initial',
    color: '#146562FF',
    start: '',
    end: '',
    isShow: true,
    isRemoveAble: false
  },
  holiday: {
    title: 'Mark Holiday',
    name: 'holiday',
    color: '#146562FF',
    start: '',
    end: '',
    isShow: true,
    isRemoveAble: false
  }
}

export const REMOVE_EVENT_OBJECTS = {
  title: 'Remove',
  name: 'remove',
  color: 'red',
  start: '',
  end: '',
  isShow: true,
  isRemoveAble: true
}

export const CALENDAR_EVENTS = Object.keys(CALENDAR_EVENT_OBJECTS)?.map(item => CALENDAR_EVENT_OBJECTS?.[item])
