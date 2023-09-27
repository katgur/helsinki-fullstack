import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        set: (state, action) => {
            return action.payload
        }
    }
})

export const getNotification = state => state.notification
export const { set } = notificationSlice.actions
export default notificationSlice.reducer