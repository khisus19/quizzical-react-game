import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import hardCodedQuestions from "../data"
import Question from "./components/Question"

function App() {
  const [count, setCount] = useState(0)
  const [questionSet, setQuestionSet] = useState([])
  const [token, setToken] = useState("")
  
  useEffect(() => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then(res => res.json())
      .then(data => setToken(data.token))
  }, [])

  useEffect(() => {
    const arr = []
    fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&token=${token}`)
      .then(res => res.json())
      .then(data => setQuestionSet(data.results))
  }, [count])

  const incorrects = questionSet.map((item, index) => {
    return <Question
              key={nanoid()}
              question={item.question}
              correct_answer={item.correct_answer}
              incorrect_answers={item.incorrect_answers}
            />
  })
  return (
    <div className="App">
      {incorrects}
      <button onClick={() => setCount(prev => prev + 1)}>Up</button>
    </div>
  )
}

export default App
