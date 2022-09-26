import { useState, useEffect } from 'react'
import '../App.css'
import '../styles/GameplayScreen.css'
import Question from "./Question"
import TallyButton from "./TallyButton"
import FetchCategories from "../helpers/FetchCategories"
import FetchQuestions from "../helpers/FetchQuestions"
import TallyResults from "../helpers/TallyResults"

export default function GameplayScreen(props) {
  const [result, setResult] = useState(0)
  const [games, setGames] = useState(0)
  const [showAnswer, setShowAnswers] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    FetchQuestions(false, props.gameOptions).then(pregunta => {
      return props.setQuestionsSet(pregunta)
    })
  }, [games])

  function handleSelected(questionId, answer) {
    props.setQuestionsSet(prevQuestionsSet => (
      prevQuestionsSet.map(question => (
        question.id === questionId
          ? {...question, selected_answer: answer }
          : question
      ))
    ));
  }

  function checkAnswers() {
    setShowAnswers(prev => !prev)
    const allSelected = props.questionsSet.map(item => item.selected_answer)
    const allCorrect = props.questionsSet.map(item => item.correct_answer)
    console.log(allCorrect, allSelected);
    setResult(TallyResults(allSelected, allCorrect))
  }

  function continuePlaying() {
    window.scrollTo(0, 0);
    setGames(prev => prev + 1)
    setShowAnswers(false)
    setResult(0)
  }

  function newGame() {
    window.scrollTo(0, 0);
    props.setIsGameTime(prev => !prev)
  }
  
  const questionsElements = props.questionsSet.map(item => {
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
    <div className="gameplay-screen">
      {questionsElements}
      {showAnswer ? 
        <>
          <h2 className="message">{`You have ${result} correct answers out of 5`}</h2>
          <div className="btn-container">
            <button className="btn" onClick={continuePlaying}>Play Again</button>
            <button className="btn reset" onClick={newGame}>Start a New Game</button>
          </div>
        </>
        
        : 
        <div className="btn-container">
          <TallyButton 
            questions={props.questionsSet}
            checkAnswers={checkAnswers}
          />
          <button className="btn reset" onClick={newGame}>Start a New Game</button>
        </div>
      }
    </div>
  )
}

