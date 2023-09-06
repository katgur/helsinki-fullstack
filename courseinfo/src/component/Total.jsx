function Total({ parts }) {
    const total = parts.reduce((acc, value) => acc + value.exercises, 0)

    return <p style={{ fontWeight: 'bold' }}>Total of {total} exercises</p>
}

export default Total;