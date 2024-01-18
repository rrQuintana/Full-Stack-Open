const Header = (props) => <h1>{props.name}</h1>

const Part = (props) => <p>{props.name} {props.exercises}</p>

const Content = (props) => (
  <div>
    {props.parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
  </div>
)

const Total = (props) => (
  <p>
    Number of exercises {
      props.parts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises;
      }, 0)
    }
  </p>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App