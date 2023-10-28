import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "role",
  initialState: {
    roles: [],
    roleById: {},
    roleModal: false,
    deleteRoleModal: false,
    permissions: [],
    searchRoleName: "",
  },
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setRoleById: (state, action) => {
      state.roleById = action.payload;
    },
    setDeleteRoleModal: (state, action) => {
      state.deleteRoleModal = action.payload;
    },
    setRoleModal: (state, action) => {
      state.roleModal = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    setSearchRole: (state, action) => {
      state.searchRoleName = action.payload;
    },
  },
});

export const {
  setRoleById,
  setRoles,
  setDeleteRoleModal,
  setRoleModal,
  setPermissions,
  setSearchRole
} = userSlice.actions;

export default userSlice.reducer;
