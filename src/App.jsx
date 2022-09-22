import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import hardCodedQuestions from "../data"
import Question from "./components/Question"
import FetchToken from "./helpers/FetchToken"
import FetchQuestions from "./helpers/FetchQuestions"

function App() {
  const [count, setCount] = useState(0)
  const [token, setToken] = useState("")
  const [questionsReceived, setQuestionsReceived] = useState([])
  const [questionsSet, setQuestionsSet] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showAnswer, setShowAnswers] = useState(false)
  let result = 0

  
  // useEffect(() => {
  //   setToken(FetchToken())
  //   /* fetch("https://opentdb.com/api_token.php?command=request")
  //     .then(res => res.json())
  //     .then(data => setToken(data.token)) */ 
  // }, [])

  useEffect(() => {
    FetchQuestions(showAnswer).then(pregunta => {
      return setQuestionsSet(pregunta)
    })
    console.log(questionsSet)
  }, [])

  // useEffect(() => {
  //   setQuestionsSet(questionsReceived.map(item => {
  //     return {
  //       id: nanoid(),
  //       question: decodeHtml(item.question),
  //       correct_answer: decodeHtml(item.correct_answer),
  //       posible_answers: [...item.incorrect_answers, item.correct_answer]
  //         .map(item => decodeHtml(item))
  //         .sort(() => Math.random() - 0.5),
  //       selected_answer: "",
  //       show_answer: showAnswer
  //     }
  //   }))
  // }, [questionsReceived, showAnswer])

  // function decodeHtml(html) {
  //   let txt = document.createElement("textarea");
  //   txt.innerHTML = html;
  //   return txt.value;
  // }
  

  function handleSelected(questionId, answer) {
    setQuestionsSet(prevQuestionsSet => (
      prevQuestionsSet.map(question => (
        question.id === questionId
          ? {...question, selected_answer: answer }
          : question
      ))
    ));
    setSelectedAnswers(questionsSet.map(item => item.selected_answer))
  }

  function checkAnswers() {
    setShowAnswers(prev => !prev)
    const allCorrect = questionsSet.map(item => item.correct_answer)
    const allSelected = questionsSet.map(item => item.selected_answer)
    const compared = allCorrect.length === allSelected.length && allCorrect.every((item, index) => item === allSelected[index])
    console.log(allCorrect, allSelected);
    console.log(compared ? "Acertaste" : "Equivocaste")
    tallyResults()
  }

  function tallyResults() {
    const allCorrect = questionsSet.map(item => item.correct_answer)
    const allSelected = questionsSet.map(item => item.selected_answer)
    allCorrect.map((item, index) => {
      if(item === allSelected[index]) {
        setCount(prev => prev + 1)
      }
    })
  }

  const questionsElements = questionsSet.map(item => {
    return <Question 
      key={item.id}
      id={item.id}
      question={item.question}
      posible_answers={item.posible_answers}
      correct_answer={item.correct_answer}
      handleSelected={handleSelected}
      selected_answer={item.selected_answer}
      show_answer={showAnswer}
    />
  })

  function newGame() {
    setShowAnswers(false)
  }

  return (
    <div className="App">
      {questionsElements}
      {showAnswer ? 
        <>
          <p>{`You have ${count} correct answers`}</p>
          <button className="btn" onClick={newGame}>Try Again</button> 
        </>
        : <button className="btn" onClick={checkAnswers}>Check my answers</button> 
      }
    </div>
  )
}

export default App
