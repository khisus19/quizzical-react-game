import { nanoid } from "nanoid"

export default function Question(props) {

  const shuffleOptions = props.posible_answers.map(option => {
    let conditionalStyle = ""
    if(!props.show_answer) {
      conditionalStyle = option !== "" && (props.selected_answer === option) ? "selected" : "option"
    } else if (props.show_answer && props.correct_answer === option) {
      conditionalStyle = "correct"
    } else if (props.show_answer && (props.selected_answer === option) && props.selected_answer !== props.correct_answer) {
      conditionalStyle = "incorrect"
    } else {
      conditionalStyle = "option"
    }
    return <span 
      key={nanoid()}
			className={conditionalStyle}
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