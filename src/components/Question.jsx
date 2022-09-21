import { nanoid } from "nanoid"

export default function Question(props) {
  
  return(
    <>
      <h3 className="question">{props.question}</h3>
      <div className="options-container">
        {props.posible_answers}
      </div>
      <hr className="horizontal-r" />
    </>
  )
}