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
    difficulty: 0
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
    console.log(questionsSet)
  }, [gameOptions])

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
        setIsGameTime={setIsGameTime}/> :
        <>
        <h2 className="message">Quizzical</h2>
        <select
          value={gameOptions.category}
          onChange={handleGameOptions}
          name="category"
        >
          <option 
          value={0}>Any Category</option>
          {categoriesElements}
        </select>
        <select
          value={gameOptions.difficulty}
          onChange={handleGameOptions}
          name="difficulty"
        >
          <option value={0}>Any difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className="btn reset" onClick={() => setIsGameTime(prev => !prev)
          }>Start Game</button> 
        </>

      }  
    </div>
  )
}

export default App
