import { useState } from 'react'

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>
        {anecdote} <br />
        has {votes} votes
      </p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const mostVotes = points.indexOf(Math.max(...points))

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const randomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <div>
        <Button handleClick={vote} text="vote" />
        <Button handleClick={randomAnecdote} text="next anecdote" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {
          points.includes(Math.max(...points))
            ? <Anecdote anecdote={anecdotes[mostVotes]} votes={points[mostVotes]} />
            : <p>No votes yet</p>
        }
      </div>
    </div>
  )
}

export default App