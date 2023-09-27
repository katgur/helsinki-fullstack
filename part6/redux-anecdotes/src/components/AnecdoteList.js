import { useSelector, useDispatch } from 'react-redux'
import { getAnecdotes, vote } from '../reducers/anecdoteReducer'
import { set } from '../reducers/notificationReducer'

function AnecdoteList() {
    const anecdotes = useSelector(getAnecdotes)
    const dispatch = useDispatch()

    const handleVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(set(`you voted "${anecdote.content.slice(0, 100)}"`))
    }

    return (
        <>
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
        </>
    )
}

export default AnecdoteList