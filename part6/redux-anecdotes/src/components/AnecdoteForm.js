import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { set } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

function AnecdoteForm() {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        anecdoteService.add(event.target.anecdote.value)
            .then(data => {
                dispatch(add(data))
                event.target.anecdote.value = ''
                dispatch(set('new anecdote created'))
            })
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