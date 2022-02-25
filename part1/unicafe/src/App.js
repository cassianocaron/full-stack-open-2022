import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ text, value }) => (
    <div>{text} {value}</div>
  )


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      <Statistics text='good' value={good} />
      <Statistics text='neutral' value={neutral} />
      <Statistics text='bad' value={bad} />
      <Statistics text='all' value={all} />
      <Statistics text='average' value={(good - bad) / all} />
      <Statistics text='positive' value={(good / all) * 100} />
    </div>
  )
}

export default App