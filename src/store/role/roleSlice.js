import { createSlice } from '@reduxjs/toolkit'

export const roleSlice = createSlice({
  name: 'role',
  initialState: {
    roles: [],
    roleModal: false,
    roleRowSelected: {},
    searchRoleName: '',
    allPermissionsOfRole: [],
    submissionData: {
      name: '',
      permissionIds: [],
      password: '',
      type:'',
      locationId:null
    },
    rolePage:1
  },
  reducers: {
    setRolePage: (state, action) => {
      state.rolePage = action.payload
    },
    setRoles: (state, action) => {
      state.roles = action.payload
    },
    setRoleModal: (state, action) => {
      state.roleModal = action.payload
    },
    setRoleRowSelected: (state, action) => {
      state.roleRowSelected = action.payload
    },
    setSearchRole: (state, action) => {
      state.searchRoleName = action.payload
    },
    setAllPermissionsOfRole: (state, action) => {
      state.allPermissionsOfRole = action.payload
    },
    setSubmissionData: (state, action) => {
      state.submissionData = action.payload
    }
  }
})

export const { setRoles, setRoleModal, setSubmissionData, setRoleRowSelected, setSearchRole, setAllPermissionsOfRole ,setRolePage} =
  roleSlice.actions

export default roleSlice.reducer
