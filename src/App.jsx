import { useState, useEffect } from 'react'
import './App.css'
import GameplayScreen from "./components/GameplayScreen"
import FetchCategories from "./helpers/FetchCategories"
import FetchQuestions from "./helpers/FetchQuestions"

function App() {
  const [isGameTime, setIsGameTime] = useState(false)
  const [categories, setCategories] = useState([])
  const [questionsSet, setQuestionsSet] = useState([])
  const [gameOptions, setGameOptions] = useState({
    category: 0,
    difficulty: 0,
    type: 0,
    num_questions: 5
  })

  useEffect(() => {
    FetchCategories().then(category => {
      return setCategories(category)
    })
  }, [])

  useEffect(() => {
    FetchQuestions(false, gameOptions).then(pregunta => {
      return setQuestionsSet(pregunta)
    })
  }, [gameOptions])

  function handleGameOptions(event) {
    const { name, value } = event.target
    setGameOptions(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  
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
      {isGameTime ?
        <GameplayScreen 
        gameOptions={gameOptions}
        questionsSet={questionsSet}
        setQuestionsSet={setQuestionsSet}
        setIsGameTime={setIsGameTime}/> 
        :
        <>
        <h1 className="title">Quizzical</h1>
        <p className="subtitle">Have some trivia fun!</p>
        <form className="form">
          <label className="label">Number of Questions:</label>
          <input 
          name="num_questions"
          onChange={handleGameOptions}
          value={gameOptions.num_questions}
          type="number"
          min={5} 
          max={15} />
          <label className="label">Choose a Category:</label>
          <select
            value={gameOptions.category}
            onChange={handleGameOptions}
            name="category">
            <option 
            value={0}>Any Category</option>
            {categoriesElements}
          </select>
          <label className="label">Choose a Difficulty:</label>
          <select
            value={gameOptions.difficulty}
            onChange={handleGameOptions}
            name="difficulty">
            <option value={0}>Any difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label className="label">Choose a Type of Question:</label>
          <select
            value={gameOptions.type}
            onChange={handleGameOptions}
            name="type">
            <option value={0}>Any type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True or False</option>
          </select>
        </form>
        <button className="btn" onClick={() => setIsGameTime(prev => !prev)
          }>Start Game</button> 
      </>

      }  
    </div>
  )
}

export default App
