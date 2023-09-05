import StatisticLine from "./StatisticLine";

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
                            return <StatisticLine key={key} content={key} value={value} />
                        })
                    }
                    <StatisticLine content="all" value={calculateAll()} />
                    <StatisticLine content="average" value={calculateAverage().toFixed(2)} />
                    <StatisticLine content="positive" value={`${calculatePositive().toFixed(2)}%`} />
                </ul>
            }
            { !isFeedbackGiven && <p>No feedback given</p> }
        </section>
    )
}

export default Statistics