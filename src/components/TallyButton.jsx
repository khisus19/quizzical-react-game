

export default function TallyButton(props) {
  let isActive = props.questions.every(item => item.selected_answer !== "")
  let buttonClass = isActive ? "btn" : "btn disabled-btn"
  
  return (
    <button className={buttonClass} onClick={props.checkAnswers} disabled={!isActive}>Check my answers</button>
  )
}