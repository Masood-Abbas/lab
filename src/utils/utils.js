import { FileOperationsEnum } from '@/utils/constants'

const authoritiesMap = new Map([
    
    [FileOperationsEnum.ADD_USER, 'Add User'],
    [FileOperationsEnum.UPDATE_USER, 'Edit Users'],
    [FileOperationsEnum.VIEW_USER, 'View Users'],
    [FileOperationsEnum.DELETE_USER,'Delete Users'],
    [FileOperationsEnum.ADD_ROLE,'Add Role'],
    [FileOperationsEnum.UPDATE_ROLE,'Edit Role'],
    [FileOperationsEnum.VIEW_ROLE,'View Role'],
    [FileOperationsEnum.DELETE_ROLE,'Delete Role'],
    
  ])
  
  const defaultAuthority = value => value
  
  export const getAuthorityType = value => {
    return authoritiesMap.get(value) ?? defaultAuthority(value)
  }