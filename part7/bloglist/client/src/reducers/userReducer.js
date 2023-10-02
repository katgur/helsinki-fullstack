import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        byCount: []
    },
    reducers: {
        setByCount: (state, action) => {
            return { byCount: action.payload }
        }
    }
})

const { setByCount } = userSlice.actions

export const selectUsersByCount = (state) => state.users.byCount

export const getUsersByCount = () => {
    return async dispatch => {
        const users = await userService.getByCount()
        dispatch(setByCount(users))
    }
}

export default userSlice.reducer