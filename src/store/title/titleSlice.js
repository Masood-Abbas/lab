import { createSlice } from '@reduxjs/toolkit'

export const titleSlice = createSlice({
  name: 'title',
  initialState: {
    titles: [],
    titleModal: false,
    titleRowSelected: {},
    searchTitle: {
      name:''
    },
    submissionData: {
      name: '',
      password: '',
      type: '',
      locationId:""
    },
    page:1,
    deleteTitleModal:false,

  },
  reducers: {
    setPage : (state,action) =>{ 
      state.page =action.payload
    },
    setTitles: (state, action) => {
      state.titles = action.payload
    },
    setTitleModal: (state, action) => {
      state.titleModal = action.payload
    },
    setDeleteTitleModal: (state, action) => {
      state.deleteTitleModal = action.payload
    },
    setTitleRowSelected: (state, action) => {
      state.titleRowSelected = action.payload
    },
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload
    },
    setSubmissionData: (state, action) => {
      state.submissionData = action.payload
    }
  }
})

export const { setSearchTitle, setTitles, setTitleModal, setTitleRowSelected, setSubmissionData ,setPage,setDeleteTitleModal} = titleSlice.actions

export default titleSlice.reducer
