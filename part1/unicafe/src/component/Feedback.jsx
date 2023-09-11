import Button from './Button'

function Feedback({ incrementGood, incrementNeutral, incrementBad }) {
    return (
        <section>
            <h1>give feedback</h1>
            <Button onClick={incrementGood} content="good" />
            <Button onClick={incrementNeutral} content="neutral" />
            <Button onClick={incrementBad} content="bad" />
        </section>
    )
}

export default Feedback