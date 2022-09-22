import { nanoid } from "nanoid"

export default function Question(props) {

  const shuffleOptions = props.posible_answers.map(option => {
    return <span 
      key={nanoid()}
			className={option !== "" && (props.selected_answer === option) ? "option selected" : "option"}
			onClick={() => props.handleSelected(props.id, option)}
      >{option}</span>
  })
  
  return(
    <>
      <h3 className="question">{props.question}</h3>
      <div className="options-container">
        {shuffleOptions}
      </div>
      <hr className="horizontal-r" />
    </>
  )
}