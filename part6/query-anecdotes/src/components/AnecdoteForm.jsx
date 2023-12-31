import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import { NotificationContext } from "./Notification"

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation(createAnecdote, {
    onMutate: data => {
      if (data.length < 5) {
        throw new Error('too short anecdote, must have length 5 or more')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({ type: 'SET', payload: 'you created new anecdote' })
    },
    onError: error => {
      notificationDispatch({ type: 'SET', payload: error.message })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
