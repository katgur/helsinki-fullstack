import AnecdoteForm from './components/AnecdoteForm'
import Notification, { NotificationContext } from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { editAnecdote, getAnecdotes } from './requests.js'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'RESET':
      return null
    default:
      return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()
  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )
  const voteAnecdoteMutation = useMutation(editAnecdote, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({ type: 'SET', payload: `you voted "${response.data.content}"`})
    }
  })

  if (result.isLoading) {
    return <p>loading ...</p>
  }

  if (result.isError) {
    return <p>anecdote service is not available due to problems on server</p>
  }

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
