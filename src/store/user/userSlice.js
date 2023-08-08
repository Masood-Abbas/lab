import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    userById: {},
    deletedAssignSection: [],
    deletedAssignRoles: [],
    deletedAssignPermissions: [],
    updateUserData: {
      firstName: '',
      lastName: '',
      email: '',
      newSectionIds: '',
      deletedUserSectionIds: '',
      newRoleIds: '',
      deletedUserRoleIds: '',
      status: '',
      category: '',
      permissions: '',
      userTitleIds: '',
      isAssignAllSections: false
    },
    filterUser: {
      name: '',
      employeeNo: null,
      status: null,
      unit: null
    },
    userTitles: [],
    uploadSign: '',
    userSignAndStamp: null,
    showUserSign: '',
    uploadStamp: '',
    showUserStamp: '',
    userPage:1
  },
  reducers: {
    setUserPage:(state,action) =>{
      state.userPage = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setUpdateUserData: (state, action) => {
      state.updateUserData = action.payload
    },
    setUserById: (state, action) => {
      state.userById = action.payload
    },
    setDeletedAssignSection: (state, action) => {
      state.deletedAssignSection = action.payload
    },
    setFilterUser: (state, action) => {
      state.filterUser = action.payload
    },
    setDeletedAssignRole: (state, action) => {
      state.deletedAssignRoles = action.payload
    },
    setTitles: (state, action) => {
      state.userTitles = action.payload
    },
    setDeletedAssignPermission: (state, action) => {
      state.deletedAssignPermissions = action.payload
    },
    setUploadSign: (state, action) => {
      state.uploadSign = action.payload
    },
    setUploadStamp: (state, action) => {
      state.uploadStamp = action.payload
    },
    setUserSignAndStamp: (state, action) => {
      state.userSignAndStamp = action.payload
    },
    setUserSign: (state, action) => {
      state.showUserSign = action.payload
    },
    setUserStamp: (state, action) => {
      state.showUserStamp = action.payload
    }
  }
})

export const {
  setUpdateUserData,
  setDeletedAssignRole,
  setDeletedAssignPermission,
  setDeletedAssignSection,
  setUserById,
  setUsers,
  setUploadStamp,
  setFilterUser,
  setTitles,
  setUserSignAndStamp,
  setUserStamp,
  setUserSign,
  setUploadSign,
  setUserPage
} = userSlice.actions

export default userSlice.reducer
