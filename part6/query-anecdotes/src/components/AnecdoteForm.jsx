import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
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
        <input name='anecdote' minLength="5" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
