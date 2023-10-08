import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "request",
  initialState: {
    requests: [],
    requestById: {},
    requestModal: false,
    deleteRequestModal: false,
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    setRequestById: (state, action) => {
      state.requestById = action.payload;
    },
    setDeleteRequestModal: (state, action) => {
      state.deleteRequestModal = action.payload;
    },
    setRequestModal: (state, action) => {
      state.requestModal = action.payload;
    },
  },
});

export const {
  setRequestById,
  setRequests,
  setDeleteRequestModal,
  setRequestModal,
} = userSlice.actions;

export default userSlice.reducer;
