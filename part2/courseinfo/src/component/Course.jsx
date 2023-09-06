function Part({ part }) {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

function Content({ parts }) {
    return (
        <>
            {
                parts.map(part => {
                    return <Part key={part.name} part={part} />
                })
            }
        </>
    )
}

function Total({ parts }) {
    const total = parts.reduce((acc, value) => acc + value.exercises, 0)

    return <p style={{ fontWeight: 'bold' }}>Total of {total} exercises</p>
}

function Course({ course }) {
    return (
        <>
            <h2>{course.name}</h2>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}


export default Course