import { nanoid } from "nanoid"

export default function Question(props) {
  const posibleAnswers = [...props.incorrect_answers, props.correct_answer]
  const shuffledAnswers = posibleAnswers.sort(() => Math.random() - 0.5)

  const answerElements = shuffledAnswers.map(answer => <li key={nanoid()} className="answer-item">{answer}</li>)
  return(
    <>
      <h3 className="question">{props.question}</h3>
      <ul className="answer-list">
        {answerElements}
      </ul>
    </>
  )
}