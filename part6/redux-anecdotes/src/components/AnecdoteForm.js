import { useDispatch } from 'react-redux'
import { add, create } from '../reducers/anecdoteReducer'
import { set } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

function AnecdoteForm() {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        dispatch(create(event.target.anecdote.value))
        event.target.anecdote.value = ''
        dispatch(set('new anecdote created'))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form>
        </>
    )
}

export default AnecdoteForm