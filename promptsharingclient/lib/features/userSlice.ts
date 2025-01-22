import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../lib/store'

// Define a type for the slice state
export interface UserState {
    username: string
    password: string
}

// Define the initial state using that type
const initialState: UserState = {
    username: '',
    password: ''
}

export const counterSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setData: (state, action) => {
            state.username = action.payload.username
            state.password = action.payload.password
        },
        removeData: (state) => {
            state.username = ''
            state.password = ''
        }
    }
})

export const { setData, removeData } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => {
    return state.user
}

export default counterSlice.reducer