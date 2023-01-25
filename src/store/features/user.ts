import { getUserInfo } from '@/server/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
export const fetchUserInfoAction = createAsyncThunk(
  'fetch/userinfo',
  async (_, store) => {
    const res = await getUserInfo()
    store.dispatch(changeUser(res.result))
  }
)
const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    state: -1,
    info: '',
    avactor: ''
  },
  reducers: {
    changeUser(state, { payload }) {
      state.avactor = payload.avactor
      state.info = payload.info
      state.name = payload.name
      state.state = payload.state
    }
  }
})

export const { changeUser } = userSlice.actions
export default userSlice.reducer
