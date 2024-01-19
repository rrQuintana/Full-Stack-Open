import { useState } from 'react'

const roundToTwo = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

const Button = (props) => {
  const { text, handleClick } = props

  return (
    <button type="button" onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = (props) => {
  const { text, value } = props

  return (
    <tr>
      <th style={{ textAlign: "left" }}>{text}</th>
      <th style={{ textAlign: "left" }}>{value}</th>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  if (total === 0) return <p>No feedback given</p>

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={roundToTwo(average) || 0} />
        <StatisticsLine text="positive" value={`${roundToTwo(positive) || 0} %`} />
      </tbody>
    </table>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="Good" handleClick={() => setGood(good + 1)} />
        <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      </div>

      <div>
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App