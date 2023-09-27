import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        set: (state, action) => {
            return action.payload
        },
        reset: (state, action) => {
            return ''
        }
    }
})

export const getNotification = state => state.notification
export const { set, reset } = notificationSlice.actions
export default notificationSlice.reducer