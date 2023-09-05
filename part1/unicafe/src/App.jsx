import { useState } from 'react'
import Feedback from './component/Feedback'
import Statistics from './component/Statistics'

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })

  const increment = {
    incrementGood: () => setFeedback({ ...feedback, good: feedback.good + 1 }),
    incrementNeutral: () => setFeedback({ ...feedback, neutral: feedback.neutral + 1 }),
    incrementBad: () => setFeedback({ ...feedback, bad: feedback.bad + 1 }),
  }

  const isFeedbackGiven = () => {
    return feedback.good || feedback.neutral || feedback.bad
  }

  return (
    <>
      <Feedback {...increment} />
      <Statistics data={feedback} isFeedbackGiven={(Boolean)(isFeedbackGiven())} />
    </>
  )
}

export default App