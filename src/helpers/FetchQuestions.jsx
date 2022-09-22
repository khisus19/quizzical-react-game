import FetchToken from "./FetchToken"
import { nanoid } from "nanoid";

const token = FetchToken()

function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}


export default function FetchQuestions(showAnswer) {
  return fetch(`https://opentdb.com/api.php?amount=2&category=9&difficulty=easy&type=multiple`)
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