import Content from './Content'
import Total from './Total'

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