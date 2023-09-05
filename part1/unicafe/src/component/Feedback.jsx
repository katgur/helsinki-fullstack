function Feedback({ incrementGood, incrementNeutral, incrementBad }) {
    return (
        <section>
            <h1>give feedback</h1>
            <button onClick={incrementGood}>good</button>
            <button onClick={incrementNeutral}>neutral</button>
            <button onClick={incrementBad}>bad</button>
        </section>
    )
}

export default Feedback