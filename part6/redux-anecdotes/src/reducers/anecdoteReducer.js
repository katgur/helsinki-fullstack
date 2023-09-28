import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anectodes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const voted = state.find(s => s.id === action.payload)
      const newState = state.filter(s => s.id !== action.payload)
      newState.push({ ...voted, votes: voted.votes + 1 })
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    },
    add: (state, action) => {
      return [...state, action.payload]
    },
    set: (state, action) => {
      return action.payload
    }
  }
})

export const getAnecdotes = (state) => state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
export const { add, vote, set } = anecdotesSlice.actions

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

export default anecdotesSlice.reducer