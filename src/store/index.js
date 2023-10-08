import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/store/user/userSlice'
import titleSlice from './title/titleSlice'
import instrumentsSlice from './instruments/instrumentsSlice'
import requestSlice from './request/requestSlice'

export default configureStore({
  reducer: {
    user:userSlice,
    title: titleSlice,
    instrument: instrumentsSlice,
    request:requestSlice
  }
})
