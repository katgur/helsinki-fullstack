interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: Array<string>,
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({ courseName }) => (
  <h1>{courseName}</h1>
)

const Part = ({ part }) => {
  switch (part.kind) {
    case 'basic':
      return <p>
        <h2>{part.name} {part.exerciseCount}</h2>
        <i>{part.description}</i>
      </p>;
    case 'group':
      return <p>
        <h2>{part.name} {part.exerciseCount}</h2>
        <p>project exercises count {part.groupProjectCount}</p>
      </p>;
    case 'background':
      return <p>
        <h2>{part.name} {part.exerciseCount}</h2>
        <i>{part.description}</i>
        <p>submit to {part.backgroundMaterial}</p>
      </p>;
    case 'special':
      return <p>
        <h2>{part.name} {part.exerciseCount}</h2>
        <i>{part.description}</i>
        <p>required skills: {part.requirements.join(', ')}</p>
      </p>;
    default:
      return assertNever(part);
  }
}

const Content = ({ courseParts }) => (
  courseParts.map(coursePart => <Part key={coursePart.name} part={coursePart} />)
)

const Total = ({ courseParts }) => {
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
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