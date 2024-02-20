import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthAPI } from '../lib/Auth'

export type UserPayload = {
  fullName: string, 
  email: string,
  jwt: string,
}

export type UserStateHolder = {
  value: Maybe<UserPayload>
}

export type Maybe<T> = T | null

const initialState: UserStateHolder = { value: JSON.parse(localStorage.getItem('user') ?? 'null') }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      // if(state == null) throw Error("Already Logged Out")
      localStorage.removeItem('user') // side effect
      state.value = null
    },
    login: (state, action: PayloadAction<UserPayload>) => {
      localStorage.setItem('user', JSON.stringify(action.payload)) // side effect
      state.value = action.payload
    },
  },
})

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const userLoginThunk = (jwt: string): AppThunk<void> => async (dispatch) => {
  const userData = await AuthAPI.getuserDetails(jwt)
  dispatch(login({ ...userData, jwt}))
  // const response = await fetch(`/fakeApi/todo/${jwt}`)
  // dispatch(login(await response.json()))
}

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer