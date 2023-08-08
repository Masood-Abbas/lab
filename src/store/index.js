import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/store/user/userSlice'

export default configureStore({
  reducer: {
    user:userSlice
  }
})
