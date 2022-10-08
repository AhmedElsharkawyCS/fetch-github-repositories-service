import { repositoryService } from "../repository"

describe("Test repository service", () => {
  it("Should return data if we passed valid query", async () => {
    const query = {
      fromDate: "2016-05-06",
      pageSize: 10,
      programmingLanguage: "javascript"
    }
    const data = await repositoryService.getRepositories(query)
    expect(data.items.length).toBeGreaterThan(0)
  })
  it("Should return errors if the date is incorrect", async () => {
    try {
      await repositoryService.getRepositories({ fromDate: "2016-05-00", pageSize: 10, programmingLanguage: "javascript" })
    } catch (error) {
      const { status } = error.response
      expect(status).toBe(400)
    }
  })
  it("Should return the same length of page size", async () => {
    const data = await repositoryService.getRepositories({ fromDate: "2016-05-06", pageSize: 10, programmingLanguage: "javascript" })
    expect(data.items.length).toBe(10)
  })
  it("Should return empty array if the programming language is not found", async () => {
    try {
      await repositoryService.getRepositories({ fromDate: "2016-05-06", pageSize: 10, programmingLanguage: "javascriptxxxx" })
    } catch (error) {
      const { status } = error.response
      expect(status).toBe(404)
    }
  })
})
