export default function TallyResults(selected, correct) {
  let correctCount = 0
  correct.map((item, index) => {
    if(item === selected[index]) {
      correctCount++
    }
  })
  return correctCount
}