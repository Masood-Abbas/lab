import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/store/user/userSlice'
import titleSlice from './title/titleSlice'

export default configureStore({
  reducer: {
    user:userSlice,
    title:titleSlice
  }
})
