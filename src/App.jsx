import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import hardCodedQuestions from "../data"
import Question from "./components/Question"

function App() {
  const [count, setCount] = useState(0)
  const [token, setToken] = useState("")
  const [questionsReceived, setQuestionsReceived] = useState(hardCodedQuestions)
  const [questionsSet, setQuestionsSet] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])

  
  useEffect(() => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then(res => res.json())
      .then(data => setToken(data.token))
  }, [])

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&token=${token}`)
      .then(res => res.json())
      .then(data => setQuestionsReceived(data.results))
  }, [count])

  useEffect(() => {
    const arr = []
    questionsReceived.map(item => {
      arr.push({
        question: decodeHtml(item.question),
        correct_answer: decodeHtml(item.correct_answer),
        posible_answers: [...item.incorrect_answers, item.correct_answer]
          .map(item => decodeHtml(item))
          .sort(() => Math.random() - 0.5) || [""]
      })
    })
    setQuestionsSet(arr)
  }, [questionsReceived])

  function decodeHtml(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function choose(event) {
    setSelectedAnswers(prevAnswers => [...prevAnswers, event.target.id])
    console.log(selectedAnswers);
  }

  function checkAnswers() {
    const allCorrect = questionsSet.map(item => item.correct_answer)
    console.log("correct", allCorrect)
    console.log(selectedAnswers)
    console.log(allCorrect.length === selectedAnswers.length && allCorrect.map((item, index) => item === selectedAnswers[index]))
  }

  const questionsElements = questionsSet.map(item => {
    const posibleAnswersElements = item.posible_answers.map((opt, index) => {
      return <span 
        className="option" 
        key={item.question + opt || index}
        id={opt}
        onClick={choose}
      >{opt}</span>
    })
    return <Question 
      key={item.question} 
      question={item.question}
      posible_answers={posibleAnswersElements}
      correct_answer={item.correct_answer}
    />
  })
  return (
    <div className="App">
      {questionsElements}
      <button className="btn" onClick={checkAnswers}>Up</button>
    </div>
  )
}

export default App
