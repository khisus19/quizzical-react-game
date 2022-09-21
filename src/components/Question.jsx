

export default function Question(props) {
  const posibleAnswers = [...props.incorrect_answers, props.correct_answer]
  const shuffledAnswers = posibleAnswers.sort(() => Math.random() - 0.5)

  const answerElements = shuffledAnswers.map(answer => <li>{answer}</li>)
  return(
    <>
      <h3>{props.question}</h3>
      <ul>
        {answerElements}
      </ul>
    </>
  )
}