function Statistics({ data }) {
    return (
        <section>
            <h1>statistics</h1>
            {
                Object.entries(data).map(([key, value]) => {
                    return <p key={key}>{key} {value}</p>
                })
            }
        </section>
    )
}

export default Statistics