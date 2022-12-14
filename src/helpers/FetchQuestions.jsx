import { nanoid } from "nanoid";


function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function FetchToken() {
  fetch("https://opentdb.com/api_token.php?command=request")
  .then(res => res.json())
  .then(data => data.token)
}

const token = FetchToken()

export default function FetchQuestions(showAnswer, gameOptions) {
  const { category, difficulty, type, num_questions } = gameOptions

  let url = `https://opentdb.com/api.php?amount=${num_questions}&category=${category}&difficulty=${difficulty}&type=${type}`

  return fetch(url)
      .then(res => res.json())
      .then(data => data.results.map(item => {
        return {
          id: nanoid(),
          question: decodeHtml(item.question),
          correct_answer: decodeHtml(item.correct_answer),
          posible_answers: [...item.incorrect_answers, item.correct_answer]
            .map(item => decodeHtml(item))
            .sort(() => Math.random() - 0.5),
          selected_answer: "",
          show_answer: showAnswer
        }
      }))
}