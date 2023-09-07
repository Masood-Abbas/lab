import { createSlice } from '@reduxjs/toolkit'

export const instrumentsSlice = createSlice({
  name: 'instruments',
  initialState: {
    instruments: [],
    instrumentModal: false,
    instrumentRowSelected: {},
    searchInstrument: {
      name: ''
    },
    submissionData: {
      name: '',
      password: '',
      type: '',
      locationId: ""
    },
    page: 1,
    deleteInstrumentModal: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setInstruments: (state, action) => {
      state.instruments = action.payload
    },
    setInstrumentModal: (state, action) => {
      state.instrumentModal = action.payload
    },
    setDeleteInstrumentModal: (state, action) => {
      state.deleteInstrumentModal = action.payload
    },
    setInstrumentRowSelected: (state, action) => {
      state.instrumentRowSelected = action.payload
    },
    setSearchInstrument: (state, action) => {
      state.searchInstrument = action.payload
    },
    setSubmissionData: (state, action) => {
      state.submissionData = action.payload
    }
  }
})

export const { setPage, setInstruments, setInstrumentModal, setDeleteInstrumentModal, setInstrumentRowSelected, setSearchInstrument, setSubmissionData } = instrumentsSlice.actions

export default instrumentsSlice.reducer