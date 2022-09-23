import { useState, useEffect } from 'react'
import './App.css'
import Question from "./components/Question"
import FetchQuestions from "./helpers/FetchQuestions"
import TallyResults from "./helpers/TallyResults"

function App() {
  const [result, setResult] = useState(0)
  const [games, setGames] = useState(0)
  const [questionsSet, setQuestionsSet] = useState([])
  const [showAnswer, setShowAnswers] = useState(false)

  useEffect(() => {
    FetchQuestions(showAnswer).then(pregunta => {
      return setQuestionsSet(pregunta)
    })
  }, [games])

  function handleSelected(questionId, answer) {
    setQuestionsSet(prevQuestionsSet => (
      prevQuestionsSet.map(question => (
        question.id === questionId
          ? {...question, selected_answer: answer }
          : question
      ))
    ));
  }

  function checkAnswers() {
    setShowAnswers(prev => !prev)
    const allSelected = questionsSet.map(item => item.selected_answer)
    const allCorrect = questionsSet.map(item => item.correct_answer)
    console.log(allCorrect, allSelected);
    setResult(TallyResults(allSelected, allCorrect))
  }

  function newGame() {
    window.scrollTo(0, 0);
    setGames(prev => prev + 1)
    setShowAnswers(false)
    setResult(0)
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

  return (
    <div className="App">
      {questionsElements}
      {showAnswer ? 
        <>
          <h2 className="message">{`You have ${result} correct answers out of 5`}</h2>
          <button className="btn reset" onClick={newGame}>Try Again</button> 
        </>
        : <button className="btn" onClick={checkAnswers}>Check my answers</button> 
      }
    </div>
  )
}

export default App
