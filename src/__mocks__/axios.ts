import { getRepositories } from "./repository.fixture"
export default {
  get: jest.fn((url) => {
    const { search } = new URL(url)
    const query = new URLSearchParams(search)
    let [fromDate, language] = query.get("q").split(" ")
    fromDate = fromDate.split(":")[1].replace(">", "")
    if (isNaN(Date.parse(fromDate))) return Promise.reject({ response: { status: 400 } })
    language = language.split(":")[1]
    const pageSize = query.get("per_page")
    const data = getRepositories({ fromDate, programmingLanguage: language, pageSize: Number(pageSize) })
    if (data.items.length === 0) {
      return Promise.reject({ response: { status: 404 } })
    }
    return Promise.resolve({
      data,
      status: 200
    })
  })
}
