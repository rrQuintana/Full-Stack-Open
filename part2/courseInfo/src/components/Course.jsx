function Header({ course }) {
  return (
    <h1>{course.name}</h1>
  )
}

function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

function Content({ course }) {
  return (
    <div>
      {
        course.parts.map(part =>
          <Part key={part.id} part={part} />
        )
      }
      <b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    </div>
  )
}

function Course({ courses }) {

  return (
    <div>
      {
        courses.map(course =>
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
          </div>
        )
      }
    </div>
  )
}

export default Course