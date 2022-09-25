export default async function FetchCategories() {
  const res = await fetch(`https://opentdb.com/api_category.php`)
  const data = await res.json()
  return data.trivia_categories
}
