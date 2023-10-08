const Header = ({ courseName }) => (
  <h1>{courseName}</h1>
)

const Content = ({ courseParts }) => (
  courseParts.map(coursePart => (<p>
    {coursePart.name} {coursePart.exerciseCount}
  </p>))
)

const Total = ({ courseParts }) => {
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];


  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;