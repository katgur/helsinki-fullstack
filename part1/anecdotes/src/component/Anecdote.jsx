function Anecdote({ anecdotes, votes, index }) {
    return (
        <>
            {
                index !== -1 && <div>
                    <p>{anecdotes[index]}</p>
                    <p>has {votes[index]} votes</p>
                </div>
            }
        </>
    )
}

export default Anecdote