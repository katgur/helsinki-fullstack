function Total({ parts }) {
    return <p style={{ fontWeight: 'bold' }}>Total of {
        parts.reduce((acc, value) => acc + value.exercises, 0)
    } exercises</p>
}

export default Total;