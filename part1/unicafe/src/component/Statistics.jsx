function Statistics({ data, isFeedbackGiven }) {
    const calculateAll = () => {
        return Object.entries(data).reduce((acc, entry) => acc + entry[1], 0)
    }

    const calculateAverage = () => {
        const count = calculateAll()
        if (count == 0) {
            return 0;
        }
        return (data.good - data.bad) / count
    }

    const calculatePositive = () => {
        const count = calculateAll()
        if (count == 0) {
            return 0;
        }
        return data.good / count
    }

    return (
        <section>
            <h1>statistics</h1>
            {isFeedbackGiven &&
                <ul>
                    {
                        Object.entries(data).map(([key, value]) => {
                            return <li key={key}>{key} {value}</li>
                        })
                    }
                    <li>all {calculateAll()}</li>
                    <li>average {calculateAverage().toFixed(2)}</li>
                    <li>positive {calculatePositive().toFixed(2)}%</li>
                </ul>
            }
            { !isFeedbackGiven && <p>No feedback given</p> }
        </section>
    )
}

export default Statistics