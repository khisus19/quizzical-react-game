import { useState, useEffect } from 'react'
import './App.css'
import Question from "./components/Question"
import TallyButton from "./components/TallyButton"
import FetchCategories from "./helpers/FetchCategories"
import FetchQuestions from "./helpers/FetchQuestions"
import TallyResults from "./helpers/TallyResults"

function App() {
  const [result, setResult] = useState(0)
  const [games, setGames] = useState(0)
  const [questionsSet, setQuestionsSet] = useState([])
  const [showAnswer, setShowAnswers] = useState(false)
  const [categories, setCategories] = useState([])
  const [gameOptions, setGameOptions] = useState({
    category: "",
    difficulty: ""
  })

  useEffect(() => {
    FetchQuestions(showAnswer).then(pregunta => {
      return setQuestionsSet(pregunta)
    })
    FetchCategories().then(category => {
      return setCategories(category)
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

  function handleGameOptions(event) {
    const { name, value } = event.target
    setGameOptions(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
    console.log(gameOptions);
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

  const categoriesElements = categories.map(item => {
    return <option
      key={item.id}
      id={item.id}
      name={item.name}
      value={item.id}
      >
    {item.name}
    </option>
  })

  return (
    <div className="App">
      {questionsElements}
      {<select
        value={gameOptions.category}
        onChange={handleGameOptions}
        name="category"
      >
        <option 
        value={0}>Any Category</option>
        {categoriesElements}
      </select>}
      {<select
        value={gameOptions.difficulty}
        onChange={handleGameOptions}
        name="difficulty"
      >
        <option>Any difficulty</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>}
      {showAnswer ? 
        <>
          <h2 className="message">{`You have ${result} correct answers out of 5`}</h2>
          <button className="btn reset" onClick={newGame}>Try Again</button> 
        </>
        : <TallyButton 
          questions={questionsSet}
          checkAnswers={checkAnswers}
        />
        // <button className="btn" onClick={checkAnswers}>Check my answers</button> 
      }
    </div>
  )
}

export default App
