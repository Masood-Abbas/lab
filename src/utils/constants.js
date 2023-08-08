import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import ArticleIcon from '@mui/icons-material/Article'
import GamesIcon from '@mui/icons-material/Games'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import AddLinkIcon from '@mui/icons-material/AddLink'
import LaunchIcon from '@mui/icons-material/Launch'
import { AiFillContainer } from 'react-icons/ai'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import RollerShadesClosedIcon from '@mui/icons-material/RollerShadesClosed'
import GridOnIcon from '@mui/icons-material/GridOn'
import ImageIcon from '@mui/icons-material/Image'

export const UNARCHIVED = 'Unarchive'

export const SELECTED_ROW_TYPE = {
  file: 'file',
  folder: 'folder',
  sub_folder: 'sub_folder',
  FORM_SUBMISSION: 'form_submission',
  FORM_TEMPLATE: 'from_template'
}

export const FILE_REVIEW = 'fileReview'

export const INACTIVE = 'inactive'

export const PASTE = 'Paste'

export const COPY = 'copy'

export const DELETE_FILE = 'delete_file'

export const MOVE_HERE = 'Move here'

export const COPY_CROSS_LOCATION_FOLDER = {
  title: 'Paste here',
  copyToOtherLocation: true
}

export const FROM_SOURCE_PATH = 'fromSourcePath'

export const MANUAL_SECTION_ABBREVIATION = 'MN'

export const ACTIVE = 'active'

export const DELETE_FOLDER = 'delete_folder'

export const PDF_VIEWER = `https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js`

export const SPECIAL_CHAR = [
  '!',
  '@',
  '!=',
  '!==',
  '%',
  '%=',
  '&',
  '&&',
  '&=',
  '*',
  '*=',
  '#',
  '+',
  '++',
  '+=',
  '-',
  '--',
  '-=',
  '/=',
  '<',
  '<<',
  '<=',
  '=',
  '==',
  '===',
  '>',
  '>=',
  '>>',
  '>>>',
  '^',
  '^=',
  '|',
  '||',
  '|=',
  '~',
  '?',
  ':',
  ',',
  ';',
  '[',
  ']',
  '{',
  '}',
  '(',
  ')',
  ' '
]

export const FileOperationsEnum = {
  CREATE_FOLDER: 'create_folder',
  CREATE_REQUEST: 'create_request',
  COPY_FOLDER: 'copy_folder',
  MOVE_FOLDER: 'move_folder',
  DELETE_FOLDER: 'delete_folder',
  RENAME_FOLDER: 'rename_folder',
  INACTIVE_FOLDER: 'inactive_folder',
  ACTIVE_FOLDER: 'active_folder',
  UPLOAD_FILE: 'upload_files',
  COPY_FILE: 'copy_file',
  MOVE_FILE: 'move_file',
  RENAME_FILE: 'rename_file',
  INACTIVE_FILE: 'inactive_file',
  ACTIVE_FILE: 'active_file',
  RENAME_ABBREVIATION: 'rename_abbreviation',
  ARCHIVE_FILE: 'archive_file',
  UN_ARCHIVE_FILE: 'un_archive_file',
  ARCHIVE_FOLDER: 'archive_folder',
  UN_ARCHIVE_FOLDER: 'un_archive_folder',
  FILE_REVIEW: 'file_review',
  ADD_USER: 'add_user',
  EDIT_USERS: 'edit_users',
  VIEW_USERS: 'view_users',
  ADD_TITLES: 'add_titles',
  EDIT_TITLES: 'edit_titles',
  VIEW_TITLES: 'view_titles',
  VIEW_MASTER_LIST: 'view_master_list',
  ADD_MASTER_LIST: 'add_master_list',
  EDIT_MASTER_LIST: 'edit_master_list',
  VIEW_ROLES: 'view_roles',
  ADD_ROLE: 'add_role',
  EDIT_ROLES: 'edit_roles',
  VIEW_FORM_CATEGORIES: 'view_form_categories',
  ADD_FORM_CATEGORIES: 'add_form_categories',
  EDIT_FORM_CATEGORIES: 'edit_form_categories',
  LIST_FORM_TEMPLATES: 'list_form_templates',
  ADD_FORM_TEMPLATE: 'add_form_template',
  PUBLISH_FORM: 'publish_form',
  UNPUBLISHED_FORM: 'unpublished_form',
  REVIEW_FORMS: 'review_forms',
  APPROVE_FORMS: 'approve_forms',
  SUBMIT_FORM: 'create_submissions',
  IN_PROGRESS: 'in_progress',
  CREATE_LOCATION: 'create_location',
  EDIT_LOCATION: 'edit_location',
  VIEW_LOCATION: 'view_location',
  CREATE_CROSS_LOCATION_USER: 'create_cross_location_user',
  VIEW_CROSS_LOCATION_USER: 'view_cross_location_user',
  EDIT_CROSS_LOCATION_USER: 'edit_cross_location_user',
  CROSS_LOCATION_COPY_DIRECTORY: 'cross_location_copy_directory',
  CREATE_GLOBAL_ENTITIES: 'create_global_entities',
  ASSIGN_PERMISSIONS: 'assign_permissions'
}

export const FORM_COMPONENT = [
  { visibility: true, value: 'input', name: 'Input', icon: <TextFieldsIcon size='10' color='primary' /> },
  { visibility: true, value: 'textArea', name: 'Text Area', icon: <ArticleIcon size='10' color='primary' /> },
  {
    visibility: true,
    value: 'dropdown',
    name: 'Dropdown',
    icon: <ArrowDropDownCircleIcon size='10' color='primary' />
  },
  { visibility: true, value: 'checkbox', name: 'Checkboxes', icon: <CheckBoxIcon size='10' color='primary' /> },
  {
    visibility: true,
    value: 'radio',
    name: 'Radio Button',
    icon: <RadioButtonCheckedIcon size='10' color='primary' />
  },
  { visibility: true, value: 'date', name: 'Date', icon: <InsertInvitationIcon size='10' color='primary' /> },
  { visibility: true, value: 'entity', name: 'Entity', icon: <GamesIcon size='10' color='primary' /> },
  {
    visibility: true,
    value: 'ma',
    name: 'Master Abbreviation',
    icon: <AiFillContainer style={{ size: '10', color: 'primary' }} className={'inactive-icon'} />
  },
  { visibility: true, value: 'attachment', name: 'Attachment', icon: <AttachFileIcon size='10' color='primary' /> },
  { visibility: true, value: 'link', name: 'Link', icon: <AddLinkIcon size='10' color='primary' /> },
  { visibility: true, value: 'webLink', name: 'Web Link', icon: <LaunchIcon size='10' color='primary' /> },
  { visibility: true, value: 'month', name: 'Month', icon: <CalendarMonthIcon size='10' color='primary' /> },
  { visibility: true, value: 'year', name: 'Year', icon: <CalendarTodayIcon size='10' color='primary' /> },
  { visibility: true, value: 'label', name: 'Label', icon: <FormatColorTextIcon size='10' color='primary' /> },
  { visibility: false, value: 'monthly', name: 'Monthly', icon: <GridOnIcon size='10' color='primary' /> },
  { visibility: true, value: 'calendar', name: 'Calendar', icon: <GridOnIcon size='10' color='primary' /> },

  // {visibility:true,value: 'header', name: 'Header'},
  { visibility: true, value: 'footer', name: 'Footer', icon: <RollerShadesClosedIcon size='10' color='primary' /> },
  { visibility: true, value: 'image', name: 'Image', icon: <ImageIcon size='10' color='primary' /> }
]

// ** FT_OPTIONS mean Form Template Option

export const FT_OPTIONS = {
  label: 'label',
  dropdown: 'dropdown',
  checkbox: 'checkbox',
  radio: 'radio',
  date: 'date',
  input: 'input',
  textArea: 'textArea',
  entity: 'entity',
  attachment: 'attachment',
  link: 'link',
  webLink: 'webLink',
  ma: 'ma',
  month: 'month',
  year: 'year',
  monthly: 'monthly',
  calendar: 'calendar',
  footer: 'footer',
  image: 'image'
}

export const FORM_STATUS = [
  // { name: 'Draft', value: 'draft' },
  { name: 'Publish', value: 'publish' },
  { name: 'Unpublish', value: 'unpublish' }
]

export const FormApprovalPathEnum = {
  DONE_BY: 'done_by',
  REVIEV_BY: 'review_by',
  APPROVE_BY: 'approve_by',
  UPLOADED_BY: 'uploaded_by',
  REACTIVE_BY: 'reactive_by',
  INACTIVE_BY: 'inactive_by',
  DELETED_BY: 'deleted_by'
}

export const MASTER_ABBREVIATION_CATEGORIES_KEYS = {
  TEST: 'test',
  INSTRUMENT: 'instrument',
  EQUIPMENT: 'equipment',
  SERVICE: 'service',
  QUALITY: 'quality',
  UNIT: 'unit',
  LAB: 'lab',
  PT_SURVEYS: 'pt_surveys',
  ANALYZER: 'analyzer',
  UNGRADED_CAP_CODE: 'ungraded_cap_code',
  SECTION: 'section'
}

export const MASTER_ABBREVIATION_CATEGORIES = [
  { label: 'Test', value: 'test', isSerialNo: false, isUnit: false, isAbbreviation: true },
  { label: 'Instrument', value: 'instrument', isSerialNo: true, isUnit: false, isAbbreviation: true },
  { label: 'Equipment', value: 'equipment', isSerialNo: true, isUnit: true, isAbbreviation: true },
  { label: 'Service', value: 'service', isSerialNo: false, isUnit: true, isAbbreviation: true },
  { label: 'Quality', value: 'quality', isSerialNo: false, isUnit: true, isAbbreviation: true },
  { label: 'Unit', value: 'unit', isSerialNo: false, isUnit: false, isAbbreviation: true },
  { label: 'Lab', value: 'lab', isSerialNo: false, isUnit: false, isAbbreviation: false },
  { label: 'PT Surveys', value: 'pt_surveys', isSerialNo: false, isUnit: false, isAbbreviation: false },
  { label: 'Analyzer', value: 'analyzer', isSerialNo: false, isUnit: false, isAbbreviation: false },
  { label: 'Ungraded Cap Code', value: 'ungraded_cap_code', isSerialNo: false, isUnit: false, isAbbreviation: true }
]

export const WORKFLOW_ROUTES = {
  workflow: { route: 'workflow', isReadyForReview: true },
  ongoing: { route: 'ongoing', isReadyForReview: false }
}

export const FOLDER_PATH_NAME = {
  Archived_Forms: 'Archived_Forms',
  Approved_Templates: 'Approved_Templates'
}

export const EMPLOYEE_TYPE = {
  PP: 'performing_personnel',
  NPP: 'non_performing_personnel'
}

export const FORM_ACTIONS = {
  CREATE_TEMPLATE: 'create_template',
  PUBLISH: 'publish',
  UN_PUBLISH: 'un_publish',
  IN_PROGRESS: 'in_progress'
}

export const FORM_SUBMISSION_STATUS = {
  IN_PROGRESS: 'in_progress',
  ADD_INITIAL: 'add_initial',
  RETURNED: 'returned'
}

export const imageExtensions = [
  "jpeg",
  "jpg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "tif",
  "webp",
  "svg",
  "psd",
  "ai",
];
