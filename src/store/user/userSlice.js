import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    userById: {},
    deletedAssignSection: [],
    deletedAssignRoles: [],
    deletedAssignPermissions: [],
    
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setUserById: (state, action) => {
      state.userById = action.payload
    },
  }
})

export const {
  setUserById,
  setUsers,
} = userSlice.actions

export default userSlice.reducer
