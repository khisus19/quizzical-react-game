import { useState, useEffect } from 'react'
import './App.css'
import hardCodedQuestions from "../data"
import Question from "./components/Question"

function App() {
  const [count, setCount] = useState(0)
  const [questionSet, setQuestionSet] = useState(hardCodedQuestions.results)
  const [token, setToken] = useState("")
  
  useEffect(() => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then(res => res.json())
      .then(data => setToken(data.token))
  }, [])

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&token=${token}`)
      .then(res => res.json())
      .then(data => data.results)
    console.log(questionSet)
  }, [])

  const incorrects = questionSet.map(item => {
    return <Question
              question={item.question}
              correct_answer={item.correct_answer}
              incorrect_answers={item.incorrect_answers}
            />
  })
  return (
    <div className="App">
      <p>Hola Mundo</p>
      {incorrects}
      <button onClick={() => setCount(prev => prev + 1)}>Up</button>
    </div>
  )
}

export default App
