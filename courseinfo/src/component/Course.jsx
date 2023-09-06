import Header from './Header'
import Content from './Content'

function Course({ course }) {
    return (
        <>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course