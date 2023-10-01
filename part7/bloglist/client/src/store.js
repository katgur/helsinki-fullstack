import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
    },
    middleware: [thunk, logger],
})

export default store