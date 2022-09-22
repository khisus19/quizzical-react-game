import { nanoid } from "nanoid"

export default function Question(props) {

  const shuffleOptions = props.posible_answers.map(option => {
    let conditionalClass = ""
    if(!props.show_answer) {
      conditionalClass = option !== "" && (props.selected_answer === option) ? "selected" : "option"
    } else {
      conditionalClass = (props.selected_answer === option) && (option === props.correct_answer) ? "correct" : "option"
    }
    return <span 
      key={nanoid()}
			className={conditionalClass}
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