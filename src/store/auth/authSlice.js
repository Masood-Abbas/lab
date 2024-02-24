import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    authenticated: false,
    userFirstName: null,
    userLastName: null,
    email: null,
    employeeId: null,
    designation: null,
    signStamp: null,
    userId: null,
    locationName: null,
    category: null,
    userSectionsName: [],
    userProfileImage: '',
    userUploadProfile: null,
    userPermissions: [],
    uploadUserProfileImage: '',
    employeeType: '',
    employeeInitial: '',
    userSign: null,
    userStamp: null,
    userTitles: [],
    userRoles: [],
    authUserLocation: ''
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload
    },
    setUploadUserProfileImage: (state, action) => {
      state.uploadUserProfileImage = action.payload
    },
    setUserInfo: (state, action) => {
      state.userFirstName = action.payload?.firstName
      state.userLastName = action.payload?.lastName
      state.email = action.payload?.email
      state.designation = action.payload?.designation?.abbreviation
      state.employeeId = action.payload?.employeeNo
      state.signStamp = action.payload?.sign
      state.userId = action.payload?.id
      state.category = action.payload?.category
      state.locationName = action.payload?.location?.name
      state.userSectionsName = action.payload?.userSections
      state.userProfileImage = action?.payload?.avatarKey
      state.userPermissions = action.payload?.permissions
      state.employeeType = action.payload?.employeeType
      state.employeeInitial = action.payload?.initials
      state.userSign = action.payload?.sign
      state.userStamp = action.payload?.stamp
      state.userTitles = action.payload?.userDesignations
      state.userRoles = action.payload?.userRolePermissions
      state.authUserLocation = action.payload?.location
    },
    setUserUploadProfile: state => {
      state.userUploadProfile = action.payload
    },
    logoutUser: state => {
      state.user = null
      state.authenticated = false
    }
  }
})

export const { setUser, setUserInfo, setAuthenticated, logoutUser, setUserUploadProfile, setUploadUserProfileImage } =
  authSlice.actions

export default authSlice.reducer
