import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import anecdotes from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anectodes',
  initialState: [],
  reducers: {
    edit: (state, action) => {
      const newState = state.filter(s => s.id !== action.payload.id)
      newState.push(action.payload)
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    },
    add: (state, action) => {
      return [...state, action.payload]
    },
    set: (state, action) => {
      const newState = action.payload
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    }
  }
})

export const getAnecdotes = (state) => state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
export const { add, edit, set } = anecdotesSlice.actions

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(set(anecdotes))
  }
}

export const create = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.add(content)
    dispatch(add(newAnecdote))
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.edit(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch(edit(newAnecdote))
  }
}

export default anecdotesSlice.reducer