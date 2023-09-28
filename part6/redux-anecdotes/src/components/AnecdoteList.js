import { useSelector, useDispatch } from 'react-redux'
import { getAnecdotes, vote, set as setAnecdotes, initialize } from '../reducers/anecdoteReducer'
import { set as setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

function AnecdoteList() {
    const anecdotes = useSelector(getAnecdotes)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialize())
    }, [])

    const handleVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setNotification(`you voted "${anecdote.content.slice(0, 100)}"`))
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