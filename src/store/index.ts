import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'
const store = configureStore({
  reducer: {
    user: userReducer
  },
  devTools: import.meta.env.DEV ? true : false
})

export default store
