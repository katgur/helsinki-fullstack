import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import logger from 'redux-logger'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer
    },
    middleware: [logger],
})

export default store